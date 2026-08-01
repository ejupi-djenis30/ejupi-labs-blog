import { canonicalPublicPathname } from "./public-routes.mjs";

/** @typedef {import("../worker-env.d.ts").BlogWorkerEnv} BlogWorkerEnv */

const CANONICAL_HOST = "blog.ejupilabs.com";
const CANONICAL_REDIRECT = 308;
const CANONICAL_METHODS = new Set(["GET", "HEAD"]);
const DEVELOPMENT_HOSTS = new Set(["127.0.0.1", "localhost", "[::1]"]);
const LOCALIZED_ROUTE = /^\/(it|de|fr)(?:\/|$)/u;
const NOT_FOUND_DOCUMENT = /^\/(?:(?:it|de|fr)\/)?404\.html$/u;
const REPRESENTATION_REQUEST_HEADERS = [
  "If-Match",
  "If-Modified-Since",
  "If-None-Match",
  "If-Range",
  "If-Unmodified-Since",
  "Range",
];
const FINGERPRINTED_ASSET =
  /^\/assets\/(?:styles\.[a-f0-9]{12}\.css|client\.[a-f0-9]{12}\.js|search\.(?:en|it|de|fr)\.[a-f0-9]{12}\.json)$/u;
const HTML_CACHE_CONTROL = "no-cache, must-revalidate";
const NO_STORE_CACHE_CONTROL = "no-store";

const SECURITY_HEADERS = Object.freeze({
  "Content-Security-Policy": [
    "default-src 'self'",
    "base-uri 'none'",
    "connect-src 'self'",
    "font-src 'self'",
    "form-action 'none'",
    "frame-ancestors 'none'",
    "frame-src 'none'",
    "img-src 'self'",
    "manifest-src 'self'",
    "media-src 'none'",
    "object-src 'none'",
    "script-src 'self'",
    "script-src-attr 'none'",
    "style-src 'self'",
    // `upgrade-insecure-requests` is intentionally omitted: production requests
    // are canonicalized to HTTPS, while WebKit would otherwise upgrade HTTP
    // localhost assets to an unavailable TLS port during local development.
    "worker-src 'none'",
  ].join("; "),
  "Cross-Origin-Opener-Policy": "same-origin",
  "Cross-Origin-Resource-Policy": "same-origin",
  "Permissions-Policy":
    "accelerometer=(), camera=(), display-capture=(), geolocation=(), gyroscope=(), microphone=(), payment=(), usb=()",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
});

const DOCUMENT_SECURITY_HEADERS = new Set([
  "Content-Security-Policy",
  "Cross-Origin-Opener-Policy",
  "Permissions-Policy",
  "X-Frame-Options",
]);

/**
 * @param {string} pathname
 * @returns {string}
 */
function localeFromPath(pathname) {
  return LOCALIZED_ROUTE.exec(pathname)?.[1] ?? "en";
}

/**
 * @param {string} pathname
 * @param {string} contentType
 * @returns {boolean}
 */
function looksLikeHtml(pathname, contentType) {
  return (
    contentType.includes("text/html") ||
    pathname.endsWith("/") ||
    pathname.endsWith(".html")
  );
}

/**
 * @param {Headers} headers
 * @param {boolean} isHtml
 * @returns {Headers}
 */
function withSecurityHeaders(headers, isHtml) {
  const secured = new Headers(headers);

  for (const [name, value] of Object.entries(SECURITY_HEADERS)) {
    if (!isHtml && DOCUMENT_SECURITY_HEADERS.has(name)) {
      secured.delete(name);
      continue;
    }
    secured.set(name, value);
  }

  return secured;
}

/**
 * @param {Response} response
 * @param {string} pathname
 * @returns {Response}
 */
function withResponseHeaders(response, pathname) {
  const contentType = response.headers.get("Content-Type") ?? "";
  const isHtml = looksLikeHtml(pathname, contentType);
  const headers = withSecurityHeaders(response.headers, isHtml);

  if (isHtml && !headers.has("Content-Language")) {
    headers.set("Content-Language", localeFromPath(pathname));
  }

  if (response.status >= 400) {
    headers.set("Cache-Control", NO_STORE_CACHE_CONTROL);
    headers.set("Cloudflare-CDN-Cache-Control", NO_STORE_CACHE_CONTROL);
  } else if (isHtml) {
    headers.set("Cache-Control", HTML_CACHE_CONTROL);
    headers.set("Cloudflare-CDN-Cache-Control", NO_STORE_CACHE_CONTROL);
  } else if (FINGERPRINTED_ASSET.test(pathname)) {
    headers.set("Cache-Control", "public, max-age=31536000, immutable");
  } else if (!headers.has("Cache-Control")) {
    headers.set("Cache-Control", "public, max-age=0, must-revalidate");
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

/**
 * @param {number} status
 * @param {Record<string, string>} headers
 * @param {BodyInit | null} [body]
 * @returns {Response}
 */
function generatedResponse(status, headers, body = null) {
  const responseHeaders = withSecurityHeaders(
    new Headers({
      "Cache-Control": NO_STORE_CACHE_CONTROL,
      "Cloudflare-CDN-Cache-Control": NO_STORE_CACHE_CONTROL,
      ...headers,
    }),
    false,
  );

  return new Response(body, { status, headers: responseHeaders });
}

/**
 * @param {URL} url
 * @param {number} status
 * @returns {Response}
 */
function redirect(url, status) {
  return generatedResponse(status, { Location: url.toString() });
}

/** @returns {Response} */
function methodNotAllowed() {
  return generatedResponse(
    405,
    {
      Allow: "GET, HEAD",
      "Content-Type": "text/plain; charset=utf-8",
    },
    "Method Not Allowed",
  );
}

/**
 * @param {boolean} [headRequest]
 * @returns {Response}
 */
function serviceUnavailable(headRequest = false) {
  return generatedResponse(
    503,
    {
      "Content-Type": "text/plain; charset=utf-8",
      "Retry-After": "60",
    },
    headRequest ? null : "Service temporarily unavailable",
  );
}

/**
 * @param {string} hostname
 * @returns {boolean}
 */
function isDevelopmentHost(hostname) {
  return DEVELOPMENT_HOSTS.has(hostname);
}

/**
 * @param {string} pathname
 * @returns {"document" | "fingerprinted_asset" | "not_found_document" | "public_resource" | "well_known_resource"}
 */
function staticRouteClass(pathname) {
  if (NOT_FOUND_DOCUMENT.test(pathname)) {
    return "not_found_document";
  }
  if (FINGERPRINTED_ASSET.test(pathname)) return "fingerprinted_asset";
  if (pathname.startsWith("/.well-known/")) return "well_known_resource";
  if (pathname.endsWith("/") || pathname.endsWith(".html")) return "document";
  return "public_resource";
}

/**
 * @param {string} pathname
 * @returns {void}
 */
function logStaticAssetFailure(pathname) {
  console.error(
    JSON.stringify({
      event: "worker_failure",
      operation: "static_asset_fetch",
      route_class: staticRouteClass(pathname),
    }),
  );
}

/**
 * Fetch the physical 404 document as a complete representation. A range or
 * stale validator from the missing URL must not turn the error page into a
 * partial or bodyless response.
 * @param {Request} request
 * @returns {Request}
 */
function notFoundAssetRequest(request) {
  const headers = new Headers(request.headers);

  for (const header of REPRESENTATION_REQUEST_HEADERS) {
    headers.delete(header);
  }

  return new Request(request, { headers });
}

/**
 * @param {Request} request
 * @param {BlogWorkerEnv["ASSETS"]} assets
 * @param {boolean} [localDevelopment]
 * @returns {Promise<Response>}
 */
export async function handleRequest(request, assets, localDevelopment = false) {
  const url = new URL(request.url);
  const hostname = url.hostname.toLowerCase();
  const canonicalPath = canonicalPublicPathname(url.pathname);
  const usesLocalDevelopment =
    localDevelopment && isDevelopmentHost(hostname);

  // Reject unsafe methods before any origin canonicalization. A 307/308 would
  // otherwise preserve the request body and could forward it to production.
  if (!CANONICAL_METHODS.has(request.method)) {
    return methodNotAllowed();
  }

  if (
    !usesLocalDevelopment &&
    (url.protocol !== "https:" || hostname !== CANONICAL_HOST || url.port !== "")
  ) {
    url.protocol = "https:";
    url.hostname = CANONICAL_HOST;
    url.port = "";
    if (canonicalPath !== url.pathname) url.pathname = canonicalPath;
    return redirect(url, CANONICAL_REDIRECT);
  }

  if (canonicalPath !== url.pathname) {
    url.pathname = canonicalPath;
    return redirect(url, CANONICAL_REDIRECT);
  }

  try {
    const assetRequest = NOT_FOUND_DOCUMENT.test(url.pathname)
      ? notFoundAssetRequest(request)
      : request;
    let response = await assets.fetch(assetRequest);
    if (response.status >= 500) {
      logStaticAssetFailure(url.pathname);
      return serviceUnavailable(request.method === "HEAD");
    }
    if (NOT_FOUND_DOCUMENT.test(url.pathname) && response.status < 400) {
      response = new Response(response.body, {
        status: 404,
        statusText: "Not Found",
        headers: response.headers,
      });
    }
    return withResponseHeaders(response, url.pathname);
  } catch {
    logStaticAssetFailure(url.pathname);
    return serviceUnavailable(request.method === "HEAD");
  }
}

export default {
  /**
   * @param {Request} request
   * @param {BlogWorkerEnv} env
   * @returns {Promise<Response>}
   */
  fetch(request, env) {
    return handleRequest(
      request,
      env.ASSETS,
      String(env.LOCAL_DEVELOPMENT) === "true",
    );
  },
};

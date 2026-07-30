import { canonicalPublicPathname } from "./public-routes.mjs";

const HTTPS_REDIRECT = 301;
const CANONICAL_REDIRECT = 308;
const LOCALIZED_ROUTE = /^\/(?:it|de|fr)(?:\/|$)/u;
const CANONICAL_METHODS = new Set(["GET", "HEAD"]);

function withDefault404Language(response, pathname) {
  if (
    response.status !== 404 ||
    LOCALIZED_ROUTE.test(pathname) ||
    response.headers.has("content-language")
  ) {
    return response;
  }

  const headers = new Headers(response.headers);
  headers.set("content-language", "en");
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

export async function handleRequest(request, assets) {
  const url = new URL(request.url);

  if (url.protocol === "http:") {
    url.protocol = "https:";
    return Response.redirect(url.toString(), HTTPS_REDIRECT);
  }

  const canonicalPath = canonicalPublicPathname(url.pathname);
  if (
    CANONICAL_METHODS.has(request.method) &&
    canonicalPath !== url.pathname
  ) {
    url.pathname = canonicalPath;
    return Response.redirect(url.toString(), CANONICAL_REDIRECT);
  }

  const response = await assets.fetch(request);
  return withDefault404Language(response, url.pathname);
}

export default {
  fetch(request, env) {
    return handleRequest(request, env.ASSETS);
  },
};

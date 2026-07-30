const PERMANENT_REDIRECT = 301;

export function handleRequest(request, assets) {
  const url = new URL(request.url);

  if (url.protocol === "http:") {
    url.protocol = "https:";
    return Response.redirect(url.toString(), PERMANENT_REDIRECT);
  }

  return assets.fetch(request);
}

export default {
  fetch(request, env) {
    return handleRequest(request, env.ASSETS);
  },
};

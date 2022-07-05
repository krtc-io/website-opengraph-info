export const sanitizeMediaUrl = (baseUrl: string) => (url: string) => {
  if (!url) {
    return null;
  }

  // e.g. //google.co/favicon.co
  if (url.startsWith("//")) {
    return url.replace("//", "https://");
  }

  // e.g. /favicon.ico
  if (url.startsWith("/")) {
    return new URL(baseUrl).origin + url;
  }

  // e.g. https://google.co/favicon.ico
  if (url.startsWith("http")) {
    return url;
  }

  // favicon.ico
  return new URL(baseUrl).origin + "/" + url;
};

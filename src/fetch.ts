import fetch, { RequestInfo, RequestInit } from "node-fetch";
import { AbortController } from "node-abort-controller";

export type FetchWebsiteOptions = { timeout?: number };

export const fetchWebsiteHtml = async (
  url: RequestInfo,
  init: RequestInit = {},
  options?: FetchWebsiteOptions
) => {
  const timeoutMs = options?.timeout ?? 5000;

  const controller = new AbortController();
  const timeout = setTimeout(() => {
    controller.abort();
  }, timeoutMs);

  const mergedInit = {
    ...init,
    signal: controller.signal,
    headers: {
      accept: "text/html",
      "user-agent":
        "Slackbot-LinkExpanding 1.0 (+https://api.slack.com/robots)",
      "content-type": "text/html",
      ...init?.headers,
    },
  };

  return fetch(url, mergedInit)
    .then(res => {
      if (res.status >= 300) {
        return Promise.reject({
          message: "Page loading error",
          status: res.status,
        });
      }

      return res;
    })
    .then(res => res.text())
    .catch(error => {
      return Promise.reject(error);
    })
    .finally(() => {
      clearTimeout(timeout);
    });
};

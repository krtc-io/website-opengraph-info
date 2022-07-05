import { configFavicons } from "./configs/favicon";
import { RequestInit } from "node-fetch";
import { findElementsByConfig } from "./findElementsByConfig";
import { fetchWebsiteHtml, FetchWebsiteOptions } from "./fetch";
import { load } from "cheerio";
import { configTitles } from "./configs/title";
import { configDescriptions } from "./configs/description";
import { configImages } from "./configs/image";
import { sanitizeMediaUrl } from "./utils/sanitizeUrl";

export type WebsiteInfoResultItem =
  | "favicon"
  | "title"
  | "description"
  | "image";

export type WebsiteInfoResultBase = {
  [k in WebsiteInfoResultItem]: string | null;
};

export type WebsiteInfoResultFull = {
  [k in WebsiteInfoResultItem]: ReturnType<typeof findElementsByConfig>;
};

export const websiteOpenGraph = async (
  url: string,
  init?: RequestInit,
  options?: FetchWebsiteOptions
): Promise<{
  data: WebsiteInfoResultBase;
  dataFull: WebsiteInfoResultFull;
}> => {
  /**
   * check if valid URL
   */
  try {
    new URL(url);
  } catch (e) {
    return Promise.reject(e);
  }

  return fetchWebsiteHtml(url, init, options).then(text => {
    const dom = load(text);

    const urlTransformOptions = {
      valueTransformer: sanitizeMediaUrl(url),
    };

    const dataFull: WebsiteInfoResultFull = {
      favicon: findElementsByConfig(dom, configFavicons, urlTransformOptions),
      title: findElementsByConfig(dom, configTitles),
      description: findElementsByConfig(dom, configDescriptions),
      image: findElementsByConfig(dom, configImages, urlTransformOptions),
    };

    const initRes: WebsiteInfoResultBase = {
      favicon: null,
      title: null,
      description: null,
      image: null,
    };

    const data = Object.entries(dataFull).reduce((res, next) => {
      const [key, items] = next;
      const k = key as WebsiteInfoResultItem;
      const item = items.sort((a, b) => b.priority - a.priority);
      if (item[0]) {
        return {
          ...res,
          [k]: item[0].value,
        };
      }

      return res;
    }, initRes);

    return {
      data,
      dataFull,
    };
  });
};

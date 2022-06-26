import { configFavicons } from "./configs/favicon";
import { findElementsByConfig } from "./findElementsByConfig";
import { fetchWebsiteHtml } from "./fetch";
import { load } from "cheerio";
import { configTitles } from "./configs/title";

export const websiteOpenGraph = async (url: string) => {
  console.log("URL", url);
  return fetchWebsiteHtml(url).then((text) => {
    const dom = load(text);

    const favs = findElementsByConfig(dom, configFavicons);
    const titles = findElementsByConfig(dom, configTitles);

    console.log(favs);
    console.log(titles);

    return text;
  });
};


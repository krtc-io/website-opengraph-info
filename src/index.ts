import { configFavicons } from './configs/favicon';
import { findElementsByConfig } from './findElementsByConfig';
import { fetchWebsiteHtml } from './fetch';
import { load } from 'cheerio';
import { configTitles } from './configs/title';
import { configDescriptions } from './configs/description';
import { configImages } from './configs/image';

export const websiteOpenGraph = async (url: string) => {
  console.log('URL', url);
  return fetchWebsiteHtml(url).then(text => {
    const dom = load(text);
    const results = {
      favicon: findElementsByConfig(dom, configFavicons),
      title: findElementsByConfig(dom, configTitles),
      description: findElementsByConfig(dom, configDescriptions),
      image: findElementsByConfig(dom, configImages),
    };

    type T = keyof typeof results;

    const initRes: { [k in T]: string | undefined } = {
      favicon: undefined,
      title: undefined,
      description: undefined,
      image: undefined,
    };

    const result = Object.entries(results).reduce((res, next) => {
      const [key, data] = next;
      const k = key as T;
      const item = data.sort((a, b) => b.priority - a.priority);
      if (item[0]) {
        return {
          ...res,
          [k]: item[0].value,
        };
      }

      return res;
    }, initRes);

    console.log('full', results);
    console.log('result', result);

    return result;
  });
};

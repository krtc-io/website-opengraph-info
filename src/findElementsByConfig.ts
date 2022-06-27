import { CheerioAPI } from "cheerio";
import { DOMSelectConfig } from "./types";

export const findElementsByConfig = (
  dom: CheerioAPI,
  configs: DOMSelectConfig[]
) => {
  const res: { value: string; description: string; priority: number }[] = [];

  configs.forEach(config => {
    Array.from(dom(config.selector)).forEach(el => {
      if ("attribs" in el) {
        const value =
          config.valueAttribute === "INNER_HTML"
            ? el.children[0].type === "text"
              ? el.children[0].data
              : null
            : el.attribs[config.valueAttribute];
        if (value) {
          res.push({
            value,
            description: config.description,
            priority: config.priority,
          });
        }
      }
    });
  });

  return res;
};

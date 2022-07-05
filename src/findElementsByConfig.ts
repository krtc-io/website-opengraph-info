import { CheerioAPI } from "cheerio";
import { DOMSelectConfig } from "./types";

export const findElementsByConfig = (
  dom: CheerioAPI,
  configs: DOMSelectConfig[],
  options?: {
    valueTransformer?: (value: string) => string | null;
  }
) => {
  const res: {
    value: string | null;
    description: string;
    priority: number;
  }[] = [];

  const valueTransformer = options?.valueTransformer || undefined;

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
            value: valueTransformer ? valueTransformer(value) : value,
            description: config.description,
            priority: config.priority,
          });
        }
      }
    });
  });

  return res;
};

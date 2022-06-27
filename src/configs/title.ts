import { DOMSelectConfig } from "../types";

export const configTitles: DOMSelectConfig[] = [
  {
    selector: `meta[property="og:title"]`,
    description: "OG title",
    valueAttribute: "content",
    priority: 100,
  },
  {
    selector: `meta[property="twitter:title"]`,
    description: "Twitter title",
    valueAttribute: "content",
    priority: 90,
  },
  {
    selector: `title`,
    description: "Title",
    valueAttribute: "INNER_HTML",
    priority: 1,
  },
];

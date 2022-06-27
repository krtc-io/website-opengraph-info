import { DOMSelectConfig } from "../types";

export const configFavicons: DOMSelectConfig[] = [
  {
    selector: `link[rel="apple-touch-icon"]`,
    description: "Apple touch icon",
    valueAttribute: "href",
    priority: 100,
  },
  {
    selector: `link[rel="shortcut icon"]`,
    description: "Icon",
    valueAttribute: "href",
    priority: 2,
  },
  {
    selector: `link[rel="icon"]`,
    description: "Icon",
    valueAttribute: "href",
    priority: 1,
  },
];

import { DOMSelectConfig } from "../types";

export const configImages: DOMSelectConfig[] = [
  {
    selector: `meta[property="og:image"]`,
    description: "OG image",
    valueAttribute: "content",
    priority: 100,
  },
  {
    selector: `meta[property="twitter:image"]`,
    description: "Twitter image",
    valueAttribute: "content",
    priority: 100,
  },
];

import { DOMSelectConfig } from "../types";

export const configDescriptions: DOMSelectConfig[] = [
  {
    selector: `meta[property="og:description"]`,
    description: "OG description",
    valueAttribute: "content",
    priority: 100,
  },
  {
    selector: `meta[property="twitter:description"]`,
    description: "Twitter description",
    valueAttribute: "content",
    priority: 100,
  },
  {
    selector: `meta[name="description"]`,
    description: "Description",
    valueAttribute: "content",
    priority: 1,
  },
];

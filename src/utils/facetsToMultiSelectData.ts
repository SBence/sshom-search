import { PaginatedSearchItemsFacets } from "@customTypes/api";
import { formatKebabCase } from "./formatKebabCase";

export function facetsToMultiSelectData(facets: PaginatedSearchItemsFacets) {
  if (!facets) return [];
  return Object.keys(facets).map((group) => ({
    group: formatKebabCase(group),
    items: Object.keys(facets[group]).map((item) => ({
      value: `&f.${group}=${item}`,
      label: item,
    })),
  }));
}

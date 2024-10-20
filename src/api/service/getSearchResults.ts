import { PaginatedSearchItems } from "@customTypes/api";

let abortController: AbortController | undefined;

export async function getSearchResults(
  searchQuery: string,
  page: number,
  resultsPerPage: number,
  facets?: string[],
) {
  if (abortController) abortController.abort();
  abortController = new AbortController();

  let queryUrl = `https://marketplace-api.sshopencloud.eu/api/item-search?order=score&categories=tool-or-service&page=${page.toString()}&perpage=${resultsPerPage.toString()}`;
  if (searchQuery) queryUrl += `&q=${searchQuery}`;
  if (facets?.length) for (const facet of facets) queryUrl += facet;

  const jsonData = await fetch(queryUrl, { signal: abortController.signal });
  const data = (await jsonData.json()) as PaginatedSearchItems;
  return data;
}

import { SuggestedSearchPhrases } from "@customTypes/api";

let abortController: AbortController | undefined;

export async function getAutocompleteData(searchQuery: string) {
  if (abortController) abortController.abort();
  abortController = new AbortController();

  if (!searchQuery) return [];

  const jsonData = await fetch(
    `https://marketplace-api.sshopencloud.eu/api/item-search/autocomplete?q=${searchQuery}&category=tool-or-service`,
    { signal: abortController.signal },
  );
  const data = (await jsonData.json()) as SuggestedSearchPhrases;
  if (!data.suggestions) return [];
  return (
    data.suggestions
      .filter((suggestion) => suggestion.phrase)
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      .map((suggestion) => suggestion.phrase!)
  );
}

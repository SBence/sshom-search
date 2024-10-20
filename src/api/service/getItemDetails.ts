import { ToolDto } from "@customTypes/api";

let abortController: AbortController | undefined;

export async function getItemDetails(persistentId: string) {
  if (abortController) abortController.abort();
  abortController = new AbortController();

  const jsonData = await fetch(
    `https://marketplace-api.sshopencloud.eu/api/tools-services/${persistentId}`,
    { signal: abortController.signal },
  );
  const data = (await jsonData.json()) as ToolDto;
  return data;
}

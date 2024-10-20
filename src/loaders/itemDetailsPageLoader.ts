import { getItemDetails } from "@api/service/getItemDetails";
import { defer, Params } from "react-router-dom";

export function itemDetailsLoader({
  params,
}: {
  params: Params<"persistentId">;
}) {
  if (!params.persistentId)
    throw new Error("No persistentId found in URL parameters.");
  const itemDetailsPromise = getItemDetails(params.persistentId);
  return defer({
    itemDetails: itemDetailsPromise,
  });
}

import { FilterDataGroup } from "@customTypes/AutocompleteDataGroup";
import { MultiSelect } from "@mantine/core";
import { searchFacetsAtom, searchResultsAtom } from "@state";
import classes from "@styles/Root/FilterInput.module.css";
import { facetsToMultiSelectData } from "@utils/facetsToMultiSelectData";
import { useAtom, useAtomValue } from "jotai";
import { useMemo } from "react";

import { TRANSITION_DURATION, Z_INDEX_OVERLAY } from "@config/styles";

export default function FilterInput() {
  const [searchFacets, setSearchFacets] = useAtom(searchFacetsAtom);
  const searchResults = useAtomValue(searchResultsAtom);

  const searchInputData = useMemo(() => {
    return facetsToMultiSelectData(searchResults?.facets);
  }, [searchResults]);

  const validSearchValues = useMemo(() => {
    function flattenData(groupedData: FilterDataGroup[]) {
      return groupedData.flatMap((group) =>
        group.items.map((item) => item.value),
      );
    }

    return searchFacets.filter((val) =>
      flattenData(searchInputData).includes(val),
    );
  }, [searchFacets, searchInputData]);

  return (
    <MultiSelect
      type="search"
      clearable
      clearButtonProps={{
        "aria-label": "Clear input",
      }}
      className={classes.filterInput}
      searchable
      placeholder="Select filters"
      data={searchInputData}
      value={validSearchValues}
      onChange={setSearchFacets}
      nothingFoundMessage="No filters found."
      comboboxProps={{
        zIndex: Z_INDEX_OVERLAY,
        transitionProps: {
          transition: "fade-down",
          duration: TRANSITION_DURATION,
        },
        width: "fit-content",
      }}
    />
  );
}

import { Z_INDEX_LAYOUT } from "@config/styles";
import { Group, NumberInput, Pagination, Text } from "@mantine/core";
import {
  activePageAtom,
  itemsPerPageAtom,
  itemsPerPageInputAtom,
  resultsLoadingAtom,
  searchResultsAtom,
} from "@state";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useRef } from "react";

import classes from "@styles/Root/CustomPagination.module.css";

export default function CustomPagination() {
  const [activePage, setPage] = useAtom(activePageAtom);
  const setItemsPerPage = useSetAtom(itemsPerPageAtom);
  const [itemsPerPageInputValue, setItemsPerPageInputValue] = useAtom(
    itemsPerPageInputAtom,
  );
  const resultsLoading = useAtomValue(resultsLoadingAtom);
  const searchResults = useAtomValue(searchResultsAtom);

  const pageSizeInputRef = useRef<HTMLInputElement>(null);

  return (
    <Group
      justify="space-between"
      className={classes.footer}
      style={{ zIndex: Z_INDEX_LAYOUT }}
    >
      <Pagination
        disabled={resultsLoading}
        value={activePage}
        onChange={setPage}
        total={searchResults?.pages ?? 0}
      />
      <Group>
        <Text>Items per page:</Text>
        <NumberInput
          ref={pageSizeInputRef}
          value={itemsPerPageInputValue}
          onChange={(value) => {
            if (typeof value === "number") {
              setItemsPerPageInputValue(value);
            } else {
              setItemsPerPageInputValue(parseInt(value));
            }
          }}
          allowNegative={false}
          allowDecimal={false}
          onBlur={() => {
            setItemsPerPage(itemsPerPageInputValue);
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") pageSizeInputRef.current?.blur();
          }}
          min={1}
          max={100}
          clampBehavior="strict"
        />
      </Group>
    </Group>
  );
}

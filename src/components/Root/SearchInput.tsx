import { getAutocompleteData } from "@api/service/getAutocompleteData";
import { DEBOUNCE_TIME } from "@config/search";
import { ICON_STROKE } from "@config/styles";
import { ActionIcon, Autocomplete } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import {
  searchQueryAtom,
  searchValueAtom,
  searchValueTrimmedAtom,
} from "@state";
import { IconArrowRight, IconSearch } from "@tabler/icons-react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useEffect, useRef, useState } from "react";

import classes from "@styles/Root/SearchInput.module.css";

export default function SearchInput() {
  const [autocompleteData, setAutocompleteData] = useState<string[]>([]);
  const setSearchQuery = useSetAtom(searchQueryAtom);
  const [searchValue, setSearchValue] = useAtom(searchValueAtom);
  const searchValueTrimmed = useAtomValue(searchValueTrimmedAtom);

  const [debouncedSearchValue] = useDebouncedValue(
    searchValueTrimmed,
    DEBOUNCE_TIME,
  );

  const searchBarRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    void (async () => {
      try {
        setAutocompleteData(await getAutocompleteData(debouncedSearchValue));
      } catch (error) {
        if (!(error instanceof DOMException && error.name === "AbortError"))
          throw error;
      }
    })();
  }, [debouncedSearchValue, setAutocompleteData]);

  return (
    <Autocomplete
      type="search"
      className={classes.searchInput}
      ref={searchBarRef}
      data={autocompleteData}
      value={searchValue}
      onChange={setSearchValue}
      size="sm"
      placeholder="Search tools and services"
      onKeyDown={(event) => {
        if (event.key === "Enter" && searchValueTrimmed) {
          searchBarRef.current?.blur();
          setSearchQuery(searchValue);
        }
      }}
      rightSectionWidth={36}
      leftSection={
        <IconSearch className={classes.actionIconIcon} stroke={ICON_STROKE} />
      }
      rightSection={
        <ActionIcon
          size={28}
          variant="filled"
          onClick={() => {
            setSearchQuery(searchValue);
          }}
          disabled={!searchValueTrimmed}
        >
          <IconArrowRight
            stroke={ICON_STROKE}
            className={classes.actionIconIcon}
          />
        </ActionIcon>
      }
    />
  );
}

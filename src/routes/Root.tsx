import { getSearchResults } from "@api/service/getSearchResults";
import FilterInput from "@components/Root/FilterInput";
import ResultsTable from "@components/Root/ResultsTable";
import SearchInput from "@components/Root/SearchInput";
import CustomHeader from "@components/shared/CustomHeader";
import {
  ActionIcon,
  Container,
  Group,
  Loader,
  Stack,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import {
  activePageAtom,
  itemsPerPageAtom,
  resultsLoadingAtom,
  searchFacetsAtom,
  searchQueryAtom,
  searchResultsAtom,
} from "@state";
import { IconFilter, IconFilterFilled } from "@tabler/icons-react";
import { useAtom, useAtomValue } from "jotai";
import { useEffect, useRef } from "react";

import classes from "@styles/Root.module.css";
import { ICON_STROKE } from "../config/styles";

export default function Root() {
  const activePage = useAtomValue(activePageAtom);
  const itemsPerPage = useAtomValue(itemsPerPageAtom);
  const searchFacets = useAtomValue(searchFacetsAtom);
  const [searchResults, setSearchResults] = useAtom(searchResultsAtom);
  const searchQuery = useAtomValue(searchQueryAtom);
  const [resultsLoading, setResultsLoading] = useAtom(resultsLoadingAtom);

  const [filtersShown, { toggle: toggleFiltersShown }] = useDisclosure(false);

  const filtersActive = filtersShown && !!searchFacets.length;

  const prevValuesRef = useRef({
    activePage,
    filtersActive,
    itemsPerPage,
    searchFacets,
    searchQuery,
  });

  useEffect(() => {
    if (
      prevValuesRef.current.activePage !== activePage ||
      prevValuesRef.current.filtersActive !== filtersActive ||
      prevValuesRef.current.itemsPerPage !== itemsPerPage ||
      prevValuesRef.current.searchFacets !== searchFacets ||
      prevValuesRef.current.searchQuery !== searchQuery
    ) {
      void (async () => {
        setResultsLoading(true);

        try {
          const searchResultsResponse = await getSearchResults(
            searchQuery,
            activePage,
            itemsPerPage,
            filtersActive ? searchFacets : undefined,
          );
          setSearchResults(searchResultsResponse);
        } catch (error) {
          if (error instanceof DOMException && error.name === "AbortError") {
            return;
          }
          notifications.show({
            message: "Failed to get search results.",
            color: "red",
          });
        }

        setResultsLoading(false);

        prevValuesRef.current = {
          activePage,
          filtersActive,
          itemsPerPage,
          searchFacets,
          searchQuery,
        };
      })();
    }
  }, [
    activePage,
    itemsPerPage,
    searchQuery,
    setSearchResults,
    setResultsLoading,
    searchFacets,
    filtersActive,
  ]);

  const loader = <Loader />;

  return (
    <Stack gap={0} className={classes.mainStack}>
      <CustomHeader containerSize="xl">
        <Stack>
          <Group wrap="nowrap">
            <SearchInput />
            <ActionIcon
              variant="subtle"
              color="gray"
              aria-label="Settings"
              onClick={toggleFiltersShown}
            >
              {filtersShown ? (
                <IconFilterFilled stroke={ICON_STROKE} />
              ) : (
                <IconFilter stroke={ICON_STROKE} />
              )}
            </ActionIcon>
          </Group>
          {filtersShown && <FilterInput />}
        </Stack>
      </CustomHeader>
      <Container className={classes.tableContainer} size="xl">
        {searchResults?.items?.length ? (
          <ResultsTable />
        ) : (
          <div className={classes.emptyTableBox}>
            {resultsLoading ? (
              loader
            ) : (
              <Title c="dimmed" order={3}>
                {searchResults
                  ? "No results found."
                  : "Enter a search term above."}
              </Title>
            )}
          </div>
        )}
      </Container>
    </Stack>
  );
}

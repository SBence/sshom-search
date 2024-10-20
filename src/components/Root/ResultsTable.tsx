import { ITEM_DETAILS_PATH } from "@config/paths";
import { TABLE_MAX_LINES } from "@config/styles";
import { Anchor, LoadingOverlay, Table, Text } from "@mantine/core";
import {
  headerHeightAtom,
  resultsLoadingAtom,
  searchResultsAtom,
} from "@state";
import { getLinesPerTableLink } from "@utils/getLinesPerTableLink";
import clsx from "clsx";
import { useAtomValue } from "jotai";
import { useNavigate } from "react-router-dom";
import CustomPagination from "./CustomPagination";

import classes from "@styles/Root/ResultsTable.module.css";

export default function ResultsTable() {
  const headerHeight = useAtomValue(headerHeightAtom);
  const resultsLoading = useAtomValue(resultsLoadingAtom);
  const searchResults = useAtomValue(searchResultsAtom);

  const navigate = useNavigate();

  const rowElements = searchResults?.items?.map((item) => (
    <Table.Tr
      key={item.id}
      className={clsx(item.persistentId && classes.pointer)}
      onClick={() => {
        if (item.persistentId)
          navigate(`/${ITEM_DETAILS_PATH}/${item.persistentId}`);
      }}
    >
      <Table.Td>
        <Text inherit lineClamp={TABLE_MAX_LINES}>
          {item.label}
        </Text>
      </Table.Td>
      <Table.Td>
        {item.accessibleAt?.map((link) => (
          <div key={link} className={classes.tableLinkContainer}>
            <Anchor
              className={classes.tableLink}
              href={link}
              target="_blank"
              inherit
              onClick={(event) => {
                event.stopPropagation();
              }}
              lineClamp={getLinesPerTableLink(
                item.accessibleAt?.length ?? 0,
                TABLE_MAX_LINES,
              )}
            >
              {link}
            </Anchor>
          </div>
        ))}
      </Table.Td>
      <Table.Td>
        <Text inherit lineClamp={TABLE_MAX_LINES}>
          {item.contributors
            ?.map((contributor) => contributor.actor?.name)
            .join(", ")}
        </Text>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      {!!searchResults?.items && (
        <div className={classes.tableBox}>
          <LoadingOverlay visible={resultsLoading} />
          <Table
            highlightOnHover
            withTableBorder
            stickyHeader
            stickyHeaderOffset={headerHeight}
            className={classes.table}
            layout="fixed"
          >
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Label</Table.Th>
                <Table.Th>Accessible at</Table.Th>
                <Table.Th>Contributors</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rowElements}</Table.Tbody>
          </Table>
        </div>
      )}
      <CustomPagination />
    </>
  );
}

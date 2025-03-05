import { RELATED_ITEM_MODAL_COLUMNS } from "@config/gridColumns";
import markdownOptions from "@config/markdownOptions";
import {
  MOBILE_BREAKPOINT,
  RELATED_ITEMS_TITLE_MAX_LINES,
  TRANSITION_MODAL_MOBILE,
} from "@config/styles";
import { RelatedItemDto } from "@customTypes/api";
import {
  Divider,
  Modal,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { formatKebabCase } from "@utils/formatKebabCase";
import Markdown from "markdown-to-jsx";
import ItemPropertyBox from "./ItemPropertyBox";

import classes from "@styles/ItemDetailsPage/RelatedItemCard.module.css";

export default function RelatedItemCard({ item }: { item: RelatedItemDto }) {
  const [opened, { open, close }] = useDisclosure(false);

  const theme = useMantineTheme();
  const isMobile = useMediaQuery(
    `(max-width: ${theme.breakpoints[MOBILE_BREAKPOINT]})`,
  );

  return (
    <>
      <Modal
        size="xl"
        opened={opened}
        onClose={close}
        title={
          item.category
            ? `${formatKebabCase(item.category)} details`
            : "Details"
        }
        fullScreen={isMobile}
        transitionProps={
          isMobile ? { transition: TRANSITION_MODAL_MOBILE } : undefined
        }
      >
        <Stack gap="xs">
          {item.label && <Title order={4}>{item.label}</Title>}
          <Divider />
          <SimpleGrid cols={RELATED_ITEM_MODAL_COLUMNS}>
            {item.id && (
              <ItemPropertyBox name="ID" value={item.id.toString()} />
            )}
            {item.persistentId && (
              <ItemPropertyBox name="Persistent ID" value={item.persistentId} />
            )}
            {item.category && (
              <ItemPropertyBox
                name="Category"
                value={formatKebabCase(item.category)}
              />
            )}
          </SimpleGrid>
          <Divider />
          {item.description && (
            <Markdown options={markdownOptions}>{item.description}</Markdown>
          )}
        </Stack>
      </Modal>
      <Paper withBorder className={classes.relatedItemPaper} onClick={open}>
        <Stack gap="xs">
          {item.relation?.label && (
            <Text size="sm" c="dimmed">
              {item.relation.label}:
            </Text>
          )}
          {item.label && (
            <Title order={5} lineClamp={RELATED_ITEMS_TITLE_MAX_LINES}>
              {item.label}
            </Title>
          )}
        </Stack>
      </Paper>
    </>
  );
}

import ItemDetailsLoading from "@components/ItemDetailsPage/ItemDetailsLoading";
import ItemProperties from "@components/ItemDetailsPage/ItemProperties";
import ItemPropertyBox from "@components/ItemDetailsPage/ItemPropertyBox";
import NavBackButton from "@components/ItemDetailsPage/NavBackButton";
import RelatedItemCard from "@components/ItemDetailsPage/RelatedItemCard";
import CustomHeader from "@components/shared/CustomHeader";
import { ToolDto } from "@customTypes/api";
import {
  Container,
  Group,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import Markdown from "markdown-to-jsx";
import React from "react";
import { Await, useLoaderData } from "react-router-dom";
import {
  ITEM_PROPERTIES_CARDS_COLUMNS,
  ITEM_PROPERTIES_COLUMNS,
} from "../config/gridColumns";
import markdownOptions from "../config/markdownOptions";
import ErrorPage from "./ErrorPage";

import classes from "@styles/ItemDetailsPage.module.css";

export default function ItemDetailsPage() {
  const data = useLoaderData() as { itemDetails: Promise<ToolDto> };

  return (
    <React.Suspense fallback={<ItemDetailsLoading />}>
      <Await
        resolve={data.itemDetails}
        errorElement={
          <ErrorPage
            errorMessage="Failed to load item details."
            showReloadButton
          />
        }
      >
        {(itemDetails: ToolDto) => (
          <>
            <CustomHeader containerSize="xl">
              <Group wrap="nowrap">
                <NavBackButton />
                <Title lineClamp={2} order={3}>
                  {itemDetails.label}
                </Title>
              </Group>
            </CustomHeader>
            <Container size="xl" className={classes.pageContainer}>
              <Stack gap="lg">
                <Paper className={classes.detailsSectionPaper} withBorder>
                  <Stack>
                    <Title order={4}>Properties</Title>
                    <ItemProperties itemDetails={itemDetails} />
                  </Stack>
                </Paper>
                {!!itemDetails.contributors?.length && (
                  <Paper className={classes.detailsSectionPaper} withBorder>
                    <Stack>
                      <Title order={4}>Contributors</Title>
                      <SimpleGrid cols={ITEM_PROPERTIES_COLUMNS}>
                        {itemDetails.contributors
                          .filter(
                            (contributor) =>
                              !!contributor.actor || !!contributor.role,
                          )
                          .map((contributor) => (
                            <ItemPropertyBox
                              key={contributor.actor?.id}
                              name={contributor.role?.label ?? ""}
                              value={contributor.actor?.name ?? ""}
                            />
                          ))}
                      </SimpleGrid>
                    </Stack>
                  </Paper>
                )}
                {itemDetails.description && (
                  <Paper className={classes.detailsSectionPaper} withBorder>
                    <Stack>
                      <Title order={4}>Description</Title>
                      <Markdown options={markdownOptions}>
                        {itemDetails.description}
                      </Markdown>
                    </Stack>
                  </Paper>
                )}
                {!!itemDetails.relatedItems?.length && (
                  <Paper className={classes.detailsSectionPaper} withBorder>
                    <Stack>
                      <div>
                        <Title order={4}>Related items</Title>
                        <Text c="dimmed" size="sm">
                          Click a card to show details
                        </Text>
                      </div>
                      <SimpleGrid cols={ITEM_PROPERTIES_CARDS_COLUMNS}>
                        {itemDetails.relatedItems.map((relatedItem) => (
                          <RelatedItemCard
                            key={relatedItem.id}
                            item={relatedItem}
                          />
                        ))}
                      </SimpleGrid>
                    </Stack>
                  </Paper>
                )}
              </Stack>
            </Container>
          </>
        )}
      </Await>
    </React.Suspense>
  );
}

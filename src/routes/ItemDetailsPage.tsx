import ItemDetailsLoading from "@components/ItemDetailsPage/ItemDetailsLoading";
import ItemProperties from "@components/ItemDetailsPage/ItemProperties";
import ItemPropertyBox from "@components/ItemDetailsPage/ItemPropertyBox";
import NavBackButton from "@components/ItemDetailsPage/NavBackButton";
import RelatedItemCard from "@components/ItemDetailsPage/RelatedItemCard";
import ResponsivePaper from "@components/ItemDetailsPage/ResponsivePaper";
import CustomHeader from "@components/shared/CustomHeader";
import { ITEM_DETAILS_COMPACT_LAYOUT_BREAKPOINT } from "@config/styles";
import { ToolDto } from "@customTypes/api";
import {
  Container,
  Divider,
  Group,
  PaperProps,
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

const paperProps: PaperProps = {
  className: classes.detailsSectionPaper,
  withBorder: true,
};

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
                <ResponsivePaper
                  showPaperFrom={ITEM_DETAILS_COMPACT_LAYOUT_BREAKPOINT}
                  paperProps={paperProps}
                >
                  <Stack>
                    <Title order={4}>Properties</Title>
                    <ItemProperties itemDetails={itemDetails} />
                  </Stack>
                </ResponsivePaper>
                {!!itemDetails.contributors?.length && (
                  <>
                    <Divider
                      hiddenFrom={ITEM_DETAILS_COMPACT_LAYOUT_BREAKPOINT}
                    />
                    <ResponsivePaper
                      showPaperFrom={ITEM_DETAILS_COMPACT_LAYOUT_BREAKPOINT}
                      paperProps={paperProps}
                    >
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
                    </ResponsivePaper>
                  </>
                )}
                {itemDetails.description && (
                  <>
                    <Divider
                      hiddenFrom={ITEM_DETAILS_COMPACT_LAYOUT_BREAKPOINT}
                    />
                    <ResponsivePaper
                      showPaperFrom={ITEM_DETAILS_COMPACT_LAYOUT_BREAKPOINT}
                      paperProps={paperProps}
                    >
                      <Stack>
                        <Title order={4}>Description</Title>
                        <Markdown options={markdownOptions}>
                          {itemDetails.description}
                        </Markdown>
                      </Stack>
                    </ResponsivePaper>
                  </>
                )}
                {!!itemDetails.relatedItems?.length && (
                  <>
                    <Divider
                      hiddenFrom={ITEM_DETAILS_COMPACT_LAYOUT_BREAKPOINT}
                    />
                    <ResponsivePaper
                      showPaperFrom={ITEM_DETAILS_COMPACT_LAYOUT_BREAKPOINT}
                      paperProps={paperProps}
                    >
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
                    </ResponsivePaper>
                  </>
                )}
              </Stack>
            </Container>
          </>
        )}
      </Await>
    </React.Suspense>
  );
}

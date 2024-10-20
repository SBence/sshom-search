import { ITEM_PROPERTIES_COLUMNS } from "@config/gridColumns";
import { ToolDto } from "@customTypes/api";
import { SimpleGrid } from "@mantine/core";
import { toLocaleDate } from "@utils/toLocaleDate";
import ItemPropertyBox from "./ItemPropertyBox";
import UserProperties from "./UserProperties";

export default function ItemProperties({
  itemDetails,
}: {
  itemDetails: ToolDto;
}) {
  return (
    <SimpleGrid cols={ITEM_PROPERTIES_COLUMNS}>
      {itemDetails.id && (
        <ItemPropertyBox name="ID" value={itemDetails.id.toString()} />
      )}
      {itemDetails.category && (
        <ItemPropertyBox
          name="Category"
          value={itemDetails.category}
          formatValue
        />
      )}
      {itemDetails.version && (
        <ItemPropertyBox name="Version" value={itemDetails.version} />
      )}
      {itemDetails.persistentId && (
        <ItemPropertyBox
          name="Persistent ID"
          value={itemDetails.persistentId}
        />
      )}
      {itemDetails.lastInfoUpdate && (
        <ItemPropertyBox
          name="Last info update"
          value={toLocaleDate(itemDetails.lastInfoUpdate)}
        />
      )}
      {itemDetails.informationContributor?.displayName && (
        <ItemPropertyBox
          name="Information contributor"
          value={itemDetails.informationContributor.displayName}
          modalContent={
            <UserProperties userDetails={itemDetails.informationContributor} />
          }
          modalTitle="Contributor details"
        />
      )}
      {itemDetails.status && (
        <ItemPropertyBox name="Status" value={itemDetails.status} formatValue />
      )}
    </SimpleGrid>
  );
}

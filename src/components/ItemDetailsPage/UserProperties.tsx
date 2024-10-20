import { UserDto } from "@customTypes/api";
import { Stack } from "@mantine/core";
import { toLocaleDate } from "@utils/toLocaleDate";
import ItemPropertyBox from "./ItemPropertyBox";

export default function UserProperties({
  userDetails,
}: {
  userDetails: UserDto;
}) {
  return (
    <Stack>
      {userDetails.id && (
        <ItemPropertyBox name="ID" value={userDetails.id.toString()} />
      )}
      {userDetails.username && (
        <ItemPropertyBox name="Username" value={userDetails.username} />
      )}
      {userDetails.displayName && (
        <ItemPropertyBox name="Display name" value={userDetails.displayName} />
      )}
      {userDetails.status && (
        <ItemPropertyBox name="Status" value={userDetails.status} formatValue />
      )}
      {userDetails.registrationDate && (
        <ItemPropertyBox
          name="Registration date"
          value={toLocaleDate(userDetails.registrationDate)}
        />
      )}
      {userDetails.role && (
        <ItemPropertyBox name="Role" value={userDetails.role} formatValue />
      )}
      {userDetails.email && (
        <ItemPropertyBox name="Email" value={userDetails.email} />
      )}
    </Stack>
  );
}

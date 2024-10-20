import { ICON_STROKE } from "@config/styles";
import { ActionIcon } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

export default function NavBackButton() {
  const navigate = useNavigate();

  return (
    <ActionIcon
      variant="subtle"
      color="gray"
      aria-label="Back"
      onClick={() => {
        navigate("/");
      }}
    >
      <IconArrowLeft stroke={ICON_STROKE} />
    </ActionIcon>
  );
}

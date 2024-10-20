import { Button, Stack, Text, Title } from "@mantine/core";
import { IconCircleX } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { ICON_STROKE } from "../config/styles";

import classes from "@styles/ErrorPage.module.css";

export default function ErrorPage({
  showReloadButton,
  errorMessage,
}: {
  showReloadButton?: boolean;
  errorMessage?: string;
}) {
  const navigate = useNavigate();

  return (
    <Stack gap="xl" justify="center" align="center" className={classes.root}>
      <IconCircleX
        className={classes.icon}
        stroke={ICON_STROKE}
        color="var(--mantine-color-red-filled)"
      />
      <Title order={1} className={classes.title}>
        An error has occurred.
      </Title>
      {errorMessage && (
        <Text c="dimmed" size="lg" ta="center" className={classes.description}>
          {errorMessage}
        </Text>
      )}
      <Stack gap="xs">
        {showReloadButton && (
          <Button
            variant="subtle"
            size="md"
            onClick={() => {
              location.reload();
            }}
          >
            Try again
          </Button>
        )}
        <Button
          variant="subtle"
          size="md"
          onClick={() => {
            navigate("/");
          }}
        >
          Go back to the main page
        </Button>
      </Stack>
    </Stack>
  );
}

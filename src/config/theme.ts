import { createTheme, rem } from "@mantine/core";
import { TRANSITION_DURATION, Z_INDEX_LOADER, Z_INDEX_OVERLAY } from "./styles";

export default createTheme({
  components: {
    ActionIcon: { defaultProps: { size: rem(36) } },
    Modal: { defaultProps: { zIndex: Z_INDEX_OVERLAY } },
    LoadingOverlay: {
      defaultProps: {
        transitionProps: {
          duration: TRANSITION_DURATION,
        },
        zIndex: Z_INDEX_LOADER,
      },
    },
  },
});

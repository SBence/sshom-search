import { Anchor } from "@mantine/core";

export default {
  overrides: {
    a: {
      component: Anchor,
      props: {
        target: "_blank",
        inherit: true,
      },
    },
  },
};

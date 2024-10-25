import {
  Box,
  MantineSize,
  Paper,
  PaperProps,
  PolymorphicComponentProps,
} from "@mantine/core";
import { ReactNode } from "react";

export default function ResponsivePaper<C extends React.ElementType = "div">({
  children,
  showPaperFrom,
  paperProps,
}: {
  children: ReactNode;
  showPaperFrom: MantineSize | (string & {});
  paperProps?: PolymorphicComponentProps<C, PaperProps>;
}) {
  return (
    <>
      <Box hiddenFrom={showPaperFrom}>{children}</Box>
      <Paper {...paperProps} visibleFrom={showPaperFrom}>
        {children}
      </Paper>
    </>
  );
}

import { HEADER_HEIGHT_MIN, Z_INDEX_LAYOUT } from "@config/styles";
import { Container, ContainerProps, rem } from "@mantine/core";
import { headerHeightAtom } from "@state";
import { useSetAtom } from "jotai";
import { ReactNode, useEffect, useRef } from "react";

import classes from "@styles/shared/CustomHeader.module.css";

export default function CustomHeader({
  children,
  containerSize,
}: {
  children: ReactNode;
  containerSize?: ContainerProps["size"];
}) {
  const setHeight = useSetAtom(headerHeightAtom);

  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (headerRef.current) setHeight(headerRef.current.clientHeight);
  });

  return (
    <header
      ref={headerRef}
      className={classes.header}
      style={{ minHeight: rem(HEADER_HEIGHT_MIN), zIndex: Z_INDEX_LAYOUT }}
    >
      <Container
        className={classes.headerContent}
        size={containerSize}
        fluid={!containerSize}
      >
        {children}
      </Container>
    </header>
  );
}

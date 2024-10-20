import {
  ITEM_PROPERTY_MAX_LINES,
  MOBILE_BREAKPOINT,
  TRANSITION_MODAL_MOBILE,
} from "@config/styles";
import { Anchor, Modal, Text, useMantineTheme } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { formatKebabCase } from "@utils/formatKebabCase";
import { ReactNode } from "react";

import classes from "@styles/ItemDetailsPage/ItemPropertyBox.module.css";

export default function ItemPropertyBox({
  name,
  value,
  formatValue,
  modalTitle,
  modalContent,
}: {
  name: string;
  value: string;
  formatValue?: boolean;
  modalTitle?: string;
  modalContent?: ReactNode;
}) {
  const [opened, { open, close }] = useDisclosure(false);

  const theme = useMantineTheme();
  const isMobile = useMediaQuery(
    `(max-width: ${theme.breakpoints[MOBILE_BREAKPOINT]})`,
  );

  const displayValue = formatValue ? formatKebabCase(value) : value;

  return (
    <>
      <Modal
        title={modalTitle}
        opened={opened}
        onClose={close}
        fullScreen={isMobile}
        transitionProps={
          isMobile ? { transition: TRANSITION_MODAL_MOBILE } : undefined
        }
      >
        {modalContent}
      </Modal>
      <div>
        {name && (
          <Text lineClamp={ITEM_PROPERTY_MAX_LINES} size="sm" c="dimmed">
            {name}
          </Text>
        )}
        {value &&
          (modalContent ? (
            <div className={classes.valueContainer}>
              <Anchor
                onClick={open}
                component="button"
                lineClamp={ITEM_PROPERTY_MAX_LINES}
              >
                {displayValue}
              </Anchor>
            </div>
          ) : (
            <Text lineClamp={ITEM_PROPERTY_MAX_LINES}>{displayValue}</Text>
          ))}
      </div>
    </>
  );
}

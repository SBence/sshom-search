import {
  MantineBreakpoint,
  MantineSize,
  MantineTransition,
} from "@mantine/core";

export const ICON_STROKE = 1.5;
export const HEADER_HEIGHT_MIN = 0;

// Max lines
export const ITEM_PROPERTY_MAX_LINES = 2;
export const RELATED_ITEMS_TITLE_MAX_LINES = 2;
export const TABLE_MAX_LINES = 2;

// Layout breakpoints
export const ITEM_DETAILS_COMPACT_LAYOUT_BREAKPOINT:
  | MantineSize
  | (string & {}) = "xs";
export const MOBILE_BREAKPOINT: MantineBreakpoint = "xs";

// Transitions
export const TRANSITION_DURATION = 200;
export const TRANSITION_MODAL_MOBILE: MantineTransition = "fade";

// Z-index
export const Z_INDEX_LOADER = 1;
export const Z_INDEX_LAYOUT = 2;
export const Z_INDEX_OVERLAY = 3;

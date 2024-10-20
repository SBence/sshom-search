import { atom, Getter, PrimitiveAtom, Setter } from "jotai";
import { DEFAULT_ITEMS_PER_PAGE } from "./config/search";
import { PaginatedSearchItems } from "./types/api";

function atomWithResetArgs<BaseAtomType, AtomToResetType>(
  baseAtom: PrimitiveAtom<BaseAtomType>,
  atomToReset: PrimitiveAtom<AtomToResetType>,
  resetValue: AtomToResetType,
) {
  return [
    (get: Getter) => get(baseAtom),
    (_get: Getter, set: Setter, newValue: BaseAtomType) => {
      set(baseAtom, newValue);
      set(atomToReset, resetValue);
    },
  ] as const;
}

export const headerHeightAtom = atom(NaN);

// Search
const searchFacetsBaseAtom = atom<string[]>([]);
export const searchValueAtom = atom("");
const searchQueryBaseAtom = atom("");

// Search results
export const resultsLoadingAtom = atom(false);
export const searchResultsAtom = atom<PaginatedSearchItems>();

// Pagination
export const activePageAtom = atom(1);
const itemsPerPageBaseAtom = atom<number>(DEFAULT_ITEMS_PER_PAGE);
export const itemsPerPageInputAtom = atom<number>(DEFAULT_ITEMS_PER_PAGE);

// Derived atoms
export const searchValueTrimmedAtom = atom((get) =>
  get(searchValueAtom).trim(),
);
export const searchFacetsAtom = atom(
  ...atomWithResetArgs(searchFacetsBaseAtom, activePageAtom, 1),
);
export const searchQueryAtom = atom(
  (get: Getter) => get(searchQueryBaseAtom),
  (_get: Getter, set: Setter, newValue: string) => {
    set(searchQueryBaseAtom, newValue.trim());
    set(activePageAtom, 1);
    set(searchFacetsBaseAtom, []);
  },
);
export const itemsPerPageAtom = atom(
  ...atomWithResetArgs(itemsPerPageBaseAtom, activePageAtom, 1),
);

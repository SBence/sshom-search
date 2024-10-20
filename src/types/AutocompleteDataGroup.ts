interface FilterDataItem {
  value: string;
  label: string;
}

export interface FilterDataGroup {
  group: string;
  items: FilterDataItem[];
}

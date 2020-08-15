import { FilterValue, FilterType } from "./filter.config";

export abstract class FilterClass {
  filterName: string = "";
  filterType: FilterType = FilterType.FreeText;
  value: FilterValue;
  inUse = false;
  constructor(filterName: string, value: FilterValue) {
    this.filterName = filterName;
  }
  abstract setValue(value: FilterValue): void;
  getValue(): FilterValue {
    return this.value;
  }
  abstract parseToQuery(): { [key: string]: string };
}

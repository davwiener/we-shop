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
  getFilterFromQuery(query: Record<string, any>, currentFilter?: FilterClass): Record<string, string> {
    return query[this.filterName];
  }
  getValue(): FilterValue {
    return this.value;
  }
  isFilterEmpty(): boolean {
    return this.value;
  }
  abstract parseToQuery(): { [key: string]: string } | {};
  protected capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}

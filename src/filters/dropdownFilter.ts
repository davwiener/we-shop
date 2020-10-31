import { FilterValue, FilterType } from "./filter.config";
import { filterClass } from "./filter";


export class dropdownFilter extends filterClass {
  filterType = FilterType.Dropdown;
  value: string = '';
  options: Record<string, string>;
  constructor(filterName: string, value: FilterValue, options: Record<string, string>) {
    super(filterName, value);
    this.options = options;
    this.setValue(value);
  }
  setValue(value: string) {
    this.value = value;
  }
  parseToQuery() {
    if (this.isFilterEmpty()) {
      return {};
    }
    const ret: { [key: string]: string } = {};
    ret[this.filterName] = this.value;
    return ret;
  }
  isFilterEmpty() {
    return !this.value.length;
  }
  getValue() {
    return this.value;
  }
}

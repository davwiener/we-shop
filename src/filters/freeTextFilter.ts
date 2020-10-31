import { filterClass } from "./filter";
import { FilterType, FilterValue } from "./filter.config";

export class freeTextFilter extends filterClass {
  filterType = FilterType.FreeText;
  value: string = "";
  constructor(filterName: string, value: FilterValue) {
    super(filterName, value);
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
    return this.value.length === 0;
  }
}

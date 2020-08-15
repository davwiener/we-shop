import { FilterClass } from "./filter";
import { FilterType, FilterValue } from "./filter.config";

export class FreeTextFilter extends FilterClass {
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
    const ret: { [key: string]: string } = {};
    ret[this.filterName] = this.value;
    return ret;
  }
}

import { FilterValue, FilterType } from "./filter.config";
import { FilterClass } from "./filter";
import { Range } from "react-input-range";

export class RangeFilter extends FilterClass {
  filterType = FilterType.Range;
  value: Range = { min: 0, max: 0 };
  constructor(filterName: string, value: FilterValue) {
    super(filterName, value);
    this.setValue(value);
  }
  setValue(newValue: Range) {
    this.value.min = newValue.min;
    this.value.max = newValue.max;
  }
  parseToQuery() {
    if (this.isFilterEmpty()) {
      return {};
    }
    const ret: { [key: string]: string } = {};
    ret[
      `min${this.capitalizeFirstLetter(this.filterName)}`
    ] = this.value.min.toString();
    ret[
      `max${this.capitalizeFirstLetter(this.filterName)}`
    ] = this.value.max.toString();
    return ret;
  }
  isFilterEmpty() {
    return !(this.value.min || this.value.max);
  }
}

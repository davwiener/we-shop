import { FilterValue, FilterType } from "./filter.config";
import { string } from "yup";
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
    const ret: { [key: string]: string } = {};
    ret[this.filterName] =
      this.value.min.toString() + "-" + this.value.max.toString();
    return ret;
  }
}

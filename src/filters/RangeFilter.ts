import { FilterValue, FilterType } from "./filter.config";
import { filterClass } from "./filter";
import { Range } from "react-input-range";

export class rangeFilter extends filterClass {
  filterType = FilterType.Range;
  value: Range = { min: 0, max: 0 };
  minFilterName: string;
  maxFilterName: string;
  constructor(filterName: string, value: FilterValue) {
    super(filterName, value);
    this.setValue(value);
    this.minFilterName = `min${this.capitalizeFirstLetter(this.filterName)}`
    this.maxFilterName = `max${this.capitalizeFirstLetter(this.filterName)}`
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
      this.minFilterName
    ] = this.value.min.toString();
    ret[
      this.maxFilterName
    ] = this.value.max.toString();
    return ret;
  }
  isFilterEmpty() {
    return !(this.value.min || this.value.max);
  }
  getFilterFromQuery(query: Record<string, any>, currentFilter: filterClass): Record<string, string> {
    if (query[this.minFilterName] && query[this.maxFilterName]) {
      return {min: query[this.minFilterName], max: query[this.maxFilterName]}
    } else {
      return currentFilter.getValue();
    }
  }
}

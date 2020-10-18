import { FilterValue, FilterType } from "./filter.config";
import { FilterClass } from "./filter";

interface dateValue {
  startDate: string;
  endDate: string;
}
export class DateFilter extends FilterClass {
  filterType = FilterType.Date;
  value: dateValue = { startDate: "", endDate: "" };
  constructor(filterName: string, value: FilterValue) {
    super(filterName, value);
    this.setValue(value);
  }
  setValue(value: dateValue) {
    this.value.startDate = value.startDate;
    this.value.endDate = value.endDate;
  }
  parseToQuery() {
    if (this.isFilterEmpty()) {
      return {};
    }
    return {
      endDate: Date.parse(this.value.startDate).toString(),
      startDate: Date.parse(this.value.endDate).toString(),
    };
  }
  isFilterEmpty() {
    return !(this.value.startDate || this.value.endDate);
  }
  getValue() {
    return this.value.startDate;
  }
}

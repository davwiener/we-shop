import { FilterValue, FilterType } from "./filter.config";
import { string } from "yup";
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
    return { dateFilter: this.value.startDate + "-" + this.value.endDate };
  }
  getValue() {
    return this.value.startDate;
  }
}

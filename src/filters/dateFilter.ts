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
  getFilterFromQuery(query: Record<string, any>, filter?: FilterClass): Record<string, string> {
    return {startDate: query.startDate ? new Date(Number(query['startDate'])).toISOString().substring(0,16) : '', 
    endDate: query.endDate ? new Date(Number(query['endDate'])).toISOString().substring(0,16) : ''}
  }
}

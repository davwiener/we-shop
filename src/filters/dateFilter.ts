import { FilterValue, FilterType } from "./filter.config";
import { filterClass } from "./filter";

export interface DateValue {
  startDate: string;
  endDate: string;
}
export class dateFilter extends filterClass {
  filterType = FilterType.Date;
  value: DateValue = { startDate: "", endDate: "" };
  constructor(filterName: string, value: FilterValue) {
    super(filterName, value);
    this.setValue(value);
  }
  setValue(value: DateValue) {
    this.value = {...value};
  }
  parseToQuery(): Record <string, string> {
    if (this.isFilterEmpty()) {
      return { startDate: "", endDate: "" };
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
  getFilterFromQuery(query: Record<string, any>, filter?: filterClass): Record<string, string> {
    return {startDate: query.startDate ? new Date(Number(query['startDate'])).toISOString().substring(0,16) : '', 
    endDate: query.endDate ? new Date(Number(query['endDate'])).toISOString().substring(0,16) : ''}
  }
}

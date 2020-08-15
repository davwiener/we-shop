import { FilterValue } from "../../filters/filter.config";

export interface filterType {
  value: any;
  type: string;
  action: CallableFunction;
  text: string;
}

export interface ProductsState {
  filters: { [key: string]: FilterValue };
  products: any[];
  loaded: boolean;
}

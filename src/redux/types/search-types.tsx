import { FilterValue } from "../../filters/filter.config";

export interface filterType {
  value: any;
  type: string;
  action: CallableFunction;
  text: string;
}

export interface ProductsState {
  filters: { [key: string]: FilterValue; page: number };
  products: any[];
  loaded: boolean;
  hasMore: boolean;
}

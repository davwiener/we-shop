export interface filterType {
  value: any;
  type: string;
  action: CallableFunction;
  text: string;
}

export interface filtersState {
  price: filterType;
  date: filterType;
  productName: filterType;
  productKind: filterType;
  [key: string]: filterType;
}

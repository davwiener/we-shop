import {
  productPriceAction,
  productDateAction,
  prodcutKindAction,
} from "./search-actions";

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
export const INITIALE_FILTER_STATE: filtersState = {
  price: {
    value: { min: 5, max: 17 },
    type: "range",
    action: productPriceAction,
    text: "",
  },
  date: {
    value: {
      endDate: new Date(),
      startDate: new Date(),
    },
    type: "datePicker",
    action: productDateAction,
    text: "",
  },
  productName: {
    value: "",
    type: "freeText",
    action: prodcutKindAction,
    text: "",
  },
  productKind: {
    value: "",
    type: "freeText",
    action: productPriceAction,
    text: "",
  },
};

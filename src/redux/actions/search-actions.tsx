import * as actionTypes from "../action-types";
export const productPriceAction = (price: { min: number; max: number }) => ({
  type: actionTypes.updatePrice,
  payload: price,
});
export const prodcutKindAction = (kind: string) => ({
  type: actionTypes.updateProdictKind,
  payload: kind,
});
export const productDateAction = (date: {
  startDate: Date;
  endDate: Date;
}) => ({
  type: actionTypes.updateDate,
  payload: date,
});
export const productNameAction = (name: string) => ({
  type: actionTypes.updateProductName,
  payload: name,
});

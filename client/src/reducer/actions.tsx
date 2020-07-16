export const openPopUpAction = (popUp: string) => ({
  type: "OPEN_POPUP",
  payload: popUp,
});
export const closePopUpAction = () => ({
  type: "CLOSE_POPUP",
});
export const productPriceAction = (price: { min: number; max: number }) => ({
  type: "PRICE",
  payload: price,
});
export const prodcutKindAction = (kind: string) => ({
  type: "PRODUCT_KIND",
  payload: kind,
});
export const productDateAction = (date: {
  startDate: Date;
  endDate: Date;
}) => ({
  type: "PRODUCT_DATE",
  payload: date,
});
export const productNameAction = (name: string) => ({
  type: "PRODUCT_NAME",
  payload: name,
});
// export) const updateUserName = (userName: string) => {
//   type: "USER_NAME";
//   payload: userName;
// };

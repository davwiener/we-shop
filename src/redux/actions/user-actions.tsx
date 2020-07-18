import * as actionTypes from "../action-types";
export const openPopUpAction = (popUp: string) => ({
  type: actionTypes.openPopUp,
  payload: popUp,
});
export const closePopUpAction = () => ({
  type: actionTypes.closePopUp,
});
export const userNameAction = () => ({
  type: actionTypes.userName,
});

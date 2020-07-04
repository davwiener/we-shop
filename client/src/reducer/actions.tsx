export const openPopUpAction = (popUp: string) => ({
  type: "OPEN_POPUP",
  payload: popUp,
});
export const closePopUpAction = () => ({
  type: "CLOSE_POPUP",
});
// export const updateUserName = (userName: string) => {
//   type: "USER_NAME";
//   payload: userName;
// };

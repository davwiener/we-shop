import "./popup.scss";
import React from "react";
import { useDispatch } from "react-redux";
import { closePopUpAction } from "../../../redux/actions/user-actions";
function PopUp(props: any) {
  const dispatch = useDispatch();
  console.log("popup");
  return (
    <div className="popup">
      <div className="popup_inner">
        <button
          type="button"
          className="close"
          aria-label="Close"
          onClick={() => {
            dispatch(closePopUpAction());
          }}
        >
          <span aria-hidden="true">&times;</span>
        </button>
        <div>{props.content}</div>
      </div>
    </div>
  );
}
export default PopUp;

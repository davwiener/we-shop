import { combineReducers, Action, AnyAction } from "redux";
import PopUpService from "../services/popUp-service";
import { Component } from "react";
import { number } from "yup";
import { WeShoopState, filtersState, PopUpState } from "./store.config";
import {
  prodcutKindAction,
  productPriceAction,
  productDateAction,
} from "./actions";
export default combineReducers({});

export const INITIALE_STATE: WeShoopState = {
  userReducer: { userName: "" },
  popUpReducer: { popUp: null },
  filtersReducer: {
    price: {
      value: { min: 5, max: 17 },
      type: "range",
      action: productPriceAction,
    },
    date: {
      endDate: new Date(),
      startDate: new Date(),
      type: "datePicker",
      action: productDateAction,
    },
    productName: { value: "", type: "freeText" },
    productKind: { value: "", type: "freeText" },
  },
};
// const [filters] = useState([
//   {
//     text: "סוג",
//     type: "freeText",
//     action: prodcutKindAction,
//   },
//   {
//     text: "מוצר",
//     type: "freeText",
//     value: useSelector((state: WeShoopState) => {
//       return state.filtersReducer.productName;
//     }),
//     action: prodcutKindAction,
//   },
//   {
//     text: "מחיר",
//     type: "range",
//     value: useSelector((state: WeShoopState) => {
//       return state.filtersReducer.price;
//     }),
//     action: productPriceAction,
//   },
//   {
//     text: "תאריך סיוםף",
//     type: "datePicker",
//     value: useSelector((state: WeShoopState) => {
//       return state.filtersReducer.date;
//     }),
//     action: productDateAction,
//   },
// ]);
function userReducer(
  state: { userName: string } = { userName: "" },
  action: AnyAction
) {
  switch (action.type) {
    case "USER_NAME": {
      return {
        ...state,
        userName: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}
function popUpReducer(
  state: PopUpState = INITIALE_STATE.popUpReducer,
  action: AnyAction
) {
  switch (action.type) {
    case "OPEN_POPUP": {
      return {
        ...state,
        popUp: PopUpService.openPopup(action.payload),
      };
    }
    case "CLOSE_POPUP": {
      return {
        ...state,
        popUp: undefined,
      };
    }
    default: {
      return state;
    }
  }
}

function filtersReducer(
  state: filtersState = INITIALE_STATE.filtersReducer,
  action: AnyAction
) {
  switch (action.type) {
    case "DATE": {
      return {
        ...state,
        date: action.payload,
      };
    }
    case "PRICE": {
      return {
        ...state,
        price: { ...state.price, value: action.payload },
      };
    }
    case "PRODUCT_NAME": {
      return {
        ...state,
        productName: action.paylaod,
      };
    }
    case "PRODUCT_KIND": {
      return {
        ...state,
        productKind: action.paylaod,
      };
    }
    default: {
      return state;
    }
  }
}
// const closePopup = () => {
//   setShowPopup(false);
//   setPopup({});
// };

export const rootReducer = combineReducers({
  userReducer,
  popUpReducer,
  filtersReducer,
});

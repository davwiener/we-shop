import React from "react";
import { createStore, applyMiddleware, compose } from "redux";
import WeShop from "./we-shop/we-shop";
import { Provider } from "react-redux";
import { rootReducer, INITIALE_STATE } from "./reducer/store";
import "./App.css";
const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
function App() {
  return (
    <Provider store={store}>
      <WeShop />
    </Provider>
  );
}

export default App;

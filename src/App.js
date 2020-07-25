import React from "react";
import { createStore, applyMiddleware } from "redux";
import WeShop from "./we-shop/we-shop";
import { Provider } from "react-redux";
import { rootReducer } from "./redux/store";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import "./App.css";
const loggerMiddleware = createLogger();
// const store = createStore(
//   rootReducer,
//   applyMiddleware(thunkMiddleware, loggerMiddleware),
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// );
const store = createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware, loggerMiddleware)
);
function App() {
  return (
    <Provider store={store}>
      <WeShop />
    </Provider>
  );
}

export default App;

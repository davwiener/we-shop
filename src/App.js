import React from "react";
import { createStore, applyMiddleware } from "redux";
import WeShop from "./WeShop/WeWhop";
import { Provider } from "react-redux";
import { rootReducer } from "./redux/store";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
import "./App.css";
const loggerMiddleware = createLogger();
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunkMiddleware, loggerMiddleware))
);
function App() {
  return (
    <Provider store={store}>
      <WeShop />
    </Provider>
  );
}

export default App;

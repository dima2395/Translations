import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import rootReducer from "redux/reducers";
import { composeWithDevTools } from "redux-devtools-extension/logOnlyInProduction";
import { middleware as flashMiddleware } from "redux-flash";

// eslint-disable-next-line
const store = createStore(
  rootReducer,
  {},
  composeWithDevTools(applyMiddleware(thunkMiddleware, flashMiddleware()))
);

export { store };

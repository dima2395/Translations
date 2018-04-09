import { combineReducers } from "redux";
import translations from "./translations";
import { reducer as modal } from "redux-modal";
import { reducer as form } from "redux-form";
import { reducer as flash } from "redux-flash";

export default combineReducers({
  translations,
  modal,
  flash,
  form
});

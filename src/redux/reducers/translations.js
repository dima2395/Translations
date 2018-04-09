import api from "api";
import { flashMessage } from "redux-flash";
import { hide as hideModal } from "redux-modal";
import { reset as resetForm } from "redux-form";

const GET_TRANSLATIONS = "GET_TRANSLATIONS";
const GET_TRANSLATION = "GET_TRANSLATION";
const GET_LANGUAGES = "GET_LANGUAGES";
const SET_LANGUAGE = "SET_LANGUAGE";
const ADD_TRANSLATION = "ADD_TRANSLATION";
const ADD_TRANSLATION_SYNC = "ADD_TRANSLATION_SYNC";
const UPDATE_TRANSLATION = "UPDATE_TRANSLATION";

const INITIAL_STATE = {
  languages: [],
  translations: [],
  language: "ru"
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_LANGUAGES:
      return {
        ...state,
        languages: action.payload ? action.payload : INITIAL_STATE.languages
      };
    case GET_TRANSLATIONS:
      return {
        ...state,
        translations: action.payload ? action.payload : state.translations
      };
    case ADD_TRANSLATION_SYNC:
      const indexToReplace = state.translations.findIndex(
        trans => trans.id === action.payload.id
      );
      let result;
      if (indexToReplace === -1) {
        result = {
          ...state,
          translations: action.payload
            ? [...state.translations, action.payload]
            : state.translations
        };
      } else {
        result = {
          ...state,
          translations: state.translations.map(
            translation =>
              translation.id === action.payload.id
                ? action.payload
                : translation
          )
        };
      }
      return result;
    case SET_LANGUAGE:
      return {
        ...state,
        language: action.payload
      };
    default:
      return state;
  }
}

export const setLanguage = lang => ({
  type: SET_LANGUAGE,
  payload: lang
});

export const getLanguages = () => dispatch => {
  dispatch({ type: GET_LANGUAGES });
  return api.translations.getLanguages().then(res => {
    dispatch({
      type: GET_LANGUAGES,
      payload: res.data
    });
  });
};

export const addTranslationSync = translation => ({
  type: ADD_TRANSLATION_SYNC,
  payload: translation
});

export const getTranslation = id => dispatch => {
  dispatch({ type: GET_TRANSLATION });
  return api.translations.getTranslation(id).then(res => {
    dispatch(addTranslationSync(res.data));
  });
};

export const getTranslations = () => dispatch => {
  dispatch({ type: GET_TRANSLATIONS });
  return api.translations.getTranslations().then(res => {
    dispatch({
      type: GET_TRANSLATIONS,
      payload: res.data
    });
  });
};

export const addTranslation = translation => dispatch => {
  dispatch({ type: ADD_TRANSLATION });
  return api.translations.addTranslation(translation).then(res => {
    dispatch(addTranslationSync(res.data));
    dispatch(resetForm("translation"));
    dispatch(flashMessage("Сохранено"));
  });
};

export const updateTranslation = (id, translation) => dispatch => {
  dispatch({ type: UPDATE_TRANSLATION });
  return api.translations.updateTranslation(id, translation).then(res => {
    dispatch(addTranslationSync(res.data));
    dispatch(hideModal("create-update"));
    dispatch(flashMessage("Сохранено"));
  });
};

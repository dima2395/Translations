import axios from "axios";
import { store } from "redux/store";

// listener for translations language change
function listener() {
  let language = selectLanguage(store.getState());
  axios.defaults.headers.common["Accept-Language"] = language;
}

function selectLanguage(state) {
  return state.translations.language;
}

store.subscribe(listener);

const config = {
  baseURL: "http://new.whoer.net/",
  headers: {
    "Content-Type": "application/json"
  },
  withCredentials: true
};

const api_axios = axios.create(config);

let api = {
  translations: {
    getLanguages: () => {
      return api_axios.get("/languages", {
        withCredentials: false
      });
    },
    getTranslations: () => {
      return api_axios.get("/translations");
    },
    getTranslation: id => {
      return api_axios.get(`/translation/${id}`);
    },
    addTranslation: translation => {
      return api_axios.post("/translation", translation);
    },
    updateTranslation: (id, translation) => {
      return api_axios.put(`/translation/${id}`, {
        snippet: translation.snippet
      });
    }
  }
};

export default api;

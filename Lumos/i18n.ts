import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";

import en from "./locales/en.json";
// import ro from "./ro.json";

const resources = {
  en: { translation: en },
  // ro: { translation: ro },
};

const fallback = "en";
// get device preferred languages
const locales = Localization.getLocales();
const languageTag =
  locales && locales.length > 0
    ? locales[0].languageTag.split("-")[0] // "en-US" -> "en"
    : fallback;

i18next.use(initReactI18next).init({
  // compatibilityJSON: "v3",
  resources,
  lng: languageTag,
  fallbackLng: fallback,
  interpolation: {
    escapeValue: false,
  },
});

export default i18next;

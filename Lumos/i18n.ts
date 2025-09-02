import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "react-native-localize";

import en from "./locales/en.json";

// Detect device language
const locales = Localization.getLocales();
const deviceLanguage = locales[0]?.languageCode || "en";

i18n.use(initReactI18next).init({
  //   compatibilityJSON: "v3",
  lng: deviceLanguage, // fallback to device language
  fallbackLng: "en",
  resources: {
    en: { translation: en },
  },
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;

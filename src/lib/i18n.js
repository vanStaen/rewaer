import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import dataEn from "./languages/en/translation.json";
import dataDe from "./languages/de/translation.json";
import dataFr from "./languages/fr/translation.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: false,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: dataEn,
      },
      de: {
        translation: dataDe,
      },
      fr: {
        translation: dataFr,
      },
    },
  });

export default i18n;

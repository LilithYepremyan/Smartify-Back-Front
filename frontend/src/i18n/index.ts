import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import LanguageDetector from "i18next-browser-languagedetector"

import en from "./en.json"
import ru from "./ru.json"
import am from "./am.json"

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    resources: {
      en: { translation: en },
      ru: { translation: ru },
      am: { translation: am },
    },
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n

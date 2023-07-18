import { createI18n } from "vue-i18n";
import en from "@/locales/en";
import ka from "@/locales/ka";

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: "en",
  fallbackLocale: "en",
  messages: {
    en,
    ka,
  },
});

export default i18n;

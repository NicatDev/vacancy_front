import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en.json";
import az from "./az.json";

const DEFAULT_LANGUAGE = 'az';

const language = localStorage.getItem('language') || DEFAULT_LANGUAGE;

export const languages = [
    { code: 'az', name: 'Azərbaycan' },
    { code: 'en', name: 'English' },
];

const resources = {
    en: { translation: en },
    az: { translation: az },
};


const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
    // window.location.reload();
}


i18n.use(initReactI18next).init({
    resources,
    lng: language,
    fallbackLng: DEFAULT_LANGUAGE,
    interpolation: { escapeValue: false },
});

export default {
    languages,
    changeLanguage
};
export { i18n };
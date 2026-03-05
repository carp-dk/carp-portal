import i18n from 'i18next';
import backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

i18n
  .use(backend)
  .use(initReactI18next)
  .init({
    supportedLngs: ['en', 'da'],
    lng: 'en',
    fallbackLng: 'en',
    ns: ['common', 'error', 'deployment', 'participant'],
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    showSupportNotice: false,
  });

export default i18n;

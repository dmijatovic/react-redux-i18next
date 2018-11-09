import i18n from 'i18next';
import { reactI18nextModule } from 'react-i18next';
import languageDetector from 'i18next-browser-languagedetector';
import xhrBackend from 'i18next-xhr-backend';

// do not import * as US as it will
import US from '../../static/locale/en/us.json';
import NL from '../../static/locale/nl/nl.json';

// the translations
const resources = {
  en: {
    us: US,
    cfg: {
      label: 'English',
      img: 'img/us.svg',
    },
  },
  nl: {
    nl: NL,
  },
};

i18n
  .use(xhrBackend)
  .use(languageDetector)
  .use(reactI18nextModule) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'nl',
    debug: true,
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    // react-i18next options
    react: {
      wait: true,
    },
  });

export default i18n;

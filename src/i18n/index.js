import i18next from 'i18next';
import { reactI18nextModule } from 'react-i18next';
import languageDetector from 'i18next-browser-languagedetector';
import xhrBackend from 'i18next-xhr-backend';
import saveLanguage from './saveLanguage';
import getLanguage from './getLanguage';
//import cache from 'i18next-cache'
import cfg from '../store/app.cfg';
import * as actionType from '../store/actions';
// do not import * as US as it will add default key
// only import default language
import US from '../../static/locale/en/us.json';

/**
 * Initialize i18next with defaul language
 */
const resources = {
  en: {
    core: US,
  },
};

let i18n = i18next
  .use(xhrBackend)
  .use(languageDetector)
  .use(reactI18nextModule) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'en',
    defaultNS: 'core',
    //fallbackLng: 'nl',
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
/**
 * Set language key into localStorage
 * @param {string} lang 2-letter language key stored in definitions
 */
export const setLanguage = ({ key, ns, data }) => {
  //debugger;
  if (i18n.hasResourceBundle(key, ns)) {
    console.log('Have language in the resource');
    //change language
    i18n.changeLanguage(key);
    //save to localStorage
    saveLanguage(key);
  } else if (data) {
    i18n.addResourceBundle(key, ns, data);
    console.log(`Added language ${key} in the resource`);
    //change language
    i18n.changeLanguage(key);
    //save to localStorage
    saveLanguage(key);
  } else {
    console.log(`Missing language ${key} in the resource`);
  }
};

/**
 * Intial loading of language information
 */
export const initLocale = dispatch => {
  //debugger;
  //get language key from localStorage or config
  let lang = getLanguage();
  if (lang) {
    dispatch({
      type: actionType.GET_LANGUAGE,
      payload: {
        ...lang,
      },
    });
  } else {
    //eslint-disable-next-line
    console.warn("locale.initLocale...could not extract locale");
  }
};

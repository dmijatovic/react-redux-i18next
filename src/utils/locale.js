/**
 * Localization functions
 * save and load language preference from localStorage
 *
 */

import cfg from '../store/app.cfg';
import * as actionType from '../store/actions';

import i18n from '../i18n';

/**
 * Get user language from localStorage
 * or default from store/app.cfg.js
 * @param {string} key localStorage key to use to retreive value
 */
export const getLanguage = key => {
  //debugger
  let l = localStorage.getItem(key);
  if (l) {
    return l;
  } else {
    /* if user have for more than one language defined -> MAYBE SOME DAY, not now
      if (navigator.languages){
      console.log("navigator.languages...",navigator.languages)
    }*/
    //get navigator language
    if (navigator.language) {
      //debugger
      //get first 2 letter from the locale
      let ln = navigator.language.split('-');
      //check if language available in cfg
      let lang = cfg.i18r.options.filter(
        item => item.key == ln[0]
      );
      if (lang.length === 1) {
        return lang[0].key;
        //console.log("using navigator.language...",lang);
      }
    }
    //navigator language is not available
    //so use default from config
    return cfg.i18r.defaultLang;
  }
};

/**
 * Set language key into localStorage
 * @param {string} lang 2-letter language key stored in definitions
 */
export const setLanguage = lang => {
  let { lsKey, key, ns, data } = lang;

  debugger;

  if (localStorage) {
    localStorage.setItem(lsKey, key);
  } else {
    //eslint-disable-next-line
    console.error("localStorage...MISSING");
  }

  if (i18n.hasResourceBundle(key, ns)) {
    console.log('Have language in the resource');
    //change language
    i18n.changeLanguage(key);
  } else if (data) {
    i18n.addResourceBundle(key, ns, data);
    console.log(`Added language ${key} in the resource`);
    //change language
    i18n.changeLanguage(key);
    //trans = i18n.getFixedT(ns);
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
  let key = getLanguage(cfg.i18n.lsKey);
  //get info where translations are
  let ln = cfg.i18n.options.filter(item => item.key === key);
  if (ln.length === 1) {
    dispatch({
      type: actionType.GET_LANGUAGE,
      payload: {
        ...ln[0],
      },
    });
  } else {
    //eslint-disable-next-line
    console.warn("locale.initLocale...could not extract locale");
  }
};

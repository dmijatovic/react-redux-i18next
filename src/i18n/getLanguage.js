import cfg from '../store/app.cfg';

/**
 * Get user language from localStorage
 * or default from store/app.cfg.js
 */
export const getLanguageDef = () => {
  let lang = [];
  //debugger;
  let l = localStorage.getItem(cfg.i18n.lsKey);
  if (l) {
    //check if language available in cfg
    lang = cfg.i18n.options.filter(item => item.key == l);
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
      lang = cfg.i18n.options.filter(item => item.key == ln[0]);
    } else {
      lang = cfg.i18n.options.filter(
        item => item.key === cfg.i18n.defaultLang
      );
    }
  }
  if (lang.length === 1) {
    return lang[0];
    //console.log("using navigator.language...",lang);
  } else {
    return null;
  }
};

export default getLanguageDef;

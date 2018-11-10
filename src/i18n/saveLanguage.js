import cfg from '../store/app.cfg';

/**
 * Save language key into localStorage
 * @param {string} lang 2-letter language key stored in definitions
 */
export const saveLanguage = val => {
  if (localStorage) {
    localStorage.setItem(cfg.i18n.lsKey, val);
  } else {
    //eslint-disable-next-line
    console.error("localStorage...MISSING");
  }
};

export default saveLanguage;

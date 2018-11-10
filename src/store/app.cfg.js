/**
 * Inital app configuration
 * note! the values are imported inyo redux store
 */
export const cfg = {
  header: {
    logo: {
      src: 'img/dv4all_logo_v7_2016_hd.svg',
    },
    //these will be translated in redux middleware
    //see middleware.getTranslation
    // appTitle:null,
    // pageTitle:null
  },
  //clock inital values
  clock: {
    time: {
      hrs: '00',
      min: '00',
    },
    update: 1000,
    semicolon: true,
  },
  //app-loader
  loader: {
    type: 'roller',
    show: true,
  },
  //internationalization
  i18n: {
    defaultLang: 'en',
    //localStorage key
    lsKey: 'dv4all.app.lang',
    //list of languages
    options: [
      {
        key: 'en',
        //i18next ns=namespace
        ns: 'core',
        label: 'English',
        data: 'locale/en/us.json',
        icon: 'img/us.svg',
      },
      {
        key: 'nl',
        //i18next ns=namespace
        ns: 'core',
        label: 'Nederlands',
        data: 'locale/nl/nl.json',
        icon: 'img/nl.svg',
      },
      {
        key: 'ru',
        //i18next ns=namespace
        ns: 'core',
        label: 'Русский',
        data: 'locale/ru/ru.json',
        icon: 'img/ru.svg',
      },
    ],
    //current language info goes here
    //see languageReducer for implementation
    lang: {
      key: null,
      label: null,
      data: null,
    },
  },
  //list of data api points
  api: {
    baseUrl: '',
    point1: 'sample/example',
  },
};

export default cfg;

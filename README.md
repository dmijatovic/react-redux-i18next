# React-redux-i18next demo

This is webpack 4 starter with scss enabled, babel version 7 and redux. It test use of react-i18next and redux for handling localization. The project is continuation of [react-w4-starter](https://github.com/dmijatovic/react-webpack4-starter). For explanation about basic setup look at that repo. This repo focus is on i18next translation approach I plan to use.

## NPM scripts

- `npm start:` start webpack in watch mode passing dev environment (--env=dev).
- `npm run dev:` start webpack-dev-server using dev environment (--env=dev)
- `npm run build:dev:` Build development version.
- `npm run build:` Build production version to dist folder. Note that previous build will be removed first.

## Translations with [i18next](https://react.i18next.com/)

i18next documentation is good. Here I will write down some gotchas?

- DO NOT import \* from './translation.json' because it will add default property

```javascript
//DONT
import * as US from "./locale/en/translation.json";
//DO
import US from "./locale/en/translation.json";
```

### How to add language?

- **create translation file**: create new json file based on the default json file en.json at the same location (static/data/en.json). The filename needs to be defined in the config file (see point 3). Go to google translate and translate all items :-). _Maybe we can use Google Translate API?!? When double-quotes (") appear in the text use escape chart (\\). See example below._

```json
{
  "key": "This text value uses double-quotes \" to quote this text \"."
}
```

- **add language icon**: the assets folder contains all country flags as of 2018. We use 4x3 format. Copy svg icon into static/img/ folder. Note that location and file name should be provided in config file under _icon_ key (see next point).

- **add language option to config** (store/app.cfg.js): add new options item into options object array. Ensure values of data and icon reflecting actual location (excluding static folder name).

```javascript
//---start section of cfg object --
i18n:{
  defaultLang:'en',
  //localStorage key
  lsKey:'dv4all.app.lang',
  //list of languages
  options:[
    {
      key:'en',
      label:'English',
      data:'data/en.json',
      icon:'img/us.svg'
    },{
      key:'nl',
      label:'Dutch',
      data:'data/nl.json',
      icon:'img/nl.svg'
    }
    /* add new language options here. Ensure values are correct!
      example new language option:
        {
          key:'pl',
          label:'Polski',
          data:'data/pl.json',
          icon:'img/pl.svg'
        }
    */
  ]
  //... more config here
}
//---end section of cfg object --
```

### Methods

Script **locale.js (util/locale.js)** performs following operations:

- `getLanguage(key)`: provided localStorage key the function will try to get users language preference. This is possible for the users that already visited site and did not cleared localStorage. If no prefference value exists in the localStorage we check navigator.language. If navigator language is avaliable in translations we will load it, otherwise we will load default language defined in config file (store/app.cfg.js)

- `setLanguage(key,val)`: this function saves language selected by user. The function is called by redux middleware (store/middleware.js) after json file is loaded.

- `initLocale(dispatch)`: this is initial function called from index.js at the start of application. It will retreive info about which language file should be lodaded and dispatch GET_LANGUAGE action. This action will be intercepted by custom middleware which will fetch json file and on success 'transform' action type into SET_LANG_OK. For the list of language actions see redux actons file (store/actions.js)

Script **middleware.js (store/middleware.js)** holds `asyncFetch` method responsible for loading json file using fetch API. This method will transform 'initial' action type GET_LANGUAGE into 'final' action types SET_LANG_OK or SET_LANG_ERR.

## Add new page

To add new page into this project following steps are required

- **create page component**: at location `src/page/` create new react file.
- **add page to router**: at location `src/router/routes.js` import you page component and extend route definition.

```javascript
//extend routes configuration with your component
import NewPage from "../page/NewPage.js";

const routes = [
  { path: "/", to: "/home", type: "redirect", props: { exact: true } },
  {
    path: "/home",
    component: HomePage,
    label: "Home",
    type: "component",
    props: { exact: true }
  },
  {
    path: "/about",
    component: AboutPage,
    label: "About",
    type: "component",
    props: { exact: true }
  },
  {
    path: "/error/:id",
    component: ErrorPage,
    props: { exact: true },
    type: "component"
  },
  { path: "", to: "/error/404", type: "redirect" },
  //add your new page to router here
  {
    path: "/newpage",
    component: NewPage,
    label: "New page",
    type: "component",
    props: { exact: true }
  }
];
```

## Redux

All redux definitions are in store folder. The index.js file in this folder imports all redux parts and creates a store. Then the store is imported in main index.js file.

```javascript
//index.js
//--- start section ---
//REDUX
import { Provider } from "react-redux";
import appStore from "./store";
//-- end section --
```

### Actions

All action are defined in store/actions.js

### Middleware

All middleware functions are defined in store/middleware.js

### Reducers

All reducers are defined in store/reducers.js

### initialStore values

Initial values are in some reducers taken from config file store/app.cfg.js

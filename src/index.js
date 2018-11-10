//import fetch polyfill
import 'whatwg-fetch';
//babel polyfills
import '@babel/polyfill';

//REACT
import React from 'react';
import ReactDOM from 'react-dom';

//REDUX
import { Provider } from 'react-redux';
import appStore from './store';

//INITIAL LOAD of locale
import { initLocale } from './i18n';
initLocale(appStore.dispatch);

//LOCAL - STYLES
import './styles/index.scss';
//start page
//import Home from './page/Home';
import Page from './layout/Page';

ReactDOM.render(
  <Provider store={appStore}>
    <Page />
  </Provider>,
  document.getElementById('react-root')
);

/**
 * REDUX setup
 * v.0.0.1 Oct 2018
 */
import {
  createStore,
  combineReducers,
  applyMiddleware,
  compose,
} from 'redux';

import {
  loaderReducer,
  headerReducer,
  languageReducer,
  personsReducer,
  i18nextReducer,
} from './reducers';

//APP CUSTOM MIDDLEWARE
import { asyncFetch, actionLogger } from './middleware';

//debugger
const reducers = combineReducers({
  loader: loaderReducer,
  header: headerReducer,
  persons: personsReducer,
  //redux part on i18n
  i18r: languageReducer,
  i18n: i18nextReducer,
});

const appStore = createStore(
  reducers,
  compose(
    applyMiddleware(
      //NOTE! the middleware order matters
      actionLogger,
      asyncFetch
    )
  )
);

export default appStore;

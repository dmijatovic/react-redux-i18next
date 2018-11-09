/**
 * Redux middleware
 * v0.0.1 Nov 2018
 */

import * as actionType from './actions';
//eslint-disable-next-line
import { logGroup, setLanguage } from '../utils';
import cfg from './app.cfg';
/**
 * Fetch data middleware, uses fetch API
 * @param param.getState: fn, received from redux
 * @param param.dispatch: fn, received from redux
 */
export const asyncFetch = ({ getState, dispatch }) => {
  //debugger
  return next => action => {
    // logGroup({
    //   title:"redux.middleware",
    //   method:"fetchData",
    //   status:"next",
    //   action: action
    // })
    //look for specific action types
    //debugger
    switch (action.type) {
      //get translations
      case actionType.GET_LANGUAGE:
        /* change action to show loader
        next ({
          type: actionType.SHOW_LOADER,
        })*/
        //load translations
        fetchTranslations(action.payload.data)
          .then(t => {
            //debugger
            //emit action to set new language
            next({
              type: actionType.SET_LANG_OK,
              payload: {
                ...action.payload,
                data: t,
              },
            });
            //debugger
            //save language preference to localStorage
            setLanguage({
              key: cfg.i18n.lsKey,
              val: action.payload.key,
            });
            /* hide loader
          next ({
            type: actionType.HIDE_LOADER
          })*/
          })
          .catch(err => {
            //debugger
            next({
              type: actionType.SET_LANG_ERR,
              payload: {
                ...action.payload,
                data: null,
                error: err,
              },
            });
            //hide loader
            /*next ({
            type: actionType.HIDE_LOADER
          })*/
          });
        break;
      //fetch data from API
      case actionType.API_DATA_GET:
        //change action to show loader
        next({
          type: actionType.SHOW_LOADER,
        });
        //fetch data
        fetchData(action)
          .then(d => {
            //debugger
            //pass data to reducer
            let payload = prepPayload(
              action.payload.id,
              d,
              null
            );
            next({
              type: actionType.API_DATA_OK,
              payload,
            });
            //debugger
            //return OK to hide loader
            return true;
          })
          .then(ok => {
            //hide loader
            next({
              type: actionType.HIDE_LOADER,
            });
          })
          .catch(error => {
            //debugger
            //change action to API_DATA_ERR
            let payload = prepPayload(
              action.payload.id,
              null,
              error
            );
            next({
              type: actionType.API_DATA_ERR,
              payload,
            });
            //hide loader
            next({
              type: actionType.HIDE_LOADER,
            });
          });
        break;
      default:
        //just pass action
        next(action);
    }
  };
};

/**
 * Load translation json file
 * @param {string} url
 */
function fetchTranslations(url) {
  return fetch(url)
    .then(resp => {
      //debugger
      return resp.json();
    })
    .catch(e => {
      throw e;
    });
}

/**
 * Format response to add actionId into
 * data object.
 * @param {*} action
 * @param {*} resp
 */
function prepPayload(id, data, error = null) {
  //create new object
  let payload = {};
  //create key for original requestId
  //and add payload to it
  payload[id] = {
    id,
    data,
    error,
  };
  return payload;
}

/**
 * Async function that fetches data from api using fetchAPI
 * info is pulled from definitions stored in config (app.cfg.js)
 */
function fetchData(action) {
  //get url and type of call
  let apiPoint = cfg.api[action.payload.id];
  let options = {
    method: apiPoint.method,
  };
  //check posting data
  if (apiPoint.method === 'POST') {
    //add data to body of post request
    options['body'] = action.payload.data;
    options['headers'] = {
      'Content-Type': 'application/json',
    };
  }
  //return fetch request
  return fetch(apiPoint.url, options)
    .then(resp => {
      //debugger
      return resp.json();
    })
    .catch(err => {
      //debugger
      //log error
      let e = {
        message: `fetchData ${apiPoint.url} ...FAILED`,
        reason: err,
      };
      //console.error(e.message, e.reason)
      //pass up
      throw e;
    });
}

export const getTranslation = ({ getState, dispatch }) => {
  // logGroup({
  //   title:"redux.middleware",
  //   method:"getTranslation",
  //   status:"enter"
  // })
  return next => action => {
    // logGroup({
    //   title:"redux.middleware",
    //   method:"getTranslation",
    //   status:"next",
    //   action: action
    // })
    // })
    //look for specific action types
    switch (action.type) {
      //get translations
      case actionType.SET_APP_TITLE:
      case actionType.SET_PAGE_TITLE:
        //debugger
        //do we need to translate?
        if (action.payload.translate) {
          //get redux state
          //returns complete store
          let state = getState();
          //extract translations
          let { lang } = state.i18n;
          //do we have data?
          if (lang.data) {
            //extract translation
            let trans = lang.data[action.payload.key];
            if (trans) {
              next({
                type: action.type,
                payload: trans,
              });
            } else {
              //next(action);
            }
          } else {
            //next(action);
          }
        } else {
          //translation not required
          next(action);
        }
        //console.log(store);
        break;
      default:
        //call next to continue the chain
        next(action);
    }
  };
};

/**
 * Custom middleware function that simply logs when called,
 * it should return next(action) function
 * and call it to continue action 'chain' and reach the reducer
 * note! if next(action) is not called the chain will break and action
 * will never reach the reducer
 * @param param.getState: fn, received from redux
 * @param param.dispatch: fn, received from redux
 */
export const actionLogger = ({ getState, dispatch }) => {
  // logGroup({
  //   title:"redux.middleware",
  //   method:"actionLogger",
  //   status:"enter"
  // })
  return next => action => {
    // logGroup({
    //   title:"redux.middleware",
    //   method:"actionLogger",
    //   status:"next",
    //   action: action
    // })
    //call next to continue the chain
    return next(action);
  };
};

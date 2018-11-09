import cfg from './app.cfg';
import * as actionType from './actions';
//eslint-disable-next-line
import { logGroup } from '../utils';

/**
 * Manage the loader states using redux store
 * @param state: object, current redux store state of loader store
 * @param action: object, dispatched redux action
 */
export const loaderReducer = (state = cfg.loader, action) => {
  //just for fun use lowercased action types
  switch (action.type) {
    case actionType.SHOW_LOADER:
      return {
        ...state,
        show: true,
      };
    case actionType.HIDE_LOADER:
      return {
        ...state,
        show: false,
      };
    case actionType.SET_LOADER_TYPE:
      return {
        ...state,
        type: action.payload,
      };
    //always return state
    //to continue 'event' chain
    default:
      return state;
  }
};

export const headerReducer = (state = cfg.header, action) => {
  //log action comming into reducer
  // logGroup({
  //   title:"headerReducer",
  //   state: state,
  //   action: action
  // });

  //define state actions
  switch (action.type) {
    case actionType.SET_PAGE_TITLE:
      return {
        ...state,
        pageTitle: action.payload,
      };
    case actionType.SET_APP_TITLE:
      return {
        ...state,
        appTitle: action.payload,
      };
    case actionType.SET_APP_LOGO:
      return {
        ...state,
        logo: action.payload,
      };
    //always return state
    //to continue 'event' chain
    default:
      return state;
  }
};

export const personsReducer = (state = [], action) => {
  //log action comming into reducer
  // logGroup({
  //   title:"personsReducer",
  //   state: state,
  //   action: action
  // });
  switch (action.type) {
    case actionType.ADD_PERSON:
      //use concat with arrays
      //to return new object (immutable)
      return state.concat({
        ...action.payload,
        id: Math.random() * 1000000,
      });

    case actionType.DELETE_PERSON:
      //use filter to return new object (immutable)
      return state.filter(item => item.id != action.payload);
    //always return state
    //to continue 'event' chain
    default:
      return state;
  }
};

export const apiDataReducer = (state = {}, action) => {
  /*logGroup({
    title:'apiDataReducer',
    action: action,
    state: state
  });*/
  switch (action.type) {
    case actionType.API_DATA_GET:
      //debugger
      //do nothing
      return state;
    case actionType.API_DATA_OK:
      return {
        ...state,
        ...action.payload,
      };
    case actionType.API_DATA_ERR:
      //debugger
      return {
        ...state,
        ...action.payload,
      };
    //always return state
    //to continue 'event' chain
    default:
      return state;
  }
};

/**
 * Language reducer containing lang info and translations
 * @param {object} state previous state object
 * @param {object} action redux action with type and payload
 * @param {string} action.type redux action type, string constant
 * @param {object} action.payload redux action type, string constant
 */
export const languageReducer = (state = cfg.i18n, action) => {
  /*logGroup({
    title:'filterReducer',
    action: action,
    state: state
  });*/
  //debugger
  switch (action.type) {
    case actionType.SET_LANG_OK:
    case actionType.SET_LANG_ERR:
      //debugger
      return {
        ...state,
        lang: {
          ...action.payload,
        },
      };
    case actionType.SET_LANG_LIST:
      //debugger
      return {
        ...state,
        options: [...action.payload],
      };
    //always return state
    //to continue 'event' chain
    default:
      return state;
  }
};

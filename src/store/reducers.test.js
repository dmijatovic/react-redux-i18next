import * as actionType from './actions';
import { Config } from './app.cfg';
import {
  loaderReducer,
  headerReducer,
  personsReducer,
} from './reducers';

describe('Redux-loaderReducer', () => {
  it('should ALWAYS return state', () => {
    let state = Config.loader,
      action = {
        //use actionType not covered by this function
        type: actionType.SET_APP_TITLE,
      },
      result = loaderReducer(state, action);
    expect(result).toEqual(state);
  });
});

describe('Redux-headerReducer', () => {
  it('should ALWAYS return state', () => {
    let state = Config.header,
      action = {
        //use actionType not covered by this function
        type: actionType.SHOW_LOADER,
      };
    expect(headerReducer(undefined, action)).toEqual(state);
  });
});

describe('Redux-personReducer', () => {
  it('should ALWAYS return state', () => {
    let state = Config.header,
      action = {
        //use actionType not covered by this function
        type: actionType.SHOW_LOADER,
      },
      resp = personsReducer(undefined, action);

    expect(resp).toEqual([]);
  });

  it('should add person to aray', () => {
    let action = {
        type: actionType.ADD_PERSON,
        payload: {
          name: 'Any name',
          age: 100,
        },
      },
      resp = personsReducer([], action);
    expect(resp.length).toBe(1);
  });

  it('should create person id', () => {
    let action = {
        type: actionType.ADD_PERSON,
        payload: {
          name: 'Any name',
          age: 100,
        },
      },
      resp = personsReducer([], action);
    expect(resp[0]).toHaveProperty('id');
  });
});

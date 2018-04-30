// @flow
import types from './types';
import { combineReducers } from 'redux';
import type { Reducer } from 'redux';
import type { State, Action, CIF } from './definitions';
import { get, set, assign } from 'lodash';


const all: Reducer<any, Action> = (
  state = {data: []},
  action
) => {
  switch (action.type) {
    case types.LIST_CIFS_SUCCESS:
      return assign({}, state, get(action, 'result.data'))
    default: return state;
  }
};

const current: Reducer<any, Action> = (
  state = {
  	status: null,
  	producer: null,
  	ownership: null,
  	standardBody: null,
  	creationDate: null,
  	trancheSize: null
  },
  action
) => {
  switch (action.type) {
    case types.LOAD_CIF_DETAIL_SUCCESS:
      return assign({}, state, get(action, 'result.data'));
    default: return state;
  }
}

export const reducer: Reducer<State, Action> = combineReducers({ all, current })

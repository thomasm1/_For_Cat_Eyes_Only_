// @flow
import types from './types';
import { combineReducers } from 'redux';
import type { Reducer } from 'redux';
import type { State, Action, Submission } from './definitions';
import { get, set, assign } from 'lodash';

const all: Reducer<any, Action> = (
  state = {isFetching: false, data: []},
  action
) => {
  switch (action.type) {
    case types.LIST_SUBMISSIONS:
      return assign({}, state, {isFetching: true});
    case types.LIST_SUBMISSIONS_SUCCESS:
      return assign({}, state, get(action, 'result.data'), {isFetching: false})
    default: return state;
  }
};

const current: Reducer<any, Action> = (
  state = {
    isFetching: false,
    data: {
      status: null,
      cifId: null,
      trancheSize: null,
      productionDate: null,
      standard: null,
      fileName: null
    }
  },
  action
) => {
  switch (action.type) {
    case types.LOAD_SUBMISSION_DETAIL:
      return assign({}, state, {isFetching: true});
    case types.LOAD_SUBMISSION_DETAIL_SUCCESS:
      return assign({}, state, {isFetching: false, data: get(action, 'result.data')});
    default: return state;
  }
}

export const reducer: Reducer<State, Action> = combineReducers({ all, current })

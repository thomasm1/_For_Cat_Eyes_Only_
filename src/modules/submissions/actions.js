// @flow
import types from './types';
import type { ActionCreator } from 'redux';
import type { Submission } from './definitions';

export const loadSubmissionDetail: ActionCreator<any> = (id) => ({
  type: types.LOAD_SUBMISSION_DETAIL,
  responseTypes: [types.LOAD_SUBMISSION_DETAIL_SUCCESS, types.LOAD_SUBMISSION_DETAIL_FAILURE],
  promise: (client) => client.get(`/submissions/${id}`)
});

export const setCurrentSubmission: ActionCreator<any> = (id) => ({
  type: types.SET_CURRENT_SUBMISSION,
  payload: id
});

export const listSubmissions: ActionCreator<any> = () => ({
  type: types.LIST_SUBMISSIONS,
  responseTypes: [types.LIST_SUBMISSIONS_SUCCESS, types.LIST_SUBMISSIONS_FAILURE],
  promise: (client) => client.get('/submissions')
});

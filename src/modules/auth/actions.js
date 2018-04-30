// @flow
import types from './types';
import localStorage from 'localStorage';
import { merge } from 'lodash';

import { browserHistory } from 'react-router';

import type { Identity, CreateUserPayload } from './definitions';

function handleIdentity (identity) {
  return new Promise((resolve) => {
    localStorage.setItem('GEM-IDENTITY', JSON.stringify(identity.data));
    resolve(identity);
  })
}

export const login = (email: string, password: string) => ({
  type: types.LOGIN,
  responseTypes: [types.LOGIN_SUCCESS, types.LOGIN_FAILURE],
  promise: (client: any) => client.post('/auth/sign_in', { email, password }),
  postRequest: (response: any, client: any) => client.get('/me').then(handleIdentity)
});

export const signup = (data: CreateUserPayload) => ({
  type: types.LOGIN,
  responseTypes: [types.LOGIN_SUCCESS, types.LOGIN_FAILURE],
  promise: (client: any) => client.post('/auth', data),
  postRequest: (response: Identity, client: any) => client.get('/me').then(handleIdentity)
});

export const logout = () => {
  localStorage.removeItem('GEM-IDENTITY');
  localStorage.removeItem('GEM-AUTH');
  location.reload();

  return {
    type: types.LOGOUT,
  };
};


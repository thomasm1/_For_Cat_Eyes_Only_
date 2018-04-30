// @flow
import type { Middleware } from 'redux';
import localStorage from 'localStorage';

import { assign, debounce } from 'lodash';

import { logout } from 'modules/auth/actions';

export function clientMiddleware (client: any): Middleware {
  return ({ dispatch, getState }) =>
    (next) => (action) => {
      if (typeof action === 'function') {
        return action(dispatch, getState);
      }

      const {
        postRequest,
        promise,
        responseTypes,
        type,
        ...rest
      } = action; // eslint-disable-line no-redeclare
      if (!promise) {
        return next(action);
      }

      assign(client.defaults.headers.common, JSON.parse(localStorage.getItem('GEM-AUTH')));

      const [SUCCESS, FAILURE] = responseTypes;

      next({
        ...rest,
        type
      });

      const actionPromise = promise(client);
      actionPromise.then(
        (result: any): any => {
          /* The headers change on every request, so this is necessary */
          const headers = {
            // 'access-token': result.headers['access-token'] || client.defaults.headers.common['access-token'],
            // 'client': result.headers['client'] || client.defaults.headers.common['client'],
            // 'expiry': result.headers['expiry'] || client.defaults.headers.common['expiry'],
            // 'token-type': result.headers['token-type'] || client.defaults.headers.common['token-type'],
            // 'uid': result.headers['uid'] || client.defaults.headers.common['uid']
          };
          // console.log('Request URL:', result.request.responseURL);
          // console.log('Old Headers ->', client.defaults.headers.common['access-token']);
          // console.log('Updated headers --> ', headers['access-token']);
          assign(client.defaults.headers.common, headers);
          localStorage.setItem('GEM-AUTH', JSON.stringify(client.defaults.headers.common));
          next({
            ...rest,
            type: SUCCESS,
            result
          });
          postRequest && postRequest(result, client);
        },
        (error: any): any => {
          if (error.response.status === 401) {
            next(logout());
            location.reload();
          } else {
            next({
              ...rest,
              type: FAILURE,
              error
            });
          }
        }
      ).catch((error: any) => {
        console.error('MIDDLEWARE ERROR:', error);
        next({
          ...rest,
          type: FAILURE,
          error
        });
      });

      return actionPromise;
    }
}

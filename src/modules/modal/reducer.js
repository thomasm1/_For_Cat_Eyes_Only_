// @flow
import types from './types';
import type { Modal } from './definitions';

export const reducer: Modal = (
  state = {
    type: 'retire'
  },
  action
) => {
  switch (action.type) {
    case types.SET_MODAL_TYPE:
      return {
        ...state,
        type: action.modalType
      };
    default:
      return state;
  }
};

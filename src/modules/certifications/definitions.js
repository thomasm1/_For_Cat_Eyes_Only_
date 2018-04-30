// @flow
import types from './types';

export type Certification = {
  id: string,
  status: string,
  inspector: string,
  DOI: string,
  DOE: string,
  nextStep: string,
  certification: number,
  action: string
}

export type State = {
  busy: boolean,
  all: { [id: string]: Certification }
};

export type Action = {
  type: $Keys<typeof types>,
  payload?: any,
  id?: string,
  result?: any,
  error?: any
};

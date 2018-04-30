// @flow
import types from './types';

export type Submission = {
  id: string,
  basin: string,
  field: string,
  status: string,
  cifId: string,
  lat: string,
  lng: string,
  trancheSize: string|number,
  productionDate: string,
  standard: string,
  fileName: string
};

export type State = {
  busy: boolean,
  all: { [id: string]: Submission }
};

export type Action = {
  type: $Keys<typeof types>,
  payload?: any,
  id?: string,
  result?: any,
  error?: any
};

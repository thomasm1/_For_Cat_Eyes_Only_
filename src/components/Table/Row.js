// @flow
import React from 'react';

export type RowProps = {
  colSpan: number,
  onClick: ?any,
  children?: any
};
export const Row = ({ colSpan = 0 }: RowProps) => null;
Row.$type = 'Row';

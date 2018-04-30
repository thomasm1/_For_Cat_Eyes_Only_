// @flow
import React from 'react';
import styles from './styles.less';

export type ColumnProps = {
  colSpan: number,
  onClick: ?any
};
export const Column = ({ colSpan = 1 }: ColumnProps) => null;
Column.$type = 'Column';


// @flow
import React from 'react';

import { isArray } from 'lodash';

import styles from './styles.less';

export type PaperProps = {
  zDepth?: number,
  children?: React$Element<*>,
  className?: string | Array<string>,
  style?: *
};

function _toArray<T> (tOrArray: any): Array<T> {
  if (!tOrArray) return [];
  if (!isArray(tOrArray)) {
    return [tOrArray];
  } else {
    return tOrArray
  };
}
export const Paper = ({ zDepth = 1, children, className, style, ...rest }: PaperProps) => (
  <div className={[`z-depth-${zDepth}`, ...(_toArray(className): Array<string>), styles.Paper].join(' ')} style={style}>
    {children}
  </div>
);

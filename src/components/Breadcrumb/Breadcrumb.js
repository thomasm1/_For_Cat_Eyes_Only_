import React from 'react';

import type { Location } from 'react-router';
import { Link } from 'react-router';

import { startCase } from 'lodash';

import styles from './styles.less';

export type BreadcrumbProps = {
  location: Location
};
export const Breadcrumb = ({ location }: BreadcrumbProps) => {
  const _location = location.pathname.replace(/\/$/,'').split('/').splice(1);
  return (
    <div className={styles.Breadcrumb}>
      { _location.map(
        (crumb, i) =>
          <Link key={`breadcrumb-${i}`} to={`/${_location.slice(0, i + 1).join('/')}`} className="breadcrumb">
            {i > 0 && ' / '}{ crumb }
          </Link>) }
    </div>
  );
}

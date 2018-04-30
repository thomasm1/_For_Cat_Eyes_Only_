// @flow
import React from 'react';

import type { Store } from 'redux';

import type { browserHistory as BrowserHistory, RouteConfig, Location, LocationRouter } from 'react-router';
import { browserHistory, Link, withRouter } from 'react-router';

import { reduce, get } from 'lodash';

import styles from './styles.less';

export type PageHeaderProps = {
  withBackBtn?: boolean,
  location: Location,
  router: LocationRouter,
  route: RouteConfig,
  actions: any,
  customTitle: any,
  children?: React$Element<*>
};

function isActive (route, location, router) {
  const path = get(route, 'absolutePath', '');
  const regex = new RegExp(path.replace(/(\:[a-zA-Z0-9]+\/?)/g, '(.*)'), 'g');
  if (router.isActive(path) || location.pathname.match(regex)) {
    return route;
  }
}

function getActiveChildRoute (route, location, router): ?RouteConfig {

  return reduce(route.childRoutes || [],
    (ar: ?RouteConfig, tr: RouteConfig) => {
      return ar || (isActive(tr, location, router))
    },
    null);
}

function title (r: ?RouteConfig) {
  let title;
  if (!r) {
    return null;
  }
  if (r.title) {
    title = r.title;
  } else if (r.pathName) {
    title = r.pathName;
  } else {
    title = r.path;
  }
  if (typeof title === 'function') {
    return title();
  } else {
    return title;
  }
}

export const PageHeader = withRouter(({
  withBackBtn,
  route,
  router,
  location,
  actions,
  customTitle,
  children
}: PageHeaderProps): React$Element<*> => {
  return <div className={styles.PageHeader}>
    <ul>
      <li>{withBackBtn && <a onClick={browserHistory.goBack}><i className='material-icons'>keyboard_backspace</i></a>}
        <a>{customTitle ? customTitle : title(getActiveChildRoute(route, location, router))}</a>
      </li>
      <div>{actions}</div>
    </ul>
  </div>;
});

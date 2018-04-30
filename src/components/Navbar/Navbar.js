import React from 'react';
import type { RouteConfig, Location, LocationRouter } from 'react-router';
import { Link } from 'react-router';

import { startCase } from 'lodash';

import styles from './styles.less';

export type NavbarProps = {
  route: RouteConfig,
  router: LocationRouter,
  location: Location,
  state: *
};

function pathName (r: RouteConfig, state: *) {
  if (typeof r.pathName === 'function') {
    return r.pathName(state);
  } else {
    return (r.pathName || startCase(r.path) || '');
  }
}

export class Navbar extends React.Component {
  props: NavbarProps;
  render () {
    const { route, location, router, state } = this.props;
    return (
      <ul className={`${styles.Navbar}`}>
        {route.childRoutes ? route.childRoutes.map(
          (r: RouteConfig, i: number) =>
            (!r.hiddenFromNavbar && r.component)
              ? <li className={router.isActive(r.absolutePath) ? 'active' : ''} key={r.path || `${route.path}-${i}`}>
                  { !r.disabled ? <Link to={r.absolutePath}>{pathName(r, state)}</Link> : <a className={'disabled'}>{pathName(r, state)} <small>{'(Locked)'}</small></a> }
                  { r.childRoutes && router.isActive(r.path)
                    ? <ul className='subnav'>
                        {r.childRoutes.map((sr, j) => (
                          !sr.hiddenFromNavbar && sr.component
                            ? <li className={router.isActive(sr.absolutePath) ? 'active' : 'inactive'} key={`${route.path}-${r.path}-${j}`}>
                                <Link to={sr.absolutePath}>{pathName(sr, state)}</Link>
                              </li>
                            : null
                        ))}
                      </ul>
                    : ''}
                </li>
              : null
          ) : null}
      </ul>
    );
  }
}

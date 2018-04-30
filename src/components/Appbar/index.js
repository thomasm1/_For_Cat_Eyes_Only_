// @flow
import React from 'react';
import type { RouteConfig, Location } from 'react-router';
import { Link } from 'react-router';
import type { Identity } from 'modules/auth/definitions';
import styles from './styles.less';

import $ from 'jquery';
type path = {
  path: string,
  pathname: string
}
export type AppbarProps = {
  location: Location,
  user: Identity,
  route: ?RouteConfig,
  logout: ?(() => any),
  paths: Array<path>,
  a: number,
  logo: { src: string, text?: string }
};
class Appbar extends React.Component<*, AppbarProps, *> {
  componentDidMount() {
    $('.dropdown-button').dropdown({
      inDuration: 300,
      outDuration: 225,
      constrain_width: false, // Does not change width of dropdown to that of the activator
      hover: true, // Activate on hover
      gutter: 0, // Spacing from edge
      belowOrigin: true, // Displays dropdown below the button
      alignment: 'left' // Displays dropdown with edge aligned to the left of button
    });
  }
  shouldComponentUpdate(nextProps: AppbarProps) {
    return true;
  }
  render () {
    const { location, paths } = this.props;
    const tabs = paths.map((path, i) => {
      let tabClass = location.pathname.split('/').slice(0,3).join('/') === path.path ? 'hover tab' : 'tab';
      return <li key={i} className={tabClass}><Link to={path.path}>{path.pathname}</Link></li>
    })
    return (
      <nav className={styles.Appbar}>
        <div className="nav-wrapper">
            <Link to ={this.props.paths[0].path} className="brand-logo left" ><img src={this.props.logo.src}/>{this.props.logo.text}</Link>
            <ul className="left">
              { tabs }
            </ul>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><img className='search' src={require('./assets/search.png')}/></li>
            <li className='avatar-wrapper'>
              <div className='notification' ><span className='number'>3</span></div>
              <img src={require('./assets/micah.png')} className='avatar dropdown-button' data-activates='dropdown1' />
              <ul id='dropdown1' className='dropdown-content'>
                <li><a onClick={this.props.logout}>Logout</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Appbar;

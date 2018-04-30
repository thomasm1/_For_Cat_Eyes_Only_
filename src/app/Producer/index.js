import React from 'react';
import { connect } from 'react-redux';
import { withRouter, browserHistory } from 'react-router';

import { logout } from 'modules/auth/actions';

import Appbar from 'components/Appbar/index';

class Producer extends React.Component {
  componentWillMount() {
    !(this.props.user) && browserHistory.push('/producer/login');
  }

  shouldComponentUpdate(nextProps: AppProps) {
    if (!nextProps.user) {
      browserHistory.push('/producer/login');
      return false;
    }
    return true;
  }

  render() {
    const { user, logout, location, children } = this.props;
    const paths = [
      {path:'/producer', pathname: 'Home'},
      {path:'/producer/production', pathname: 'Production'},
      {path:'/producer/account', pathname: 'Account'},
      {path:'/producer/certifications', pathname: 'Certifications'}
    ];

    return (
      <div>
        <Appbar logo={{src: require('./assets/gasco.png'), text: 'GasCo'}} {...{paths, user, logout, location}}/>
        <div className={'appbar-offset'}>
          {children}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.auth.identity
  }
}

export default connect(mapStateToProps, { logout })(withRouter(Producer));
export { routes } from './routes';

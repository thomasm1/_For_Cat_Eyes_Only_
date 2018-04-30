// @flow
import React, { Children } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

type ProductionProps = {
  children: React$Element<*> | Array<React$Element<*>>,
};

export class Production extends React.Component {
  props: ProductionProps;

  render () {
    const { children } = this.props;
    return (
      <div className='content-container'>
        {children}
      </div>
    );
  }
}

export default connect(undefined, {})(withRouter(Production));

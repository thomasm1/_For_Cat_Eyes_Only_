// @flow
import React, { Children } from 'react';

import { connect } from 'react-redux';
import type { ActionCreator } from 'redux';
import { startCase, random, times } from 'lodash';
import styles from './styles.less';
import type { RouteConfig, Location, LocationRouter } from 'react-router';
import Pagination from 'components/Pagination';
import { Table, Column } from 'components/Table';
import { statusColor } from 'utils/formatter';
import { withRouter } from 'react-router';

export type BuyerProps = {
  children: React$Element<*> | Array<React$Element<*>>,
  router: LocationRouter,
  location: Location
};

type BuyerItems = {
  logo: string,
  buyerName: string,
  lastTransaction: string,
  phoneNumber: string,
  POC: string,
  action: string
}

export class Buyers extends React.Component {
  props: BuyerProps;

  state: {
    showBackBtn: boolean;
    action: any;
  };

  constructor(props: BuyerProps) {
    super(props);
    this.state = {
      showBackBtn: false,
      action: '',
      searchFilter: ''
    };
  }

  static childContextTypes = {
    setBackBtnVisibility: React.PropTypes.func,
    setPageAction: React.PropTypes.func
  };

  getChildContext () {
    return {
      setBackBtnVisibility: (showBackBtn: boolean) => this.setState({ showBackBtn }),
      setPageAction: (action: any) => this.setState({ action })
    };
  }

  render () {
    const { router, location } = this.props;
    const { showBackBtn, action } = this.state;

    const buyerData = [
      { logo: 'duke', buyerName: 'Duke Energy', lastTransaction: `${random(1,12)}/${random(10,20)}/2015`, phoneNumber: `(${random(200,999)}) ${random(200,999)}-${random(3000,9999)}`, POC: 'John Doe', actions: '' },
      { logo: 'engie', buyerName: 'Engie', lastTransaction: `${random(1,12)}/${random(10,20)}/2015`, phoneNumber: `(${random(200,999)}) ${random(200,999)}-${random(3000,9999)}`, POC: 'John Doe', actions: '' },
      { logo: 'nrg', buyerName: 'NRG', lastTransaction: `${random(1,12)}/${random(10,20)}/2015`, phoneNumber: `(${random(200,999)}) ${random(200,999)}-${random(3000,9999)}`, POC: 'John Doe', actions: '' },
      { logo: 'nextera', buyerName: 'Nextera Energy', lastTransaction: `${random(1,12)}/${random(10,20)}/2015`, phoneNumber: `(${random(200,999)}) ${random(200,999)}-${random(3000,9999)}`, POC: 'John Doe', actions: '' },
      { logo: 'southern-company', buyerName: 'Southern Company', lastTransaction: `${random(1,12)}/${random(10,20)}/2015`, phoneNumber: `(${random(200,999)}) ${random(200,999)}-${random(3000,9999)}`, POC: 'John Doe', actions: '' },
      { logo: 'dominion', buyerName: 'Dominion Resources', lastTransaction: `${random(1,12)}/${random(10,20)}/2015`, phoneNumber: `(${random(200,999)}) ${random(200,999)}-${random(3000,9999)}`, POC: 'John Doe', actions: '' },
      { logo: 'sempra', buyerName: 'Sempra Energy', lastTransaction: `${random(1,12)}/${random(10,20)}/2015`, phoneNumber: `(${random(200,999)}) ${random(200,999)}-${random(3000,9999)}`, POC: 'John Doe', actions: '' },
      { logo: 'exelon', buyerName: 'Exelon Energy', lastTransaction: `${random(1,12)}/${random(10,20)}/2015`, phoneNumber: `(${random(200,999)}) ${random(200,999)}-${random(3000,9999)}`, POC: 'John Doe', actions: '' },
      { logo: 'edison', buyerName: 'Edison International', lastTransaction: `${random(1,12)}/${random(10,20)}/2015`, phoneNumber: `(${random(200,999)}) ${random(200,999)}-${random(3000,9999)}`, POC: 'John Doe', actions: '' },
      { logo: 'xcel', buyerName: 'Xcel Energy', lastTransaction: `${random(1,12)}/${random(10,20)}/2015`, phoneNumber: `(${random(200,999)}) ${random(200,999)}-${random(3000,9999)}`, POC: 'John Doe', actions: '' }
    ];

    return (
       <div className={styles.Production}>
          <div className='content-container'>
            <h3 className={'producer-header'}>{'Buyers'}</h3>
            <div className={'row'}>
              <Table data={ buyerData }>
                <Column
                  colSpan={1}
                  name={' '}
                  render={(c: BuyerItems) => {
                    return c.logo
                    // $FlowFixMe
                    ? <span><img style={{height: 50, verticalAlign: 'middle'}} src={require(`../../../../assets/${c.logo}.png`)}/></span>
                    : <span/>
                  }}
                  onClick={(c: BuyerItems) => router.push(`/xpansiv/buyers/detail`)}
                />
                <Column
                  colSpan={2}
                  name={'Producer Name'}
                  render={(c: BuyerItems) => c.buyerName}
                  onClick={(c: BuyerItems) => router.push(`/xpansiv/buyers/detail`)}
                />
                <Column
                  colSpan={2}
                  name={'Last Transaction'}
                  render={(c: BuyerItems) => c.lastTransaction}
                  onClick={(c: BuyerItems) => router.push(`/xpansiv/buyers/detail`)}
                />
                <Column
                  colSpan={2}
                  name={'Phone Number'}
                  render={(c: BuyerItems) => c.phoneNumber}
                  onClick={(c: BuyerItems) => router.push(`/xpansiv/buyers/detail`)}
                />
                <Column
                  colSpan={2}
                  name={'Point of Contact'}
                  render={(c: BuyerItems) => c.POC}
                  onClick={(c: BuyerItems) => router.push(`/xpansiv/buyers/detail`)}
                />
                <Column
                  name={'Actions'}
                  render={(c: BuyerItems) => <i className="fa fa-ellipsis-h"></i>}
                  onClick={(c: BuyerItems) => router.push(`/xpansiv/buyers/detail`)}
                />
              </Table>
              <Pagination />
            </div>
          </div>
        </div>
    );
  }
}

export default connect()(withRouter(Buyers));

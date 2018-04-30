// @flow
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import ProductionBarGraph from 'components/Charts/Production';
import type { Location, LocationRouter, RouteConfig } from 'react-router';
import { Breadcrumb } from 'components/Breadcrumb';
import { Datagrid } from 'components/Datagrid';
import { PageHeader } from 'components/PageHeader';
import { Pagination } from 'components/Pagination';
import { Paper } from 'components/Paper';
import { Stepper } from 'components/Stepper';
import { Table, Column } from 'components/Table';
import AcquisitionTrend from 'components/Charts/AcquisitionTrend';
import { Tabs } from 'components/Tabs';
import { startCase, times, get, map, random } from 'lodash';
import { statusColor } from 'utils/formatter';
import $ from 'jquery';

import styles from './styles.less';
export type BuyerDetailProps = {
  CIF: CIF,
  provider: any,
  route: RouteConfig,
  router: LocationRouter,
  location: Location,
  params: {
    id: string
  }
};

type CIF = {
  id: string,
  status: string,
  trancheSize: number|string,
  producer: string,
  creationDate: string,
  standard: string,
  owner: string,
  action: string|React$Element<*>
}

type Transaction = {
  status: string,
  id: string,
  producer: string,
  standard: string,
  owner: string,
  buyer: string,
  reconciliation: string,
  action: string|React$Element<*>
}

export class BuyerDetail extends React.Component {
  props: BuyerDetailProps;

  state: {
    showBackBtn: boolean;
    action: any;
  };

  state = {
    showBackBtn: true,
    action: ''
  };

  static childContextTypes = {
    setBackBtnVisibility: React.PropTypes.func,
    setPageAction: React.PropTypes.func
  };

  componentDidMount() {
    $('ul.tabs').tabs();
  }

  getChildContext () {
    return {
      setBackBtnVisibility: (showBackBtn: boolean) => this.setState({ showBackBtn }),
      setPageAction: (action: any) => this.setState({ action })
    };
  }

  render () {
    const { route, location, params, router  } = this.props;
    const { showBackBtn, action } = this.state;

    const buyerSummary = [
      { title: 'Well Pad ID', value: 'Big Cat FED 2126-4899' },
      { title: 'Basin', value: 'Powder River' },
      { title: 'Field', value: 'Big Cat' },

    ];

    const cifOwnership = times(10, () => {
      return {
        id: 'detail',
        status: 'Active',
        trancheSize: random(9000, 90000),
        producer: 'Carbon Creek',
        creationDate: `4/${random(10,20)}/2016`,
        standard: 'American Carbon Registry',
        owner: 'Carbon Creek',
        action: ''
      }
    });

    const transactions = times(5, () => {
      return {
        status: 'Active',
        id: random(1000000, 1999999).toString(),
        producer: 'Carbon Creek',
        standard: 'American Carbon Registry',
        owner: 'Carbon Creek',
        buyer: random(400000, 500000).toString(),
        reconciliation: 'ACH',
        action: ''
      }
    });

    return (<div>
      <Breadcrumb location={location}/>
      <PageHeader
        location={location}
        route={route}
        withBackBtn={showBackBtn}
        customTitle={params.id}
      />
      <div className='content-container'>
        <h5>{'Buyer Summary'}</h5>
        <div className={'row'}>
          <Datagrid data={ buyerSummary }/>
        </div>

        <h5>{'Acquisition Trend'}</h5>
        <div className={'row'}>
          <AcquisitionTrend />
        </div>

        <h5>{'CIF Ownership'}</h5>
        <div className={'row'}>
          <Table data={cifOwnership}>
            <Column
              name={'Status'}
              render={(c: CIF) => <span style={{ color: statusColor(c.status), fontWeight: 500 }}>{startCase(c.status)}</span>}
              onClick={(c: CIF) => router.push(`/xpansiv/cifs/detail`)}/>

            <Column
              name={'Tranche Size'}
              render={(c: CIF) => c.trancheSize}
              onClick={(c: CIF) => router.push(`/xpansiv/cifs/detail`)}/>

            <Column
              name={'Producer'}
              render={(c: CIF) => c.producer}
              onClick={(c: CIF) => router.push(`/xpansiv/cifs/detail`)}/>

            <Column
              name={'Creation Date'}
              render={(c: CIF) => c.creationDate}
              onClick={(c: CIF) => router.push(`/xpansiv/cifs/detail`)}/>

            <Column
              colSpan ={2}
              name={'Standard'}
              render={(c: CIF) => c.standard}
              onClick={(c: CIF) => router.push(`/xpansiv/cifs/detail`)}/>

            <Column
              colSpan={2}
              name={'Owner'}
              render={(c: CIF) => c.owner}
              onClick={(c: CIF) => router.push(`/xpansiv/cifs/detail`)}/>

            <Column
              name={'Actions'}
              colSpan={1}
              render={ (c: CIF) => <i className="fa fa-ellipsis-h"></i> }
              onClick={(c: CIF) => router.push(`/xpansiv/cifs/detail`)}/>
          </Table>
        </div>

        <h5>{'Transactions'}</h5>
        <div className={'row'}>
          <Table data={transactions}>
            <Column
              name={'Status'}
              render={(c: Transaction) => <span style={{ color: statusColor(c.status), fontWeight: 500 }}>{startCase(c.status)}</span>}
              onClick={(c: Transaction) => router.push(`/cifs/${c.id}`)}/>

            <Column
              name={'CIF ID'}
              render={(c: Transaction) => c.id}
              onClick={(c: Transaction) => router.push(`/cifs/${c.id}`)}/>

            <Column
              name={'Producer'}
              render={(c: Transaction) => c.producer}
              onClick={(c: Transaction) => router.push(`/cifs/${c.id}`)}/>

            <Column
              colSpan={2}
              name={'Standard'}
              render={(c: Transaction) => c.standard}
              onClick={(c: Transaction) => router.push(`/cifs/${c.id}`)}/>

            <Column
              name={'Primary Buyer'}
              render={(c: Transaction) => c.buyer}
              onClick={(c: Transaction) => router.push(`/cifs/${c.id}`)}/>

            <Column
              name={'Reconciliation'}
              render={(c: Transaction) => c.reconciliation}
              onClick={(c: Transaction) => router.push(`/cifs/${c.id}`)}/>

            <Column
              name={'Actions'}
              colSpan={1}
              render={ (c: Transaction) => <i className="fa fa-ellipsis-h"></i> }
              onClick={(c: Transaction) => router.push(`/cifs/${c.id}`)}/>
          </Table>
        </div>
      </div>
    </div>);
  }
}

export default connect(undefined, {})(withRouter(BuyerDetail));

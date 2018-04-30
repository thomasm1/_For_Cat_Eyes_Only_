// @flow
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import type { Location, LocationRouter, RouteConfig } from 'react-router';
import { Breadcrumb } from 'components/Breadcrumb';
import { Datagrid } from 'components/Datagrid';
import { PageHeader } from 'components/PageHeader';
import SearchInput from 'components/SearchInput';
import { Paper } from 'components/Paper';
import { times, random, startCase, sample } from 'lodash';
import { Table, Column } from 'components/Table';
import { statusColor } from 'utils/formatter';
import styles from './styles.less';

export type TransactionDetailProps = {
  route: RouteConfig,
  router: LocationRouter,
  location: Location,
  params: { id: string }
};

type CIF = {
  status: string,
  producer: string,
  ownership: string,
  standardBody: string,
  creationDate: string,
  trancheSize: string,
  actions: string
}

export class TransactionDetail extends React.Component {
  props: TransactionDetailProps;
  onSearchChange: () => void;

  state: {
    showBackBtn: boolean;
  };

  constructor(props: TransactionDetailProps) {
    super(props);
    this.state = {
      showBackBtn: true
    };
  }

  static childContextTypes = {
    setBackBtnVisibility: React.PropTypes.func,
    setPageAction: React.PropTypes.func
  };

  getChildContext () {
    return {
      setBackBtnVisibility: (showBackBtn: boolean) => this.setState({ showBackBtn }),
    };
  }

  render () {
    const { router, route, location, params } = this.props;
    const { showBackBtn } = this.state;

    const transactionSummary = [
     { title: 'Transaction ID', value: '1234567'},
     { title: 'Ownership', value: 'Energy'},
     { title: 'Transfer Party', value: 'Gas Co.'},
     { title: 'Tranche Size', value: '12,456'},
     { title: 'Producer', value: 'Gas Co.'},
     { title: 'Date', value: '10/31/2016'}
    ]

    const producerSummary = [
      { title: 'Producer Name', value: 'Gas Co.' },
      { title: 'Joe Doe', value: '(555) 555-5555' },
      { title: '', value: <img className="registry-logo" src={require('./assets/gasco.png')}/> }
    ];

    const buyerSummary = [
      { title: 'Buyer Name', value: 'Energy' },
      { title: 'Joe Doe', value: '(555) 555-5555' },
      { title: '', value: <img className="registry-logo" style={{height: 28}}src={require('./assets/energy.png')}/> }
    ];

    return (
      <div className={styles.TransactionDetail}>
        <Breadcrumb location={location}/>
        <PageHeader
          location={location}
          route={route}
          withBackBtn={showBackBtn}
          customTitle={params.id}
        />
        <div className='content-container'>

          <h5>{'Transaction Summary'}</h5>
          <div className={'row'}>
            <Datagrid data={ transactionSummary } />
          </div>

          <h5>{'Producer Summary'}</h5>
          <div className={'row'}>
            <Datagrid data={ producerSummary }/>
          </div>

          <h5>{'Buyer Summary'}</h5>
          <div className={'row'}>
            <Datagrid data={ buyerSummary }/>
          </div>

          <h5>{'CIFs in Transaction'}</h5>
          <div className={'row'}>
            <Table data={times(10, () => {
              return {
                status: 'Active',
                producer: 'Gas Co.',
                ownership: 'Gas Co.',
                standardBody: 'American Carbon Registry',
                creationDate: '4/11/2016',
                trancheSize: '15,486',
                actions: ''
              };
            })}>
              <Column
                name={'Status'}
                render={(c: CIF) => <span style={{ color: statusColor(c.status) }}>{startCase(c.status)}</span>}
                onClick={(c: CIF) => router.push('/buyer/cifs/detail') }
              />
              <Column
                name={'Producer'}
                render={(c: CIF) => c.producer}
                onClick={(c: CIF) => router.push('/buyer/cifs/detail') }
              />
              <Column
                name={'Ownership'}
                render={(c: CIF) => c.ownership}
                onClick={(c: CIF) => router.push('/buyer/cifs/detail') }
              />
              <Column
                colSpan={2}
                name={'Standard Body'}
                render={(c: CIF) => c.standardBody}
                onClick={(c: CIF) => router.push('/buyer/cifs/detail') }
              />
              <Column
                name={'Creation Date'}
                render={(c: CIF) => c.creationDate}
                onClick={(c: CIF) => router.push('/buyer/cifs/detail') }
              />
              <Column
                name={'Tranche Size'}
                render={(c: CIF) => c.trancheSize}
                onClick={(c: CIF) => router.push('/buyer/cifs/detail') }
              />
              <Column
                name={'Actions'}
                render={(c: CIF) => <i className="fa fa-ellipsis-h"></i>}
                onClick={(c: CIF) => router.push('/buyer/cifs/detail') }
              />
            </Table>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(undefined, {})(withRouter(TransactionDetail));

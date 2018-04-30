// @flow
import React, { Children } from 'react';

import { connect } from 'react-redux';
import type { ActionCreator } from 'redux';
import Pagination from 'components/Pagination';
import { Paper } from 'components/Paper';
import CIFBuyerTransfers from 'components/Charts/CIFBuyerTransfers';
import CIFvsGasProduction from 'components/Charts/CIFvsGasProduction';
import styles from './styles.less';
import type { Location, LocationRouter } from 'react-router';
import { Table, Column } from 'components/Table';
import { random, times } from 'lodash';
import { startCase } from 'lodash';
import { statusColor } from 'utils/formatter';
import { withRouter } from 'react-router';

type StandardProps = {
  router: LocationRouter,
  location: Location
};

type Transaction = {
  status: string,
  owner: string,
  transferParty: string,
  trancheSize: string,
  date: string,
  transactionId: string,
  action: string
}

export class Transactions extends React.Component {
  props: StandardProps;

  render () {
    const {
      router, location
    } = this.props;

    const tableData = times(10, () => {
      return {
        status: 'complete',
        owner: 'Gas Co.',
        transferParty: 'Energy',
        trancheSize: '432,789',
        date: '11/1/2015',
        transactionId: '9857302',
        action: ''
      }
    });

    return (
      <div className={styles.Transactions}>
        <div className='content-container'>
          <h5 className={'transactions-header'}>{'Transactions'}</h5>
          <div className={'row'}>
            <div className={'col s4'} style={{ paddingTop: 12.5, paddingLeft: 0, paddingRight: 45.5 }}>
              <Paper className={'text-center'}>
                <h2 className={"overview-stats"}>67,121</h2>
                <p>{'CIFs in Escrow'}</p>
              </Paper>
            </div>
            <div className={'col s4'} style={{ paddingTop: 12.5, paddingLeft: 22.75, paddingRight: 22.75 }}>
              <Paper className={'text-center'}>
                <h2 className={"overview-stats"}>123,456</h2>
                <p>{'CIF Purchases | Last '}<span style={{color: '#417505'}}>{'30 days'}</span></p>
              </Paper>
            </div>
            <div className={'col s4'} style={{ paddingTop: 12.5, paddingLeft: 45.5, paddingRight: 0 }}>
              <Paper className={'text-center'}>
                <h2 className={"overview-stats"}>542,643</h2>
                <p>{'Account Balance'}</p>
              </Paper>
            </div>
          </div>

          <div className={'row'}>
            <div className="col s6" style={{ paddingLeft: 0, paddingRight: 12.5 }}>
              <div className={'row'}>
                <Paper style={{ marginTop: -28 }}>
                  <CIFvsGasProduction />
                </Paper>
              </div>
            </div>
            <div className="col s6" style={{ paddingLeft: 12.5, paddingRight: 0 }}>
              <div className={'row'}>
                <Paper style={{ marginTop: -28 }}>
                  <CIFBuyerTransfers />
                </Paper>
              </div>
            </div>
          </div>

          <div className={'row'}>
            <Table data={ tableData }>
              <Column
                colSpan={2}
                name={'Status'}
                render={(c: Transaction) => <span style={{ color: statusColor(c.status), fontWeight: 500 }}>{startCase(c.status)}</span>}
                onClick={(c: Transaction) => router.push(`/buyer/transactions/detail`)}
              />
              <Column
                colSpan={2}
                name={'Owner'}
                render={(c: Transaction) => c.owner}
                onClick={(c: Transaction) => router.push(`/buyer/transactions/detail`)}
              />
              <Column
                colSpan={2}
                name={'Transfer Party'}
                render={(c: Transaction) => c.transferParty}
                onClick={(c: Transaction) => router.push(`/buyer/transactions/detail`)}
              />
              <Column
                colSpan={2}
                name={'Tranche Size'}
                render={(c: Transaction) => c.trancheSize}
                onClick={(c: Transaction) => router.push(`/buyer/transactions/detail`)}
              />
              <Column
                colSpan={2}
                name={'Date'}
                render={(c: Transaction) => c.date}
                onClick={(c: Transaction) => router.push(`/buyer/transactions/detail`)}
              />
              <Column
                colSpan={2}
                name={'Transaction ID'}
                render={(c: Transaction) => c.transactionId}
                onClick={(c: Transaction) => router.push(`/buyer/transactions/detail`)}
              />
              <Column
                name={'Actions'}
                render={(c: Transaction) => <i className="fa fa-ellipsis-h"></i>}
                onClick={(c: Transaction) => router.push(`/buyer/transactions/detail`)}
              />
            </Table>
          </div>
        <Pagination />
        </div>
      </div>
    );
  }
}

export default connect(undefined, {} )(withRouter(Transactions));

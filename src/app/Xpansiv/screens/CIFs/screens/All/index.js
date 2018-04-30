import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import type { Location, LocationRouter, RouteConfig } from 'react-router';
import FinancialSummary from 'components/Charts/FinancialSummary';
import styles from './styles.less';
import { Paper } from 'components/Paper';
import { Table, Column } from 'components/Table';
import { random, values, startCase, times } from 'lodash';
import { statusColor } from 'utils/formatter';

type CIFsProps = {
  router: LocationRouter,
  location: Location
};

type CIF = {
  status: String,
  producer: String,
  owner: String,
  standardBody: String,
  creationDate: String,
  trancheSize: Number
}

export class CIFs extends React.Component {
  props: CIFsProps;

  render () {
    const {
      router, location
    } = this.props;

    return (
      <div className={styles.Production}>
        <div className='content-container'>
          <h5 className={'producer-header'}>{'Financial Summary'}</h5>
          <div className={'row'}>
            <div className={'col s4'} style={{ padding: 12.5, paddingLeft: 0 }}>
              <Paper className={'text-center'}>
                <h2 className={"overview-stats"}>30,000</h2>
                <p>{'Total CIFs Generated'}</p>
              </Paper>
            </div>
            <div className={'col s4'} style={{ padding: 12.5 }}>
              <Paper className={'text-center'}>
                <h2 className={"overview-stats"}>2,500</h2>
                <p>{'Total CIFs Sold'}</p>
              </Paper>
            </div>
            <div className={'col s4'} style={{ padding: 12.5, paddingRight: 0 }}>
              <Paper className={'text-center'}>
                <h2 className={"overview-stats"}>$120,000.00</h2>
                <p>{'Total CIF Revenue'}</p>
              </Paper>
            </div>

          </div>

          <h5>{'CIF Production/Transfers'}</h5>
          <div className={'row'}>
            <Paper>
              <FinancialSummary />
            </Paper>
          </div>

          <h5>{'Recent CIF Issuance'}</h5>
          <div className={'row'}>
            <Table data={times(10, () => {
              return {
                creationDate: '4/11/16',
                owner: 'Carbon Creek',
                producer: 'Carbon Creek',
                standardBody: 'American Carbon Registry',
                status: 'active',
                trancheSize: `${random(10,88)},${random(100,999)}`
              };
            })}>
              <Column
                name={'Status'}
                render={(c: CIF) => <span style={{ color: statusColor(c.status) }}>{startCase(c.status)}</span>}
                onClick={(c: CIF) => router.push(`/xpansiv/cifs/detail`)}
              />
              <Column
                name={'Tranche Size'}
                render={(c: CIF) => c.trancheSize}
                onClick={(c: CIF) => router.push(`/xpansiv/cifs/detail`)}
              />
              <Column
                name={'Producer'}
                render={(c: CIF) => c.producer}
                onClick={(c: CIF) => router.push(`/xpansiv/cifs/detail`)}
              />
              <Column
                name={'Creation Date'}
                render={(c: CIF) => c.creationDate}
                onClick={(c: CIF) => router.push(`/xpansiv/cifs/detail`)}
              />
              <Column
                colSpan={2}
                name={'Standard'}
                render={(c: CIF) => c.standardBody}
                onClick={(c: CIF) => router.push(`/xpansiv/cifs/detail`)}
              />
              <Column
                colSpan={2}
                name={'Owner'}
                render={(c: CIF) => c.owner}
                onClick={(c: CIF) => router.push(`/xpansiv/cifs/detail`)}
              />
              <Column
                name={'Actions'}
                render={(c: CIF) => <i className="fa fa-ellipsis-h"></i>}
                onClick={(c: CIF) => router.push(`/xpansiv/cifs/detail`)}
              />
            </Table>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(undefined, {} )(withRouter(CIFs));

// @flow
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import RetirementTrend from 'components/Charts/RetirementTrend';
import CIFRetirementTypeAndProducer from 'components/Charts/CIFRetirementTypeAndProducer';
import type { Location, LocationRouter, RouteConfig } from 'react-router';
import { Breadcrumb } from 'components/Breadcrumb';
import { Datagrid } from 'components/Datagrid';
import { PageHeader } from 'components/PageHeader';
import { Paper } from 'components/Paper';
import { Table, Column } from 'components/Table';
import { Tabs } from 'components/Tabs';
import { startCase, times, get, map, random, sample } from 'lodash';
import { statusColor } from 'utils/formatter';
import styles from './styles.less';

type RetiredDetailProps = {
  provider: any,
  route: RouteConfig,
  router: LocationRouter,
  location: Location,
  params: {
    id: string
  }
};

type CIF = {
  creationDate: string,
  owner: string,
  producer: string,
  standardBody: string,
  status: string,
  trancheSize: number|string
}

export class RetiredDetail extends React.Component {
  props: RetiredDetailProps;

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

  getChildContext () {
    return {
      setBackBtnVisibility: (showBackBtn: boolean) => this.setState({ showBackBtn }),
      setPageAction: (action: any) => this.setState({ action })
    };
  }

  render () {
    const { route, location, params  } = this.props;
    const { showBackBtn, action } = this.state;

    return (
    <div>
      <Breadcrumb location={location}/>
      <PageHeader
        location={location}
        route={route}
        withBackBtn={showBackBtn}
        actions={action}
        customTitle={'Retired CIFs'}
      />
      <div className='content-container'>
        <h3>{'Retired CIFs'}</h3>
        <h5>{'Retirement Summary'}</h5>
        <div className={'row'}>
          <div className={'col s4'} style={{ padding: 12.5, paddingLeft: 0 }}>
            <Paper className={'text-center'}>
              <h2 className={"overview-stats"}>30,000,000</h2>
              <p>{'Total CIFs Retired'} <span style={{color: '#417505'}}>{'YTD'}</span></p>
            </Paper>
          </div>
          <div className={'col s4'} style={{ padding: 12.5 }}>
            <Paper className={'text-center'}>
              <h2 className={"overview-stats"}>20,000,000</h2>
              <p>{'Total Retired MCFD'} <span style={{color: '#417505'}}>{'YTD'}</span></p>
            </Paper>
          </div>
          <div className={'col s4'} style={{ padding: 12.5, paddingRight: 0 }}>
            <Paper className={'text-center'}>
              <h2 className={"overview-stats"}>100,000,000</h2>
              <p>{'Total reductions All'} <span style={{color: '#417505'}}>{'Time'}</span></p>
            </Paper>
          </div>
        </div>
        <h5>{'Month over Month Retirement Trend'}</h5>
        <div className={'row'}>
          <Paper>
            <RetirementTrend />
          </Paper>
        </div>
        <h5>{'CIF Retirement by Type and Producer'}</h5>
        <div className={'row'}>
          <Paper>
            <CIFRetirementTypeAndProducer />
          </Paper>
        </div>
        <div className={'row'}>
        <h5>{'Retired CIFs'}</h5>
          <Table tbstyle={{'boxShadow': 'none'}} data={times(10, () => {
            return {
              creationDate: '4/11/2016',
              owner: 'Energy',
              producer: `${sample(['Carbon Creek', 'ACME'])}`,
              standardBody: 'American Carbon Registry',
              status: `${sample(['active', 'retired'])}`,
              trancheSize: `${random(10,88)},${random(100,999)}`
            };
          })}>
            <Column
              colSpan={1}
              name={'Status'}
              render={(c: CIF) => <span style={{ color: statusColor(c.status) }}>{startCase(c.status)}</span>}
            />
            <Column
              colSpan={1}
              name={'Producer'}
              render={(c: CIF) => c.producer}
            />
            <Column
              colSpan={1}
              name={'Ownership'}
              render={(c: CIF) => c.owner}
            />
            <Column
              colSpan={2}
              name={'Standard Body'}
              render={(c: CIF) => c.standardBody}
            />
            <Column
              colSpan={2}
              name={'Creation Date'}
              render={(c: CIF) => c.creationDate}
            />
            <Column
              colSpan={2}
              name={'Tranche Size'}
              render={(c: CIF) => c.trancheSize}
            />
            <Column
              colSpan={1}
              name={'Actions'}
              render={(c: CIF) => <i className="fa fa-ellipsis-h"></i>}
            />
          </Table>
        </div>

      </div>
    </div>);
  }
}

export default connect(undefined, {})(withRouter(RetiredDetail));

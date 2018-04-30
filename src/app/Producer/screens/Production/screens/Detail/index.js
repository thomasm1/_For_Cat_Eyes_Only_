// @flow
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import type { Location, LocationRouter, RouteConfig } from 'react-router';
import type { ActionCreator } from 'redux';

import { startCase, times, get, map, random } from 'lodash';
import $ from 'jquery';

import { loadSubmissionDetail } from 'modules/submissions/actions';
import type { Submission } from 'modules/submissions/definitions';

import { statusColor } from 'utils/formatter';

import ProductionBarGraph from 'components/Charts/Production';
import { Breadcrumb } from 'components/Breadcrumb';
import { Datagrid } from 'components/Datagrid';
import { PageHeader } from 'components/PageHeader';
import Pagination from 'components/Pagination';
import { Paper } from 'components/Paper';
import { Table, Column } from 'components/Table';
import { Tabs } from 'components/Tabs';

import styles from './styles.less';

type ProductionDetailProps = {
  route: RouteConfig,
  router: LocationRouter,
  location: Location,
  params: {
    id: string
  },
  current: Submission,
  loadSubmissionDetail: ActionCreator<*>
};

type ProductionData = {
  id: string,
  status: string,
  timestamp: string,
  meterLocation: string,
  mcfd: number,
  action: string
}

type MaintenanceData = {
  id: string,
  status: string,
  meterLocation: string,
  mcfd: number,
  compliance: string,
  action: string
}

export class ProductionDetail extends React.Component {
  props: ProductionDetailProps;

  state: {
    showBackBtn: boolean;
    action: any;
  };

  state = {
    showBackBtn: true,
    action: null
  };

  static childContextTypes = {
    setBackBtnVisibility: React.PropTypes.func,
    setPageAction: React.PropTypes.func
  };

  componentWillMount() {
    this.props.loadSubmissionDetail(this.props.params.id);
  }

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
    const { route, location, router, params, current  } = this.props;
    const { showBackBtn, action } = this.state;
    const submission = [
      { title: 'Well Pad ID', value: current.id },
      { title: 'Basin', value: current.basin },
      { title: 'Field', value: current.field },
      { title: 'API Number', value: '30-000-1234' },
      { title: 'Input Name', value: 'MS14102/MS14103' },
      { title: 'Latitude', value: current.lat },
      { title: 'DATUM', value: 'NAD1983' },
      { title: 'Section', value: '26' },
      { title: 'Longitude', value: current.lng }
    ];

    const certDetails = [
      { title: 'Certification Number', value: '12345678' },
      { title: 'Standard Body', value: 'American Carbon Registry' },
      { title: 'Inspector Name', value: 'John Doe' },
      { title: 'Date of Inspection', value: '12/21/2015' },
      { title: 'Date of Expiration', value: '12/21/2016' }
    ];

    const productionData = times(6, () => {
      return {
        id: current.id,
        status: 'Verified',
        timestamp: `2/${random(10,20)}/2016`,
        meterLocation: 'Big Cat FED 2126',
        mcfd: random(163, 234),
        action: ''
      }
    });

    const maintenanceData = times(6, () => {
      return {
        id: current.id,
        status: current.status,
        compliance: `${random(4,120)} Days`,
        meterLocation: 'Big Cat FED 2126',
        mcfd: random(163, 234),
        action: ''
      }
    });

    return (
      <div className={styles.ProductionDetail}>
        <Breadcrumb location={location}/>
        <PageHeader
          location={location}
          route={route}
          withBackBtn={showBackBtn}
          actions={action}
          customTitle={params.id} />
        <div className='content-container'>
          <h5>{'Well Pad Summary'}</h5>
          <div className={'row'}>
            <Datagrid data={ submission }/>
          </div>

          <h5>{'Certification Details'}</h5>
          <div className={'row'}>
            <Datagrid data={ certDetails }/>
          </div>

          <h5>{'CIF Generation'}</h5>
          <div className={'row'}>
            <Paper>
              <ProductionBarGraph />
            </Paper>
          </div>
          <div className='content-container'>
            <h5>{'Production Data'}</h5>
            <div className={'row'}>
              <Table data={productionData}>
                <Column
                  name={'Status'}
                  render={(c: ProductionData) => <span style={{ color: statusColor(c.status), fontWeight: 500 }}>{startCase(c.status)}</span>}
                  onClick={(c: ProductionData) => router.push(`/producer/production/${c.id}`)}/>

                <Column
                  name={'Timestamp'}
                  render={(c: ProductionData) => c.timestamp}
                  onClick={(c: ProductionData) => router.push(`/producer/production/${c.id}`)}/>

                <Column
                  name={'Meter Location'}
                  render={(c: ProductionData) => c.meterLocation}
                  onClick={(c: ProductionData) => router.push(`/producer/production/${c.id}`)}/>

                <Column
                  name={'Flow in MCFD'}
                  render={(c: ProductionData) => c.mcfd}
                  onClick={(c: ProductionData) => router.push(`/producer/production/${c.id}`)}/>

                <Column
                  name={'Actions'}
                  colSpan={2}
                  render={ (c: ProductionData) => <i className="fa fa-ellipsis-h"></i> }
                  onClick={(c: ProductionData) => router.push(`/producer/production/${c.id}`)}/>

              </Table>
              <Pagination />
            </div>

            <div className={styles.Maintenance}>
              <h5>{'Maintenance'}</h5>
              <div className='btn secondary right'>Add Maintenance</div>
            </div>
              <div style={{width: 450}}>
                <Tabs/>
              </div>
              <Table data={maintenanceData}>
                <Column
                  name={'Status'}
                  render={(c: MaintenanceData) => <span style={{ color: statusColor(c.status), fontWeight: 500 }}>{startCase(c.status)}</span>}
                  onClick={(c: MaintenanceData) => router.push(`/producer/production/${c.id}`)}/>

                <Column
                  name={'Next Compliance Check'}
                  render={(c: MaintenanceData) => c.compliance}
                  onClick={(c: MaintenanceData) => router.push(`/producer/production/${c.id}`)}/>

                <Column
                  name={'Meter Location'}
                  render={(c: MaintenanceData) => c.meterLocation}
                  onClick={(c: MaintenanceData) => router.push(`/producer/production/${c.id}`)}/>

                <Column
                  colSpan={2}
                  name={'Flow in MCFD'}
                  render={(c: MaintenanceData) => c.mcfd}
                  onClick={(c: MaintenanceData) => router.push(`/producer/production/${c.id}`)}/>

                <Column
                  name={'Actions'}
                  colSpan={2}
                  render={ (c: MaintenanceData) => <i className="fa fa-ellipsis-h"></i> }
                  onClick={(c: MaintenanceData) => router.push(`/producer/production/${c.id}`)}/>

              </Table>
              <Pagination />
            </div>
          </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    current: state.submissions.current.data
  }
}

export default connect(mapStateToProps, { loadSubmissionDetail })(withRouter(ProductionDetail));

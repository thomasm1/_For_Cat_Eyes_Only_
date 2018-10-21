// @flow
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import ProductionBarGraph from 'components/Charts/Production';
import type { Location, LocationRouter, RouteConfig } from 'react-router';
import { Breadcrumb } from 'components/Breadcrumb';
import { Datagrid } from 'components/Datagrid';
import { PageHeader } from 'components/PageHeader';
import Pagination from 'components/Pagination';
import { Paper } from 'components/Paper';
import { Stepper } from 'components/Stepper';
import { Table, Column } from 'components/Table';
import FinancialSummary from 'components/Charts/FinancialSummary';
import { Tabs } from 'components/Tabs';
import { startCase, times, get, map, random, sample } from 'lodash';
import { statusColor } from 'utils/formatter';

import $ from 'jquery';
import styles from './styles.less';

type ProductionDetailProps = {
  production: Error,
  provider: any,
  route: RouteConfig,
  router: LocationRouter,
  location: Location,
  params: {
    id: string
  }
};

type Error = {
  id: string,
  status: string,
  basin: string,
  field: string,
  flowOpt: string,
  cifsLost: string,
  action: string
}

type WellPad = {
  id: string,
  status: string,
  basin: string,
  field: string,
  lat: number,
  lng: number,
  certification: string,
  action: string
}

type Certificate = {
  status: string,
  inspector: string,
  DOI: string,
  DOE: string,
  nextStep: string,
  certification: string,
  actions: string
}

type CIF = {
  creationDate: string,
  owner: string,
  producer: string,
  standardBody: string,
  status: string,
  trancheSize: number|string
}

export class ProductionDetail extends React.Component {
  props: ProductionDetailProps;

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

    const producerSummary = [
      { title: 'Producer name', value: 'Carbon Creek' },
      { title: 'Integration Type', value: 'Automated' },
      { title: 'Phone Number', value: '(555)555-5555' }
    ];

    const certDetails = [
      { title: 'Certification Number', value: '12345678' },
      { title: 'Standard Body', value: 'American Carbon Registry' },
      { title: 'Inspector Name', value: 'John Doe' },
      { title: 'Date of Inspection', value: '12/21/2015' },
      { title: 'Date of Expiration', value: '12/21/2016' }
    ];

    const errorLogs = times(5, () => {
      return {
        id: 'Big Cat FED 2126-4899',
        status: `${sample(['Maintenance Required', 'Compliance Error', 'Maintenance Required'])}`,
        basin: 'Powder River',
        field: 'Big Cat',
        flowOpt: `${random(10,99)}%`,
        cifsLost: `${random(10, 99)},${random(100,898)}`,
        action: ''
      }
    });

    const wellPads = [{
      id: 'Big Cat FED 2126-4899',
      status: 'maintenance required',
      basin: `${random(4,120)} Days`,
      field: 'Big Cat FED 2126',
      lat: 36.2,
      lng: -107.25841,
      certification: '',
      action: ''
    }].concat(times(4, () => {
      return {
        id: 'Big Cat FED 2126-4899',
        status: 'Active',
        basin: 'Powder River',
        field: 'Big Cat',
        lat: 36.2,
        lng: -107.25841,
        certification: 7456421,
        action: ''
      }
    }));

    return (
    <div>
      <Breadcrumb location={location}/>
      <PageHeader
        location={location}
        route={route}
        withBackBtn={showBackBtn}
        actions={action}
        customTitle={params.id}
      />
      <div className='content-container'>
        <h5>{'Producer Summary'}</h5>
        <div className={'row'}>
          <Datagrid data={ producerSummary }/>
        </div>

        <h5>{'Production Summary - 24hrs'}</h5>
        <div className={'row'}>
          <Paper>
            <ProductionBarGraph />
          </Paper>
        </div>
        <div className='content-container'>
          <h5>{'Error Logs'}</h5>
          <div className={'row'}>
            <Table data={errorLogs}>
              <Column
                colSpan={2}
                name={'Status'}
                render={(c: Error) => <li style={{ color: statusColor(c.status), fontWeight: 500 }}>{startCase(c.status)}</li>}
              />

              <Column
                colSpan={2}
                name={'Well Pad ID'}
                render={(c: Error) => c.id}
              />

              <Column
                colSpan={1}
                name={'Basin'}
                render={(c: Error) => c.basin}
              />

              <Column
                colSpan={1}
                name={'Field'}
                render={(c: Error) => c.field}
              />

              <Column
                colSpan={2}
                name={'Flow Optimization'}
                render={(c: Error) => c.flowOpt}
              />

              <Column
                colSpan={2}
                name={'CIFs Lost'}
                render={(c: Error) => c.cifsLost}
              />

              <Column
                name={'Actions'}
                colSpan={2}
                render={ (c: Error) => <i className="fa fa-ellipsis-h"></i> }
              />

            </Table>
            <Pagination />
          </div>
          <h5>{'Well Pads'}</h5>
          <div className={'row'}>
            <Table data={wellPads}>
              <Column
                colSpan={2}
                name={'Status'}
                render={(c: WellPad) => <span style={{ color: statusColor(c.status), fontWeight: 500 }}>{startCase(c.status)}</span>}
                onClick={(c: WellPad) => router.push(`/xpansiv/production/wellpads/detail`)}
              />

              <Column
                colSpan={2}
                name={'Well Pad ID'}
                render={(c: WellPad) => c.id}
                onClick={(c: WellPad) => router.push(`/xpansiv/production/wellpads/detail`)}
              />

              <Column
                colSpan={1}
                name={'Basin'}
                render={(c: WellPad) => c.basin}
                onClick={(c: WellPad) => router.push(`/xpansiv/production/wellpads/detail`)}
              />

              <Column
                colSpan={2}
                name={'Field'}
                render={(c: WellPad) => c.field}
                onClick={(c: WellPad) => router.push(`/xpansiv/production/wellpads/detail`)}
              />

              <Column
                colSpan={2}
                name={'Latitude/Longitude'}
                render={(c: WellPad) => `${c.lat.toString()} / ${ c.lng.toString()}`}
                onClick={(c: WellPad) => router.push(`/xpansiv/production/wellpads/detail`)}
              />

              <Column
                colSpan={2}
                name={'Certification'}
                render={(c: WellPad) => {
                  return c.certification
                  ? <span>{c.certification}<img style={{marginLeft: 20, height: 30, verticalAlign: 'middle'}} src={require('../../images/certification.png')}/></span>
                  : <span/>
                }}
                onClick={(c: WellPad) => router.push(`/xpansiv/production/wellpads/detail`)}
              />

              <Column
                name={'Actions'}
                colSpan={1}
                render={ (c: WellPad) => <i className="fa fa-ellipsis-h"></i> }
                onClick={(c: WellPad) => router.push(`/xpansiv/production/wellpads/detail`)}
              />
            </Table>
            <Pagination />
          </div>
          <h5>{'Certifications List'}</h5>
          <div className={'row'}>
            <Table data={times(3, () => {
              return {
                status: 'Big Cat FED 2126-4899',
                inspector: 'John Smith',
                DOI: '12/21/2015',
                DOE: '12/21/2016',
                nextStep: 'Follow Up Inspection',
                certification: random(123000,500000).toString(),
                actions: ''
              };
            })}>
              <Column
                colSpan={2}
                name={'Status'}
                render={(c: Certificate) => <span style={{ color: statusColor(c.status) }}>{startCase(c.status)}</span>}
              />
              <Column
                colSpan={2}
                name={'Site Inspector'}
                render={(c: Certificate) => c.inspector}
              />
              <Column
                colSpan={2}
                name={'Date of Inspection'}
                render={(c: Certificate) => c.DOI}
              />
              <Column
                colSpan={2}
                name={'Date of Expiration'}
                render={(c: Certificate) => c.DOE}
              />
              <Column
                colSpan={2}
                name={'Next Step'}
                render={(c: Certificate) => c.nextStep}
              />
               <Column
                colSpan={2}
                name={'Certification'}
                render={(c: Certificate) => {
                  return c.certification
                  ? <span>{c.certification}<img style={{marginLeft: 20, height: 30, verticalAlign: 'middle'}} src={require('../../../Production/screens/All/assets/certification.png')}/></span>
                  : <span/>
                }}
              />
              <Column
                name={'Actions'}
                render={(c: Certificate) => <i className="fa fa-ellipsis-h"></i>}
              />
            </Table>
          </div>
          <h5>{'CIF Generation'}</h5>
          <div className={'row'}>
            <Paper>
              <FinancialSummary />
            </Paper>
          </div>
          <div className={'row'}>
            <Table data={times(10, () => {
              return {
                creationDate: '4/11/16',
                owner: 'Gas Co.',
                producer: 'Gas Co.',
                standardBody: 'American Carbon Registry',
                status: 'active',
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
                name={'Owner'}
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
      </div>
    </div>);
  }
}

export default connect(undefined, {})(withRouter(ProductionDetail));

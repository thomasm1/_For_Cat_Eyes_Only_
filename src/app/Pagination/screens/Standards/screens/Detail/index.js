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

export type StandardDetailProps = {
  production: Standard,
  route: RouteConfig,
  router: LocationRouter,
  location: Location,
  params: { id: string }
};

type Standard = {
  status: string,
  auditID: string,
  auditor: any,
  auditName: string,
  standardID: string,
  created: string,
  actions: string
}

type Certificate = {
  status: string,
  inspector: string,
  DOI: string,
  DOE: string,
  nextStep: string,
  reconciliation: string,
  actions: string
}

type CIF = {
  creationDate: string,
  owner: string,
  producer: string,
  standardBody: string,
  status: string,
  trancheSize: string
}

export class StandardDetail extends React.Component {
  props: StandardDetailProps;
  onSearchChange: () => void;

  state: {
    showBackBtn: boolean;
    action: any;
    searchFilter: string;
  };

  constructor(props: StandardDetailProps) {
    super(props);
    this.state = {
      showBackBtn: true,
      action: <div className='btn'>Run Audit</div>,
      searchFilter: ''
    };
    this.onSearchChange = this.onSearchChange.bind(this);
  }

  onSearchChange(event: Event) {
    if (event.target instanceof HTMLInputElement) {
      this.setState({
        searchFilter: event.target.value
      });
    }
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
    const { router, route, location, params } = this.props;
    const { showBackBtn, action } = this.state;

    const calcSummary = [
      { title: '', value: <img className="calc-graphic" src={require('./assets/calculation-summary.png')} />},
      { title: '', value: '' },
      { title: '', value: '' },
      { title: 'ETP', value: 'Total project emissions across all manufactures (tonnes CO2e/yr' },
      { title: 'EPi', value: 'Total project emissions across all manufactures (tonnes CO2e/yr' },
      { title: 'EPi', value: 'Total project emissions across all manufactures (tonnes CO2e/yr' },
      { title: 'EPi', value: 'Total number of people controllers from i' },
      { title: 'EPi', value: 'Methane global warming potential (21 tonnes CO2e/tonne CH4)' }
    ];
    const stdSummary = [
      { title: 'Standard Name', value: 'ACR Standard' },
      { title: 'Standard Body', value: 'American Carbon Registry' },
      { title: '', value: <img className="registry-logo" src={require('../../../CIFs/screens/Detail/assets/logo_american-carbon-registry.png')}/> }
    ];

    return (
      <div className={styles.CertificationDetail}>
        <Breadcrumb location={location}/>
        <PageHeader
          location={location}
          route={route}
          withBackBtn={showBackBtn}
          actions={action}
          customTitle={params.id}
        />
        <div className='content-container'>
          <h5>{'Standard Summary'}</h5>
          <div className={'row'}>
            <Datagrid data={ stdSummary }/>
          </div>
          <h5>{'Calculation Summary'}</h5>
          <div className={'row'}>
            <Datagrid data={ calcSummary }/>
          </div>
          <h5>{'Standard Breakdown'}</h5>
          <div className={'row'}>
            <Table data={times(18, () => {
              return {
                status: '123456',
                auditName: sample(['Applicability Conditions', 'Pre-Certification & Verification Process', 'Applicable Geography', 'Site Preparation', 'Facility Constuction']),
                standardID: '12345678',
                created: '10/31/2016',
                actions: ''
              };
            })}>
              <Column
                colSpan={2}
                name={'Status'}
                render={(c: Standard) => <span style={{ color: statusColor(c.status) }}>{startCase(c.status)}</span>}
              />
              <Column
                colSpan={2}
                name={'Audit Name'}
                render={(c: Standard) => c.auditName}
              />
              <Column
                colSpan={2}
                name={'Standard ID'}
                render={(c: Standard) => c.standardID}
              />
              <Column
                colSpan={2}
                name={'Date Created'}
                render={(c: Standard) => c.created}
              />
              <Column
                name={'Actions'}
                render={(c: Standard) => <i className="fa fa-ellipsis-h"></i>}
              />
            </Table>
          </div>
          <h5>{'Previous Audits'}</h5>
          <div className={'row'}>
            <Table data={times(3, () => {
              return {
                auditID: '123456',
                auditor: <img src={require('./assets/accenture.png')}/>,
                auditName: 'XPAN12345',
                standardID: '1234567',
                created: '10/31/2016',
                actions: ''
              };
            })}>
              <Column
                colSpan={2}
                name={'Status'}
                render={(c: Standard) => <span style={{ color: statusColor(c.auditID) }}>{startCase(c.auditID)}</span>}
              />
              <Column
                colSpan={2}
                name={'Auditor'}
                render={(c: Standard) => c.auditor}
              />
              <Column
                colSpan={2}
                name={'Audit Name'}
                render={(c: Standard) => c.auditName}
              />
              <Column
                colSpan={2}
                name={'Standard ID'}
                render={(c: Standard) => c.standardID}
              />
              <Column
                colSpan={2}
                name={'Date Created'}
                render={(c: Standard) => c.created}
              />
              <Column
                name={'Actions'}
                render={(c: Standard) => <i className="fa fa-ellipsis-h"></i>}
              />
            </Table>
          </div>
          <h5>{'Certifications List'}</h5>
          <div className={'row'}>
            <Table data={times(6, () => {
              return {
                status: 'Big Cat FED 2126-4899',
                inspector: 'John Smith',
                DOI: '12/21/2015',
                DOE: '12/21/2016',
                nextStep: 'Follow Up Inspection',
                reconciliation: '',
                actions: ''
              };
            })}>
              <Column
                colSpan={2}
                name={'Status'}
                render={(c: Certificate) => <span style={{ color: statusColor(c.status) }}>{startCase(c.status)}</span>}
                onClick={(c: Certificate) => router.push(`/producer/certifications/detail`)}
              />
              <Column
                colSpan={2}
                name={'Site Inspector'}
                render={(c: Certificate) => c.inspector}
                onClick={(c: Certificate) => router.push(`/producer/certifications/detail`)}
              />
              <Column
                colSpan={2}
                name={'Date of Inspection'}
                render={(c: Certificate) => c.DOI}
                onClick={(c: Certificate) => router.push(`/producer/certifications/detail`)}
              />
              <Column
                colSpan={2}
                name={'Date of Expiration'}
                render={(c: Certificate) => c.DOE}
                onClick={(c: Certificate) => router.push(`/producer/certifications/detail`)}
              />
              <Column
                colSpan={2}
                name={'Next Step'}
                render={(c: Certificate) => c.nextStep}
                onClick={(c: Certificate) => router.push(`/producer/certifications/detail`)}
              />
               <Column
                colSpan={2}
                name={'Certification'}
                render={(c: Certificate) => c.reconciliation}
                onClick={(c: Certificate) => router.push(`/producer/certifications/detail`)}/>
              <Column
                name={'Actions'}
                render={(c: Certificate) => <i className="fa fa-ellipsis-h"></i>}
                onClick={(c: Certificate) => router.push(`/producer/certifications/detail`)}
              />
            </Table>
          </div>
          <h5>{'Individual CIF'}</h5>
          <SearchInput value={this.state.searchFilter} onChange={this.onSearchChange}/>
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
                name={'Producer'}
                render={(c: CIF) => c.producer}
                onClick={(c: CIF) => router.push(`/xpansiv/cifs/detail`)}
              />
              <Column
                colSpan={2}
                name={'Owner'}
                render={(c: CIF) => c.owner}
                onClick={(c: CIF) => router.push(`/xpansiv/cifs/detail`)}
              />
              <Column
                colSpan={2}
                name={'Standard'}
                render={(c: CIF) => c.standardBody}
                onClick={(c: CIF) => router.push(`/xpansiv/cifs/detail`)}
              />
              <Column
                name={'Creation Date'}
                render={(c: CIF) => c.creationDate}
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

export default connect(undefined, {})(withRouter(StandardDetail));

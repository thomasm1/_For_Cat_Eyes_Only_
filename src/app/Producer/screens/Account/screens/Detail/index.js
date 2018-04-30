// @flow
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import type { Location, LocationRouter, RouteConfig } from 'react-router';

import type { ActionCreator } from 'redux';
import type { CIF } from 'modules/cifs/definitions';
import { loadCIFDetail } from 'modules/cifs/actions';

import ProductionBarGraph from 'components/Charts/Production';
import { Breadcrumb } from 'components/Breadcrumb';
import { Datagrid } from 'components/Datagrid';
import { PageHeader } from 'components/PageHeader';
import { Paper } from 'components/Paper';
import { Table, Column } from 'components/Table';
import ProductionSummary from 'components/Charts/ProductionSummary';
import styles from './styles.less';

type CIFDetailProps = {
  route: RouteConfig,
  location: Location,
  params: {
    id: string
  },
  loadCIFDetail: ActionCreator<*>,
  current: CIF
};

export class CIFDetail extends React.Component {
  props: CIFDetailProps;

  componentWillMount(){
    this.props.loadCIFDetail(this.props.params.id);
  }

  render () {
    const { route, location, params, current } = this.props;

    const cifSummary = [
      { title: 'Producer', value: 'Gas Co.' },
      { title: 'Ownership', value: 'Gas Co.' },
      { title: 'Status', value: 'Active' },
      { title: 'Date of Production', value: '04/11/2016' },
      { title: 'Total Volume', value: '164561.12' },
      { title: 'Relevant Standard', value: 'American Carbon Registry' },
      { title: 'Relevant Equivelancy', value: '1 CIF = 1 MCF Certified Low Impact Gas Produced' }
    ];

    const stdSummary = [
      { title: 'Standard Name', value: 'ACR Standard' },
      { title: 'Standard Body', value: 'American Carbon Registry' },
      { title: '', value: <img className="registry-logo" src={require('./assets/logo_american-carbon-registry.png')}/> }
    ];

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

    const wellCert = [
      {title: 'Certification Date', value: '12/20/2014' },
      {title: 'Verification Body', value: 'American Carbon Registry' }
      ];
    const CIFIssuance = [
      {title: 'Issue Date', value: '12/20/2014' },
      {title: 'Token ID', value: '412176531232' },
      {title: 'Issuance Validation', value: 'Xpansiv' }

    ];

    return (
      <div className={styles.CIFsDetail}>
        <Breadcrumb location={location}/>
        <PageHeader
          location={location}
          route={route}
          withBackBtn={true}
          actions={
              <div>
                <div className='btn'>Transfer</div>
                <div className='btn'>Retire CIF</div>
              </div>
            }
          customTitle={params.id} />

        <div className='content-container'>
          <h5>{'CIF Summary'}</h5>
          <div className={'row'}>
            <Datagrid data={ cifSummary }/>
          </div>

          <h5>{'Standard Summary'}</h5>
          <div className={'row'}>
            <Datagrid data={ stdSummary }/>
          </div>

          <h5>{'Calculation Summary'}</h5>
          <div className={'row'}>
            <Datagrid data={ calcSummary }/>
          </div>

          <div className={'Cif'}>
            <h5>{'Production Summary'}</h5>
            <div className='btn secondary right'>View Raw Data</div>
          </div>
          <div className={'row'}>
            <Paper className={'z-depth-1 row'}>
                <ProductionSummary />
            </Paper>
          </div>

          <h5>{'CIF History'}</h5>
          <div className={'row'}>
            <div className="cif-history-icon z-depth-1"><img src={require('./assets/storage.png')}/></div>
            <Datagrid title ={'Well Certification'} className={'data-grid'} style={{marginTop: 0}} colStyle={{margin: '0'}} data={ wellCert }/>
          </div>
          <div className={'row'}>
            <div className="cif-history-icon z-depth-1"><img src={require('./assets/certification-check.png')}/></div>
            <Datagrid title ={'CIF Issuance'} className={'data-grid'} style={{marginTop: 0}} colStyle={{margin: '0'}} data={ CIFIssuance }/>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    current: state.cifs.current.data
  }
}


export default connect(mapStateToProps,{ loadCIFDetail })(withRouter(CIFDetail));

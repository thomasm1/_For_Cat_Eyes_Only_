// @flow
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import type { Location, LocationRouter, RouteConfig } from 'react-router';
import { Breadcrumb } from 'components/Breadcrumb';
import { Datagrid } from 'components/Datagrid';
import { PageHeader } from 'components/PageHeader';
import { Pagination } from 'components/Pagination';
import { Paper } from 'components/Paper';
import styles from './styles.less';

export type CertificationDetailProps = {
  production: Well,
  route: RouteConfig,
  router: LocationRouter,
  location: Location,
  params: {
    id: string
  }
};

type Well = {
  id: string,
  status: string,
  timestamp: string,
  meterLocation: string,
  mcfd: number,
  compliance: string,
  action: string
}

export class CertificationDetail extends React.Component {
  props: CertificationDetailProps;

  state: {
    showBackBtn: boolean;
    action: any;
  };

  state = {
    showBackBtn: true,
    action: <div className='btn'>View Verification Report</div>
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

    const certDetails = [
      { title: 'Certification Number', value: '12345678' },
      { title: 'Standard Body', value: 'American Carbon Registry' },
      { title: 'Well Pad', value: 'Big Cat 12389-7981' }
    ];
    const stdSummary = [
      { title: 'Standard Name', value: 'ACR Standard' },
      { title: 'Standard Body', value: 'American Carbon Registry' },
      { title: '', value: <img className="registry-logo" src={require('../../../CIFs/screens/Detail/assets/logo_american-carbon-registry.png')}/> }
    ];

    const verifierDetails = [
      { title: 'Inspector Name', value: 'John Doe' },
      { title: 'Date of Inspection', value: '12/21/2015' },
      { title: 'Date of Expiration', value: '12/21/2016' }
    ];

    const schematics = [
      { title: <img className="registry-logo" src={require('./assets/wellhead.png')}/>, value: 'ACR Standard' },
      { title: <img className="registry-logo" src={require('./assets/wellhead.png')}/>, value: 'American Carbon Registry' },
      { title: <img className="registry-logo" src={require('./assets/wellhead.png')}/>, value: 'Wellhead' }
    ];
    const referencePhotos = [
      <img className="ref-photos" src={require('./assets/photo1.png')}/>,
      <img className="ref-photos" src={require('./assets/photo2.png')}/>,
      <img className="ref-photos" src={require('./assets/photo3.png')}/>,
      <img className="ref-photos" src={require('./assets/photo4.png')}/>,
      <img className="ref-photos" src={require('./assets/photo5.png')}/>,
      <img className="ref-photos" src={require('./assets/photo6.png')}/>,
      <img className="ref-photos" src={require('./assets/photo7.png')}/>,
      <img className="ref-photos" src={require('./assets/photo8.png')}/>,
      <img className="ref-photos" src={require('./assets/photo9.png')}/>,
      <img className="ref-photos" src={require('./assets/photo10.png')}/>,
      <img className="ref-photos" src={require('./assets/photo11.png')}/>
    ]

    return (<div className={styles.CertificationDetail}>
      <Breadcrumb location={location}/>
      <PageHeader
        location={location}
        route={route}
        withBackBtn={showBackBtn}
        actions={action}
        customTitle={params.id} />
      <div className='content-container'>
        <h5>{'Certification Details'}</h5>
        <div className={'row'}>
          <Datagrid data={ certDetails }/>
        </div>

        <h5>{'Standard Summary'}</h5>
        <div className={'row'}>
          <Datagrid data={ stdSummary }/>
        </div>

        <h5>{'Verifier Details'}</h5>
        <div className={'row'}>
          <Datagrid data={ verifierDetails }/>
        </div>

        <h5>{'Reference Photos'}</h5>
        <div className={'row'}>
          <Paper>
            <div className={'row center'}>
              { referencePhotos }
            </div>
          </Paper>
        </div>
        <h5>{'Schematics'}</h5>
        <div className={'row'}>
          <Paper>
            <div className={'row'}>
              <div className="col s4 schematics">
                <img className="schematics-img" src={require('./assets/wellhead.png')}/>
                <h6>{'Wellhead'}</h6>
              </div>
              <div className="col s4 schematics">
                <img className="schematics-img" src={require('./assets/capstone.png')}/>
                <h6>{'Capstone'}</h6>
              </div>
              <div className="col s4 schematics">
                <img className="schematics-img" src={require('./assets/piping.png')}/>
                <h6>{'In Ground Piping Isometric'}</h6>
              </div>
            </div>
          </Paper>
        </div>
      </div>
    </div>);
  }
}

export default connect(undefined, {})(withRouter(CertificationDetail));

// @flow
import React, { Children } from 'react';

import { connect } from 'react-redux';
import type { ActionCreator } from 'redux';
import type { RouteConfig, Location, LocationRouter } from 'react-router';
import { withRouter, browserHistory } from 'react-router';

import { random, times } from 'lodash';

import { listCertifications } from 'modules/certifications/actions';

import UpcomingCertifications from 'components/Charts/UpcomingCertifications';
import { Paper } from 'components/Paper';
import { Table, Column } from 'components/Table';
import { startCase } from 'lodash';
import { statusColor } from 'utils/formatter';
import styles from './styles.less';

type CertificationProps = {
  router: LocationRouter,
  location: Location,
  certifications: any,
  listCertifications: ActionCreator<*>
};

type Certificate = {
  id: string,
  inspector: string,
  DOI: string,
  DOE: string,
  nextStep: string,
  certification: Number,
  action: string
}

export class Certifications extends React.Component {
  props: CertificationProps;

  componentWillMount() {
    this.props.listCertifications();
  }

  render () {
    const { router, location, certifications } = this.props;
    return (
      <div className={styles.Certifications}>
        <div className='content-container'>
          <h3 className={'certifications-header'}>{'Certifications'}</h3>
          <h5>{'Upcoming Certifications'}</h5>
          <div className={'row'}>
            <Paper>
              <UpcomingCertifications />
            </Paper>
          </div>
          <h5>{'Certifications List'}</h5>
          <div className={'row'}>
            <Table data={certifications}>
              <Column
                colSpan={2}
                name={'Well ID'}
                render={(c: Certificate) => <span style={{ color: statusColor(c.id) }}>{startCase(c.id)}</span>}
                onClick={(c: Certificate) => router.push(`/producer/certifications/${c.id}`)}
              />
              <Column
                colSpan={2}
                name={'Site Inspector'}
                render={(c: Certificate) => c.inspector}
                onClick={(c: Certificate) => router.push(`/producer/certifications/${c.id}`)}
              />
              <Column
                colSpan={2}
                name={'Date of Inspection'}
                render={(c: Certificate) => c.DOI}
                onClick={(c: Certificate) => router.push(`/producer/certifications/${c.id}`)}
              />
              <Column
                colSpan={2}
                name={'Date of Expiration'}
                render={(c: Certificate) => c.DOE}
                onClick={(c: Certificate) => router.push(`/producer/certifications/${c.id}`)}
              />
              <Column
                colSpan={2}
                name={'Next Step'}
                render={(c: Certificate) => c.nextStep}
                onClick={(c: Certificate) => router.push(`/producer/certifications/${c.id}`)}
              />
               <Column
                colSpan={2}
                name={'Certification'}
                render={(c: Certificate) => {
                  return c.certification
                  ? <span>{c.certification}<img style={{marginLeft: 20, height: 30, verticalAlign: 'middle'}} src={require('../../../Production/screens/All/assets/certification.png')}/></span>
                  : <span/>
                }}
                onClick={(c: Certificate) => router.push(`/producer/certifications/${c.id}`)}/>
              <Column
                name={'Actions'}
                render={(c: Certificate) => <i className="fa fa-ellipsis-h"></i>}
                onClick={(c: Certificate) => router.push(`/producer/certifications/${c.id}`)}
              />
            </Table>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    certifications: state.certifications.all.data
  }
}

export default connect(mapStateToProps, {listCertifications} )(withRouter(Certifications));

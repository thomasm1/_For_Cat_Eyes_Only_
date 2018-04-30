// @flow
import React, { Children } from 'react';

import { connect } from 'react-redux';
import type { ActionCreator } from 'redux';
import { random, times } from 'lodash';

import UpcomingCertifications from 'components/Charts/UpcomingCertifications';
import type { RouteConfig, Location, LocationRouter } from 'react-router';
import { Paper } from 'components/Paper';
import { Table, Column } from 'components/Table';
import { startCase } from 'lodash';
import { statusColor } from 'utils/formatter';
import { withRouter, browserHistory } from 'react-router';
import styles from './styles.less';

type CertificationProps = {
  router: LocationRouter,
  location: Location
};

type Certificate = {
  id: string,
  status: string,
  inspector: string,
  DOI: string,
  DOE: string,
  nextStep: string,
  certification: Number,
  action: string
}

export class Certifications extends React.Component {
  props: CertificationProps;

  render () {
    const {
      router, location
    } = this.props;

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
            <Table data={times(6, () => {
              return {
                status: 'Big Cat FED 2126-4899',
                inspector: 'John Smith',
                DOI: '12/21/2015',
                DOE: '12/21/2016',
                nextStep: 'Follow Up Inspection',
                certification: random(123000,500000),
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
                render={(c: Certificate) => {
                  return c.certification
                  ? <span>{c.certification}<img style={{marginLeft: 20, height: 30, verticalAlign: 'middle'}} src={require('./assets/certification.png')}/></span>
                  : <span/>
                }}
                onClick={(c: Certificate) => router.push(`/producer/certifications/detail`)}/>
              <Column
                name={'Actions'}
                render={(c: Certificate) => <i className="fa fa-ellipsis-h"></i>}
                onClick={(c: Certificate) => router.push(`/producer/certifications/detail`)}
              />
            </Table>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(undefined, {} )(withRouter(Certifications));

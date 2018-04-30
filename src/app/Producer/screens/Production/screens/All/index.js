// @flow
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import type { ActionCreator } from 'redux';
import type { Submission } from 'modules/submissions/definitions';
import type { RouteConfig, LocationRouter } from 'react-router';
import { listSubmissions } from 'modules/submissions/actions';
import { Paper } from 'components/Paper';
import { Table, Column } from 'components/Table';
import { startCase, orderBy } from 'lodash';
import { statusColor } from 'utils/formatter';
import styles from './styles.less';

type ProductionProps = {
  router: LocationRouter,
  listSubmissions: ActionCreator<*>,
  submissions: Array<Submission>
};

export class Production extends React.Component {
  props: ProductionProps;

  componentWillMount() {
    this.props.listSubmissions();
  }

  render () {
    const { router, submissions } = this.props;
    return (
       <div className={styles.Production}>
         <div className='content-container'>
            <h5>{'Production Summary - Last Upload'}</h5>
            <div className={'row'}>
              <div className={'col s4'} style={{ padding: 12.5, paddingLeft: 0 }}>
                <Paper className={'text-center'}>
                  <h2 className={"overview-stats"}>30,000</h2>
                  <p>{'Total CIFs Generated'}</p>
                </Paper>
              </div>
              <div className={'col s4'} style={{ padding: 12.5 }}>
                <Paper className={'text-center'}>
                  <h2 className={"overview-stats"}>17%</h2>
                  <p>{'% out of Compliance'}</p>
                </Paper>
              </div>
              <div className={'col s4'} style={{ padding: 12.5, paddingRight: 0 }}>
                <Paper className={'text-center'}>
                  <h2 className={"overview-stats"}>2,431</h2>
                  <p>{'Missed CIFs'}</p>
                </Paper>
              </div>
            </div>

            <h5>{'File Upload'}</h5>
            <div className={'row'}></div>

            <h5 className="summary">{'Production Data'}</h5>
            <Table data={orderBy(submissions, ['status', 'productionDate'] )}>
              <Column
                name={'Status'}
                render={(c: Submission) => <span style={{ color: statusColor(c.status), fontWeight: 500 }}>{startCase(c.status)}</span>}
                onClick={(c: Submission) => router.push(`/producer/production/${c.cifId}`)}/>

              <Column
                name={'CIF ID'}
                render={(c: Submission) => c.cifId}
                onClick={(c: Submission) => router.push(`/producer/production/${c.cifId}`)}/>

              <Column
                name={'Tranche Size'}
                render={(c: Submission) => c.trancheSize}
                onClick={(c: Submission) => router.push(`/producer/production/${c.cifId}`)}/>

              <Column
                name={'Production Date'}
                render={(c: Submission) => c.productionDate}
                onClick={(c: Submission) => router.push(`/producer/production/${c.cifId}`)}/>

              <Column
                name={'Standard'}
                render={(c: Submission) => c.standard}
                onClick={(c: Submission) => router.push(`/producer/production/${c.cifId}`)}/>

              <Column
                name={'File Name'}
                render={(c: Submission) => c.fileName}
                onClick={(c: Submission) => router.push(`/producer/production/${c.cifId}`)}/>
              <Column
                name={'Actions'}
                render={(c: Submission) => <i className="fa fa-ellipsis-h "></i>}
                onClick={(c: Submission) => router.push(`/producer/production/${c.cifId}`)}/>
            </Table>
          </div>
        </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    submissions: state.submissions.all.data
  }
}

export default connect(mapStateToProps, {listSubmissions})(withRouter(Production));

import React from 'react';
import { connect } from 'react-redux';
import { withRouter, router } from 'react-router';
import type { ActionCreator } from 'redux';
import type { Location, LocationRouter, RouteConfig } from 'react-router';
import type { CIF } from 'modules/cifs/definitions';
import { listCIFs } from 'modules/cifs/actions';
import { orderBy, startCase, filter } from 'lodash';
import { statusColor } from 'utils/formatter';
import { Paper } from 'components/Paper';
import { Table, Column } from 'components/Table';
import homepageBanner from '../../assets/homepageBanner.png';
import styles from './styles.less';

type HomeProps = {
  router: LocationRouter,
  location: Location,
  listCIFs: ActionCreator<*>,
  cifs: Array<CIF>
};

export class Home extends React.Component {
  props: HomeProps;

  componentWillMount() {
    this.props.listCIFs();
  }

  render () {
    const { router, location, cifs } = this.props;
    const ellipsis = '.....................................................................................................................................................................................................................';
    return (
      <div className={styles.Home}>
        <div className='homepageBanner'>
          <img style={{width: '100%', height: '100%'}} src={homepageBanner} />
          <div className='banner-text'>GasCo</div>
        </div>
        <div className='content-container'>
          <h5>{'CIF Overview - 24hrs'}</h5>
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
                <p>{'Total CIFs Transferred'}</p>
              </Paper>
            </div>
            <div className={'col s4'} style={{ padding: 12.5, paddingRight: 0 }}>
              <Paper className={'text-center'}>
                <h2 className={"overview-stats"}>1,000</h2>
                <p>{'Retired CIFs'}</p>
              </Paper>
            </div>
          </div>
          <h5>{'CIF Management'}</h5>
          <div className={'row'}>
            <Table
              style={{marginBottom: 20}}
              data={[
                {status: `Produced`, balance: (50000000).toLocaleString()},
                {status: `Owned`, balance: (30000000).toLocaleString()},
                {status: `Transferred`, balance: (10000000).toLocaleString()},
                {status: `Retired`, balance: (10000000).toLocaleString()}
            ]}>
              <Column
                colSpan={10}
                name={' '}
                style={{textOverflow: 'initial'}}
                render={(c: CIF) => <span><span style={{ fontSize: 18, fontWeight: 600 }}>{c.status} </span><span style={{fontSize: 24}}> {ellipsis}</span></span>}
              />
              <Column
                name={' '}
                style={{textAlign: 'right', width: 300}}
                render={(c: CIF) => <span style={c.status === 'Produced' ? {  fontSize: 48, fontWeight: 100 } : {fontSize: 36, fontWeight: 100}}>{c.balance}</span>}
              />
            </Table>
          </div>

          <h5>{'Pending Production Data'}</h5>
          <div className={'row'}>
            <Table
              style={{marginBottom: 20}}
              data={orderBy(filter(cifs, {status: 'pending'}), 'productionDate')}>
              <Column
                name={'Status'}
                render={(c: CIF) => <span style={{ color: statusColor(c.status) }}>{startCase(c.status)}</span>}
                onClick={(c: CIF) => router.push(`/producer/cifs/${c.id}`)}
              />
              <Column
                name={'CIF ID'}
                render={(c: CIF) => c.id}
                onClick={(c: CIF) => router.push(`/producer/cifs/${c.id}`)}
              />
              <Column
                name={'Tranche Size'}
                render={(c: CIF) => c.trancheSize}
                onClick={(c: CIF) => router.push(`/producer/cifs/${c.id}`)}
              />
              <Column
                name={'Production Date'}
                render={(c: CIF) => c.productionDate}
                onClick={(c: CIF) => router.push(`/producer/cifs/${c.id}`)}
              />
              <Column
                name={'File Location'}
                render={(c: CIF) => c.fileLocation}
                onClick={(c: CIF) => router.push(`/producer/cifs/${c.id}`)}
              />
              <Column
                name={'File Name'}
                render={(c: CIF) => c.fileName}
                onClick={(c: CIF) => router.push(`/producer/cifs/${c.id}`)}
              />
              <Column
                name={'Actions'}
                render={(c: CIF) => <i className="fa fa-ellipsis-h"></i>}
              />
            </Table>
          </div>

          <h5>{'Recent CIF Generation'}</h5>
          <div className={'row'}>
            <Table data={filter(cifs, {status: 'active'})}>
              <Column
                name={'Status'}
                render={(c: CIF) => <span style={{ color: statusColor(c.status) }}>{startCase(c.status)}</span>}
                onClick={(c: CIF) => router.push(`/producer/cifs/${c.id}`)}
              />
              <Column
                name={'Producer'}
                render={(c: CIF) => c.producer}
                onClick={(c: CIF) => router.push(`/producer/cifs/${c.id}`)}
              />
              <Column
                name={'Ownership'}
                render={(c: CIF) => c.ownership}
                onClick={(c: CIF) => router.push(`/producer/cifs/${c.id}`)}

              />
              <Column
                colSpan={2}
                name={'Standard Body'}
                render={(c: CIF) => c.standardBody}
                onClick={(c: CIF) => router.push(`/producer/cifs/${c.id}`)}
              />
              <Column
                name={'Creation Date'}
                render={(c: CIF) => c.creationDate}
                onClick={(c: CIF) => router.push(`/producer/cifs/${c.id}`)}
              />
              <Column
                name={'Tranche Size'}
                render={(c: CIF) => c.trancheSize.toLocaleString()}
                onClick={(c: CIF) => router.push(`/producer/cifs/${c.id}`)}
              />
              <Column
                name={'Actions'}
                render={(c: CIF) => <i className="fa fa-ellipsis-h"></i>}
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
    cifs: state.cifs.all.data
  }
}

export default connect(mapStateToProps, {listCIFs} )(withRouter(Home));

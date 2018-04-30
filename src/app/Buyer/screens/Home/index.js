import React from 'react';
import { connect } from 'react-redux';
import { withRouter, router } from 'react-router';
import type { Location, LocationRouter, RouteConfig } from 'react-router';
import Pagination from 'components/Pagination';
import styles from './styles.less';
import { Paper } from 'components/Paper';
import { Table, Column } from 'components/Table';
import { startCase, times, random, sample } from 'lodash';
import { statusColor } from 'utils/formatter';
import homepageBanner from '../../assets/energy-hero.png';
import AcquisitionTrend from 'components/Charts/AcquisitionTrend';
import CIFSlider from 'components/CIFSlider';

type HomeProps = {
  router: LocationRouter,
  location: Location
};

type ActionItems = {
  id: string,
  status: string,
  inspector: string,
  DOI: string,
  DOE: string,
  nextStep: string,
  certification: number,
  action: string
}

export class Home extends React.Component {
  props: HomeProps;

  render () {
    const {
      router, location
    } = this.props;

    const producerData = [
      { logo: 'carbon-creek', producerName: 'Carbon Creek Energy', availableCIFs: '2,030,000', avgDailyProduction: '30,000', CIFEfficiency: '87%', actions: '' },
      { logo: 'statoil', producerName: 'Statoil', availableCIFs: '3,150,249', avgDailyProduction: '40,000', CIFEfficiency: '85%', actions: '' },
      { logo: 'galp', producerName: 'Galp Energia', availableCIFs: '5,125,230', avgDailyProduction: '50,000', CIFEfficiency: '67%', actions: '' },
      { logo: 'encana', producerName: 'Encana', availableCIFs: '400,000', avgDailyProduction: '10,000', CIFEfficiency: '90%', actions: '' },
      { logo: 'enbridge', producerName: 'Enbridge', availableCIFs: '4,900,000', avgDailyProduction: '365,000', CIFEfficiency: '78%', actions: '' }
    ];

    const actionData =  [
    {
      status: 'alert',
      wellpad: 'Big Cat FED 2126-4899',
      basin: 'Powder River',
      field: 'Big Cat',
      reason: 'Currently out of compliance',
      actions: ''
    }].concat(times(4, () => {
      return {
        status: 'attention required',
        wellpad: 'Big Cat FED 2126-4899',
        basin: 'Powder River',
        field: 'Big Cat',
        reason: 'Compliance measure needed',
        action: ''
      }
    }));

    return (
      <div className={styles.Home}>
        <div className='homepageBanner'>
          <div className='overlay'></div>
          <div className='banner-text'>Energy</div>
        </div>
        <div className='content-container'>
          <h5>{'Summary'}</h5>
          <div className={'row'}>
            <div className={'col s4'} style={{ padding: 12.5, paddingLeft: 0, paddingRight: 45.5 }}>
              <Paper className={'text-center'}>
                <h2 className={"overview-stats"}>432,890</h2>
                <p>{'CIFs Retired'}</p>
              </Paper>
            </div>
            <div className={'col s4'} style={{ padding: 12.5, paddingLeft: 22.75, paddingRight: 22.75 }}>
              <Paper className={'text-center'}>
                <h2 className={"overview-stats"}>1,124,234</h2>
                <p>{'CIFs in Account'}</p>
              </Paper>
            </div>
            <div className={'col s4'} style={{ padding: 12.5, paddingLeft: 45.5, paddingRight: 0 }}>
              <Paper className={'text-center'}>
                <h2 className={"overview-stats"}>34,290</h2>
                <p>{'Recent CIFs'}</p>
              </Paper>
            </div>
          </div>

          <div className={'row'}>
            <AcquisitionTrend />
          </div>
          <h5>{'Recent Transaction'}</h5>
          <div className={'row'}>
            <Table data={times(10, () => {
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
                onClick={(c: CIF) => router.push('/buyer/transactions/detail')}
              />
              <Column
                colSpan={1}
                name={'Producer'}
                render={(c: CIF) => c.producer}
                onClick={(c: CIF) => router.push('/buyer/transactions/detail')}
              />
              <Column
                colSpan={1}
                name={'Owner'}
                render={(c: CIF) => c.owner}
                onClick={(c: CIF) => router.push('/buyer/transactions/detail')}
              />
              <Column
                colSpan={2}
                name={'Standard Body'}
                render={(c: CIF) => c.standardBody}
                onClick={(c: CIF) => router.push('/buyer/transactions/detail')}
              />
              <Column
                colSpan={2}
                name={'Creation Date'}
                render={(c: CIF) => c.creationDate}
                onClick={(c: CIF) => router.push('/buyer/transactions/detail')}
              />
              <Column
                colSpan={2}
                name={'Tranche Size'}
                render={(c: CIF) => c.trancheSize}
                onClick={(c: CIF) => router.push('/buyer/transactions/detail')}
              />
              <Column
                colSpan={1}
                name={'Actions'}
                render={(c: CIF) => <i className="fa fa-ellipsis-h"></i>}
                onClick={(c: CIF) => router.push('/buyer/transactions/detail')}
              />
            </Table>
          </div>

          <h5>{'Producers'}</h5>
          <div className={'row'}>
            <Table data={ producerData }>
              <Column
                colSpan={1}
                name={' '}
                render={(c: ActionItems) => {
                  return c.logo
                  ? <span><img style={{height: 50, verticalAlign: 'middle'}} src={require(`../../assets/${c.logo}.png`)}/></span>
                  : <span/>
                }}
                onClick={(c: ActionItems) => router.push(`/buyer/marketplace/detail`)}
              />
              <Column
                colSpan={2}
                name={'Producer Name'}
                render={(c: ActionItems) => c.producerName}
                onClick={(c: ActionItems) => router.push(`/buyer/marketplace/detail`)}
              />
              <Column
                colSpan={2}
                name={'Available CIFs'}
                render={(c: ActionItems) => c.availableCIFs}
                onClick={(c: ActionItems) => router.push(`/buyer/marketplace/detail`)}
              />
              <Column
                colSpan={2}
                name={'Average Daily Production'}
                render={(c: ActionItems) => c.avgDailyProduction}
                onClick={(c: ActionItems) => router.push(`/buyer/marketplace/detail`)}
              />
              <Column
                colSpan={2}
                name={'CIF Efficiency %'}
                render={(c: ActionItems) => c.CIFEfficiency}
                onClick={(c: ActionItems) => router.push(`/buyer/marketplace/detail`)}
              />
              <Column
                name={'Actions'}
                render={(c: ActionItems) => <i className="fa fa-ellipsis-h"></i>}
                onClick={(c: ActionItems) => router.push(`/buyer/marketplace/detail`)}
              />
            </Table>
            <Pagination />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(undefined, {} )(withRouter(Home));

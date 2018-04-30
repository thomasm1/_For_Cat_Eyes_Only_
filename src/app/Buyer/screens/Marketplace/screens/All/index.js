// @flow
import React, { Children } from 'react';
import { connect } from 'react-redux';
import type { ActionCreator } from 'redux';
import { withRouter } from 'react-router';
import type { RouteConfig, Location, LocationRouter } from 'react-router';

import { startCase, random, times, sample } from 'lodash';
import $ from 'jquery';

import { statusColor } from 'utils/formatter';
import { setModalType } from 'modules/modal/actions';

import { Paper } from 'components/Paper';
import Pagination from 'components/Pagination';
import { Table, Column } from 'components/Table';
import CIFSlider from 'components/CIFSlider';

import styles from './styles.less';

type MarketplaceProps = {
  router: LocationRouter,
  location: Location,
  setModalType: ActionCreator<*>
};

type CIF = {
  status: string,
  producer: string,
  account: string,
  balance: string,
  action: string,
  owner: string,
  standardBody: string,
  creationDate: string,
  trancheSize: number
}

type ProducerItems = {
  logo: string,
  producerName: string,
  availableCIFs: number,
  avgDailyProduction: number,
  CIFEfficiency: number,
  action: string
}

export class Marketplace extends React.Component {
  props: MarketplaceProps;


  componentDidMount() {
    $('.modal-trigger').leanModal({
      closeIcon: true
    });
  }

  state: {
    showBackBtn: boolean;
    action: any;
  };

  constructor(props: MarketplaceProps) {
    super(props);
    this.state = {
      showBackBtn: false,
      action: '',
    };
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
    console.log('im being rendered.');
    const { router, location } = this.props;
    const { showBackBtn, action } = this.state;
    const producerData = [
      { logo: 'carbon-creek', producerName: 'Carbon Creek Energy', availableCIFs: '2,030,000', avgDailyProduction: '30,000', CIFEfficiency: '87%', actions: '' },
      { logo: 'statoil', producerName: 'Statoil', availableCIFs: '3,150,249', avgDailyProduction: '40,000', CIFEfficiency: '85%', actions: '' },
      { logo: 'galp', producerName: 'Galp Energia', availableCIFs: '5,125,230', avgDailyProduction: '50,000', CIFEfficiency: '67%', actions: '' },
      { logo: 'encana', producerName: 'Encana', availableCIFs: '400,000', avgDailyProduction: '10,000', CIFEfficiency: '90%', actions: '' },
      { logo: 'enbridge', producerName: 'Enbridge', availableCIFs: '4,900,000', avgDailyProduction: '365,000', CIFEfficiency: '78%', actions: '' }
    ];

    return (
      <div className={styles.Marketplace}>
        <div className='content-container'>
          <h3 className={'producer-header'}>{'Marketplace'}</h3>
          <h5>{'Recent Activity'}</h5>
          <div className={'row'}>
            <div className={'col s4'} style={{ padding: 12.5, paddingLeft: 0, paddingRight: 45.5 }}>
              <Paper className={'text-center'}>
                <h2 className={"overview-stats"}>4,667,121</h2>
                <p>{'Total CIFs Available'}</p>
              </Paper>
            </div>
            <div className={'col s4'} style={{ padding: 12.5, paddingLeft: 22.75, paddingRight: 22.75 }}>
              <Paper className={'text-center'}>
                <h2 className={"overview-stats"}>620,431</h2>
                <p>{'24th Production'}</p>
              </Paper>
            </div>
            <div className={'col s4'} style={{ padding: 12.5, paddingLeft: 45.5, paddingRight: 0 }}>
              <Paper className={'text-center'}>
                <h2 className={"overview-stats"}>542,643</h2>
                <p>{'24th Retirement'}</p>
              </Paper>
            </div>
          </div>
          <div className={'row'}>
            <Table style={{marginBottom: 20}}
              data={[
              {   account: 'Owned',
                  balance: '45,237,891',
                  action:
                    <div>
                      <div onClick={() => this.props.setModalType('transfer')} className='btn modal-trigger' href='#modal1'>Transfer</div>
                      <div onClick={() => this.props.setModalType('retire')} className='btn modal-trigger secondary' href='#modal1'>Retire</div>
                    </div>
              },{ account: 'Transferred',
                  balance: '423,486',
                  action:
                    <div onClick={() => this.props.setModalType('transactions')} className='btn modal-trigger' href='#modal1'>View Transactions</div>
              },{ account: 'For Sale',
                  balance: '2,000,000',
                  action:
                    <div>
                      <div onClick={() => this.props.setModalType('sale')} className='btn modal-trigger' href='#modal1'>View For Sale CIFs</div>
                      <div onClick={() => this.props.setModalType('audit')} className='btn modal-trigger secondary' href='#modal1'>Audit</div>
                    </div>
              },{ account: 'Retired',
                  balance: '2,000,000',
                  action:
                    <div onClick={() => this.props.setModalType('retired')} className='btn modal-trigger' href='#modal1'>View Retired CIFS</div>
              }
            ]}>
              <Column
                colSpan={3}
                name={'Account'}
                render={(c: CIF) => <span style={{ fontSize: 24, fontWeight: 100 }}>{c.account}</span>}
              />
              <Column
                colSpan={3}
                name={'Balance'}
                render={(c: CIF) => <span style={{ fontSize: 24, fontWeight: 100 }}>{c.balance}</span>}
              />
              <Column
                colSpan={6}
                name={' '}
                render={(c: CIF) => c.action}
              />
            </Table>
          </div>
          <h3 className={'producer-header'}>{'Producers'}</h3>
            <div className={'row'}>
              <Table data={ producerData }>
                <Column
                  colSpan={1}
                  name={' '}
                  render={(c: ProducerItems) => {
                    return c.logo
                    // $FlowFixMe
                    ? <span><img style={{height: 50, verticalAlign: 'middle'}} src={require(`../../../../assets/${c.logo}.png`)}/></span>
                    : <span/>
                  }}
                  onClick={(c: ProducerItems) => router.push(`/buyer/marketplace/detail`)}
                />
                <Column
                  colSpan={2}
                  name={'Producer Name'}
                  render={(c: ProducerItems) => c.producerName}
                  onClick={(c: ProducerItems) => router.push(`/buyer/marketplace/detail`)}
                />
                <Column
                  colSpan={2}
                  name={'Available CIFs'}
                  render={(c: ProducerItems) => c.availableCIFs}
                  onClick={(c: ProducerItems) => router.push(`/buyer/marketplace/detail`)}
                />
                <Column
                  colSpan={2}
                  name={'Average Daily Production'}
                  render={(c: ProducerItems) => c.avgDailyProduction}
                  onClick={(c: ProducerItems) => router.push(`/buyer/marketplace/detail`)}
                />
                <Column
                  colSpan={2}
                  name={'CIF Efficiency %'}
                  render={(c: ProducerItems) => c.CIFEfficiency}
                  onClick={(c: ProducerItems) => router.push(`/buyer/marketplace/detail`)}
                />
                <Column
                  name={'Actions'}
                  render={(c: ProducerItems) => <i className="fa fa-ellipsis-h"></i>}
                  onClick={(c: ProducerItems) => router.push(`/buyer/marketplace/detail`)}
                />
              </Table>
              <Pagination />
            </div>
            <h5>{'CIF Acquisition'}</h5>
            <div className={'row'}>
              <Paper>
                <div className='cif-slider-header'>
                  <h5>{'Select CIF Amount to Acquire'}</h5>
                  <div className='btn right'>Select Tranche Size</div>
                </div>
                <CIFSlider />

                <p>
                  <input type="checkbox" className="filled-in checkbox-default" id="filled-in" />
                  <label htmlFor="filled-in">Gas Co.</label>
                  <input type="checkbox" className="filled-in checkbox-default" id="filled-in-box2" />
                  <label htmlFor="filled-in-box2">Carbon Creek</label>
                  <input type="checkbox" className="filled-in checkbox-default" id="filled-in-box3" />
                  <label htmlFor="filled-in-box3">Neste Oil</label>
                </p>

                <div className={'row'}>
                  <Table tbstyle={{'boxShadow': 'none'}} data={times(10, () => {
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

              </Paper>
            </div>

        </div>
      </div>
    );
  }
  filterRows(rows: any, filter: any) {
    let filteredRows = rows;
    const regexp = new RegExp(filter);
    filteredRows = rows.filter((row) => {
      return regexp.test(row.id);
    });
    return filteredRows;
  };
}

export default connect(undefined, {setModalType})(withRouter(Marketplace));

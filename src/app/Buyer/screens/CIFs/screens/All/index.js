import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import type { Location, LocationRouter, RouteConfig } from 'react-router';
import { setModalType } from 'modules/modal/actions';
import FinancialSummary from 'components/Charts/FinancialSummary';
import CIFRetirement from 'components/Charts/CIFRetirement';
import $ from 'jquery';
import styles from './styles.less';
import { Paper } from 'components/Paper';
import { Modal } from 'components/Modal';
import { Table, Column } from 'components/Table';
import { random, values, startCase, times } from 'lodash';
import { statusColor } from 'utils/formatter';

type CIFsProps = {
  router: LocationRouter,
  location: Location
};

type CIF = {
  status: string,
  producer: string,
  owner: string,
  standardBody: string,
  creationDate: string,
  trancheSize: string
}

export class CIFs extends React.Component {
  props: CIFsProps;

  componentDidMount() {
    $('.modal-trigger').leanModal({
      closeIcon: true
    });
  }

  render () {
    const {
      router, location
    } = this.props;

    return (
      <div className={styles.Production}>
        <div className='content-container'>
          <h3 className={'producer-header'}>{'CIF Accounting'}</h3>
          <h5>{'Account Summary'}</h5>
          <div className={'row'}>
            <div className={'col s4'} style={{ padding: 4, paddingLeft: 0, paddingRight: 45.5 }}>
              <Paper className={'text-center'}>
                <h2 className={"overview-stats"}>30,000,000</h2>
                <p>{'Total CIFs Produced'}</p>
              </Paper>
            </div>
            <div className={'col s4'} style={{ padding: 4, paddingLeft: 22.75, paddingRight: 22.75 }}>
              <Paper className={'text-center'}>
                <h2 className={"overview-stats"}>25,000,000</h2>
                <p>{'Total CIFs Owned'}</p>
              </Paper>
            </div>
            <div className={'col s4'} style={{ padding: 4, paddingLeft: 45.5, paddingRight: 0 }}>
              <Paper className={'text-center'}>
                <h2 className={"overview-stats"}>6,500,000</h2>
                <p>{'Total CIFs in Market'}</p>
              </Paper>
            </div>
            <div className={'col s4'} style={{ padding: 4, paddingLeft: 0, paddingRight: 45.5 }}>
              <Paper className={'text-center'}>
                <h2 className={"overview-stats"}>5,000,000</h2>
                <p>{'Total CIFs Transferred'}</p>
              </Paper>
            </div>
             <div className={'col s4'} style={{ padding: 4, paddingLeft: 22.75, paddingRight: 22.75 }}>
              <Paper className={'text-center'}>
                <h2 className={"overview-stats"}>3,000,000</h2>
                <p>{'Total CIFs Retired'}</p>
              </Paper>
            </div>
            <div className={'col s4'} style={{ padding: 4, paddingRight: 0 }}/>
          </div>

          <h5>{'CIF Management'}</h5>
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
                name={'Status'}
                render={(c: CIF) => <span style={{ color: statusColor(c.status) }}>{startCase(c.status)}</span>}
                onClick={(c: CIF) => router.push(`/buyer/cifs/detail`)}
              />
              <Column
                name={'Producer'}
                render={(c: CIF) => c.producer}
                onClick={(c: CIF) => router.push(`/buyer/cifs/detail`)}
              />
              <Column
                name={'Ownership'}
                render={(c: CIF) => c.owner}
                onClick={(c: CIF) => router.push(`/buyer/cifs/detail`)}
              />
              <Column
                colSpan={2}
                name={'Standard Body'}
                render={(c: CIF) => c.standardBody}
                onClick={(c: CIF) => router.push(`/buyer/cifs/detail`)}
              />
              <Column
                name={'Creation Date'}
                render={(c: CIF) => c.creationDate}
                onClick={(c: CIF) => router.push(`/buyer/cifs/detail`)}
              />
              <Column
                name={'Tranche Size'}
                render={(c: CIF) => c.trancheSize}
                onClick={(c: CIF) => router.push(`/buyer/cifs/detail`)}
              />
              <Column
                name={'Actions'}
                render={(c: CIF) => <i className="fa fa-ellipsis-h"></i>}
                onClick={(c: CIF) => router.push(`/buyer/cifs/detail`)}
              />
            </Table>
          </div>
          <h5 style={{marginTop: 50}}>{'CIF Purchases By Type'}</h5>
          <div className={'row'}>
            <Paper>
              <FinancialSummary />
            </Paper>
          </div>

          <h5>{'CIF Retirement'}</h5>
          <div className={'row'}>
            <Paper>
              <CIFRetirement />
            </Paper>
          </div>

        </div>
      </div>
    );
  }
}

export default connect(undefined, {setModalType} )(withRouter(CIFs));

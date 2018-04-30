import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import type { LocationRouter } from 'react-router';
import type { ActionCreator } from 'redux';
import type { CIF } from 'modules/cifs/definitions';
import { map, orderBy, filter, startCase } from 'lodash';

import $ from 'jquery';
import { listCIFs } from 'modules/cifs/actions';
import { setModalType } from 'modules/modal/actions';

import { TransactionCard, TransactionFilter } from 'components/Transaction';
import { Tabs } from 'components/Tabs';
import CIFSlider from 'components/CIFSlider';
import { Paper } from 'components/Paper';
import { Table, Column } from 'components/Table';
import { statusColor } from 'utils/formatter';
import styles from './styles.less';

type CIFsProps = {
  router: LocationRouter,
  listCIFs: ActionCreator<*>,
  cifs: Array<CIF>
};

export class CIFs extends React.Component {
  props: CIFsProps;

  constructor(props: CIFProps) {
    super(props);
  }

  state = {
    filterProperty: 'cifs',
    transactionFilter: null
  }

  componentWillMount(){
    this.props.listCIFs();
  }

  componentDidMount() {
    setTimeout(() => {
      $('.modal-trigger').leanModal({closeIcon: true});
      $('ul.tabs').tabs();
    },
     500);
  }

  setFilter(filter) {
    this.setState({transactionFilter: filter})
  }

  render () {
    const { router, cifs } = this.props;
    const { filterProperty, transactionFilter } = this.state;
    const ellipsis = '.....................................................................................................................................................................................................................';
    const transactionData = [{
      id: '12345678',
      type: 'CIF Issuance',
      partyA: [
      { name: 'Xpansiv',
        action: 'issues',
        value: 20000
      }],
      partyB: {
        name: 'Energy',
        action: 'receives',
        value: 20000
      }
    }, {
      id: '12345678',
      type: 'CIF Issuance',
      partyA: [
      { name: 'Xpansiv',
        action: 'issues',
        value: 20000
      }],
      partyB: {
        name: 'Energy',
        action: 'receives',
        value: 20000
      }
    }, {
      id: '12345678',
      type: 'Transfers',
      partyA: [
      { name: 'East Gas',
        action: 'transfers',
        value: -20000
      }],
      partyB: { name: 'Energy',
        action: 'receives',
        value: 20000
      }
    }, {
      id: '12345678',
      type: 'Retirement',
      partyA: [
      { name: 'Energy',
        action: 'retirement',
        value: -20000
      }]
    }, {
      id: '12345678',
      type: 'Transfers',
      partyA: [
      { name: 'Xpansiv',
        action: 'transfers',
        value: -20000
      }, { name: 'Gas Co',
        action: 'transfers',
        value: -20000
      }, { name: 'East Gas',
        action: 'transfers',
        value: -20000
      }],
      partyB: { name: 'Energy',
        action: 'receives',
        value: 20000
      }
    }];

    const filters = [
      {value: '200', title: 'all', onClick: () => this.setFilter(null)},
      {value: '120', title: 'CIF Issuance', onClick: () => this.setFilter('CIF Issuance')},
      {value: '90', title: 'Transfers', onClick: () => this.setFilter('Transfers')},
      {value: '10', title: 'Retirement', onClick: () => this.setFilter('Retirement')}
    ];

    return (
      <div className={styles.CIFsAll}>
        <div className='content-container'>
          <h3 className='cifs-header'>{'CIF Account'}</h3>
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

          <div className={'row'}>
            <Paper>
              <div className='cif-slider-header'>
                <h5>{'Select CIF Amount to Manage'}</h5>
                <div className='right' style={{fontSize: 48, fontWeight: 100}}>{(30000000).toLocaleString()}</div>
              </div>
              <CIFSlider />
              <div onClick={() => this.props.setModalType('transfer')} className={'btn modal-trigger'} href='#modal1'>Transfer</div>
              <div onClick={() => this.props.setModalType('submit')} className={'btn modal-trigger'} href='#modal1'>Submit to Market</div>
              <div onClick={() => this.props.setModalType('retire')} className={'btn modal-trigger'} href='#modal1'>Retire</div>

            </Paper>
          </div>
          <div style={{width: 450}}>
            <Tabs tabs={[
              {label: 'CIFs', action: () => this.setState({filterProperty: 'cifs'})},
              {label: 'Transactions', action: () => this.setState({filterProperty: 'transactions'})}]}/>
          </div>
          {filterProperty === 'cifs'
          ?
            <Table data={orderBy(cifs, ['status', 'creationDate'])}>
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
          : <div>
              <h5>Transactions</h5>
              <div style={{display: 'flex'}}>
                <div style={{width: '30%'}}>
                  <TransactionFilter filters={filters} />
                </div>
                <div style={{width: '70%', marginTop: 15}}>
                  { map(transactionFilter === null ? transactionData : filter(transactionData, {type: transactionFilter}), (transaction, i) =>
                    <TransactionCard active={transactionFilter === transaction.type} key={`transaction-${i}`} {...transaction} />
                  )}
                </div>
              </div>
            </div>
          }
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

export default connect(mapStateToProps, {listCIFs, setModalType} )(withRouter(CIFs));

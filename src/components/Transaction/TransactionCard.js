// @flow
import React from 'react';
import styles from './styles.less';
import { Paper } from 'components/Paper';
import { transactionValue } from 'utils/formatter';

type TransactionCardProps = {
  id: string,
  type: string,
  partyA: Array<party>,
  partyB?: party,
  balance: number
}

type party = {
  name: string,
  action: string,
  value: number
}

export const TransactionCard = ({id, type, partyA, partyB, balance}: TransactionCardProps) => (
  <div className={styles.TransactionCard}>
    <div className="transactionCardHeader">
      <div className="transactionId">{`Transaction # ${id}...............................................................................................................................................`}</div>
      <div className="transactionLink">{'view'}</div>
    </div>
    <div className="transactionBody">
      <div className='partyA'>
        <div className="partyStepperContainer">
          <div className={'party'} data-value={partyA[0].action === 'issues' ? 0 : Math.sign(partyA[0].value)}>
            <span className={'center'}>A</span>
          </div>
          { partyB !== undefined ? <div className={'stepperLine'}/> : null }
        </div>

        <div className={'lineItemContainer'}>
          {partyA.map((party, i) =>
            <div key={`party-${i}`}>
              <div className={'name'}>{party.name}</div>
              <span className={'action'}>{party.action} - </span>
              <span className={'value'} data-value={party.action === 'issues' ? 0 : Math.sign(party.value)}>{transactionValue(party.value)}</span>
            </div>
          )}
        </div>
      </div>
      { partyB !== undefined
      ? <div className='partyB'>
          <div className="partyStepperContainer">
            <div className={'party'} data-value={partyB.action === 'issues' ? 0 : Math.sign(partyB.value)}>
              <span className={'center'}>B</span>
            </div>
          </div>
          <div className={'lineItemContainer'}>
            <div>
              <div className={'name'}>{partyB.name}</div>
              <span className={'action'}>{partyB.action} - </span>
              <span className={'value'} data-value={partyB.action === 'issues' ? 0 : Math.sign(partyB.value)}>{transactionValue(partyB.value)}</span>
            </div>
          </div>
        </div>
      : null }
    </div>
    <div className='transactionBalance'>
      <div className='balance'>Balance</div>
      <div className='balanceValue'>{transactionValue(partyA[0].value)}</div>
    </div>
  </div>
);

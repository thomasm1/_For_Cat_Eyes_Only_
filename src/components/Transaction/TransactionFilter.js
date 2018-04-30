// @flow
import React from 'react';
import styles from './styles.less';
import { Paper } from 'components/Paper';
import { startCase } from 'lodash';

type FilterRowProps = {
	active: boolean,
	value: number,
	title: string,
	onClick: () => any
}

type FilterProps = {
	filters: Array<FilterRowProps>
}

export const TransactionFilter = ({filters}: FilterProps) => (
	<Paper className={styles.TransactionFilter}>
		{filters.map((filter, i ) =>
			<FilterRow {...filter} key={`filter-${i}`} />
		)}
	</Paper>
);

const FilterRow = ({active, value, title, onClick}: FilterRowProps) => (
	<div className={styles.TransactionFilterRow} onClick={onClick.bind(this)}>
		<div className={'title'}>{startCase(title)}</div>
		<div className={'value'}>{value}</div>
	</div>
);

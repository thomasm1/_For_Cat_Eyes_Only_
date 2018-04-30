// @flow
import React from 'react';
import styles from './styles.less';

type TabsProps = {
  tabs?: Array<tab>
}

type tab = {
  label: string,
  action?: () => any
}

export const Tabs = ({tabs = [{label: 'Full History'}, {label: 'Last 30 Days'}, {label: 'Upcoming'}]}: TabsProps) => (
  <div className={styles.Tabs}>
    <div className="col s7">
      <ul className="tabs">
        {tabs.map((tab, i) =>
          <li
            key={`tab-${i}`}
            className={`tab col s${12/tabs.length}`}
            onClick={tab.action ? tab.action.bind(this) : null}>
            <a href="#">{tab.label}</a>
          </li>
        )}
      </ul>
    </div>
  </div>
);

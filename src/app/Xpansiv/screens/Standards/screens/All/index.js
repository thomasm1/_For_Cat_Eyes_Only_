// @flow
import React, { Children } from 'react';

import { connect } from 'react-redux';
import type { ActionCreator } from 'redux';
import Pagination from 'components/Pagination';
import styles from './styles.less';
import type { Location, LocationRouter } from 'react-router';
import { Table, Column } from 'components/Table';
import { random, times } from 'lodash';
import { startCase } from 'lodash';
import { statusColor } from 'utils/formatter';
import { withRouter } from 'react-router';

type StandardProps = {
  router: LocationRouter,
  location: Location
};

type StandardItems = {
  id: string,
  commodityType: string,
  attr: string,
  stdName: string,
  stdBody: string,
  action: string
}

export class Standards extends React.Component {
  props: StandardProps;

  render () {
    const {
      router, location
    } = this.props;

    const standardData = [{
      id: '12345643',
      commodityType: "Carbon",
      attr: "Natural Gas",
      stdName: 'Natural Gas 123',
      stdBody: 'American Carbon Registry',
      action: ''
    },
    {
      id: '12345643',
      commodityType: "Water",
      attr: "Petroleum",
      stdName: 'Petroleum 15432',
      stdBody: 'American Carbon Registry',
      action: ''
    },
    {
      id: '12345643',
      commodityType: "Water",
      attr: "Carbon",
      stdName: 'Natural Gas 15436',
      stdBody: 'American Carbon Registry',
      action: ''
    }].concat(times(7, () => {
      return {
        id: '12345643',
        commodityType: "Toxics",
        attr: "Petroleum",
        stdName: 'Petroleum 563',
        stdBody: 'American Carbon Registry',
        action: ''
      }
    }));

    return (
      <div className={styles.Standards}>
        <div className='content-container'>
          <h3 className={'producer-header'}>{'Standards'}</h3>
          <div className={'row'}>
            <Table data={ standardData }>
              <Column
                colSpan={2}
                name={'Standards ID'}
                render={(c: StandardItems) => <span style={{ color: statusColor(c.id), fontWeight: 500 }}>{startCase(c.id)}</span>}
                onClick={(c: StandardItems) => router.push(`/xpansiv/standards/detail`)}
              />
              <Column
                colSpan={2}
                name={'Commodity Type'}
                render={(c: StandardItems) => c.commodityType}
                onClick={(c: StandardItems) => router.push(`/xpansiv/standards/detail`)}
              />
              <Column
                colSpan={2}
                name={'Attribute'}
                render={(c: StandardItems) => c.attr}
                onClick={(c: StandardItems) => router.push(`/xpansiv/standards/detail`)}
              />
              <Column
                colSpan={2}
                name={'Standards Name'}
                render={(c: StandardItems) => c.stdName}
                onClick={(c: StandardItems) => router.push(`/xpansiv/standards/detail`)}
              />
              <Column
                colSpan={2}
                name={'Standards Body'}
                render={(c: StandardItems) => c.stdBody}
                onClick={(c: StandardItems) => router.push(`/xpansiv/standards/detail`)}
              />
              <Column
                name={'Actions'}
                render={(c: StandardItems) => <i className="fa fa-ellipsis-h"></i>}
                onClick={(c: StandardItems) => router.push(`/xpansiv/standards/detail`)}
              />
            </Table>
          </div>
        <Pagination />
        </div>
      </div>
    );
  }
}

export default connect(undefined, {} )(withRouter(Standards));

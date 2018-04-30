import * as React from 'react';
import styles from './styles.less'

export default class SearchInput extends React.Component {

  render() {
    return (
      <div className={'SearchInputContainer'}>
        <input value={this.props.value} placeholder={'Search Wells'} className={'SearchInput'} onChange={this.props.onChange} />
        <i className={'fa fa-search SearchInputIcon'}></i>
      </div>
    );
  }
}
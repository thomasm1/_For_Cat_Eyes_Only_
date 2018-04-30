import React from 'react';
import styles from './styles.less'

export default class Pagination extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      paginationIndex: 0,
      paginationLimit: 5,
      // this should be a prop
      paginationList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
    };
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
  }

  render() {
    const paginationShown = this.state.paginationList.slice(
      this.state.paginationIndex, this.state.paginationIndex + this.state.paginationLimit
    );

    return (
      <div className={styles.Pagination}>
        <div className={'first'}>First</div>
        <div className={'pageNumberContainer'}>
          <div className={'arrowLeft'} onClick={this.decrement}>
            <i className="material-icons" style={{fill: '#129FEA'}}>chevron_left</i>
          </div>
          {
            paginationShown.map((count, i) => (
              <div key={i} className={'pageNumber'}>{count}</div>
            ))
          }
          <div className={'arrowRight'} onClick={this.increment}>
            <i className="material-icons" style={{fill: '#129FEA'}}>chevron_right</i>
          </div>
        </div>
        <div className={'last'}>Last</div>
      </div>
    );
  }

  increment() {
    const limit = this.state.paginationList.length - this.state.paginationLimit;
    if (this.state.paginationIndex < limit) {
      this.setState({
        paginationIndex: this.state.paginationIndex + 1
      });
    }
  }

  decrement() {
    const limit = 0;
    if (this.state.paginationIndex > limit) {
      this.setState({
        paginationIndex: this.state.paginationIndex - 1
      });
    }
  }
}
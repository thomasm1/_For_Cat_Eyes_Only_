// @flow
import React from 'react';
import styles from './styles.less';

import { map } from 'lodash';

export class Stepper extends React.Component {
  props: {
    steps: Array<{
      title: string|React$Element<*>,
      body: string|React$Element<*>
    }>,
    currentStep: number,
    hoverable?: boolean
  };
  key = `${Date.now()}.${Math.random()}`
  render () {
    const { currentStep, steps, hoverable } = this.props;
    return <div className={`${styles.Stepper}`}>
      <ul>
        {steps.map(
          (step, index) => <li key={`${this.key}.${index}`} className={`${hoverable ? 'selectable' : ''} ${currentStep === index ? 'active' : ''} ${currentStep > index ? 'completed' : ''}`}>
            <div className={'step-num'}>{currentStep > index ? <i className="material-icons">done</i>: index + 1}</div>
            <div className={'step-title'}>{step.title}</div>
          </li>)}
      </ul>
      <div className={'step-content'}>{steps[currentStep].body}</div>
    </div>
  }
}
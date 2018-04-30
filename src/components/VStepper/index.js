// @flow
import React from 'react';
import styles from './styles.less';

import { map } from 'lodash';

export class VStepper extends React.Component {
  props: {
    steps: Array<{
      title: string|React$Element<*>,
      body: string|React$Element<*>,
      footer?: string|React$Element<*>
    }>,
    currentStep: number,
    nonLinear?: boolean,
    hoverable?: boolean,
    onStepSelect?: Function
  };
  key: string;
  componentWillMount() {
    this.key = `${Date.now()}.${Math.random()}`;
  }
  render () {
    const { currentStep, steps, nonLinear, hoverable, onStepSelect } = this.props;
    return <div className={`${styles.Stepper}`}>
      <ul>
        {steps.map(
          (step, index) => 
            <li className={`${hoverable ? 'selectable' : ''} ${currentStep === index ? 'active' : ''} ${currentStep > index ? 'completed' : ''} ${((nonLinear && index !== currentStep) || (index < currentStep)) ? 'non-linear' : ''}`}
                onClick={() => (currentStep !== index) && (nonLinear || (index < currentStep)) && onStepSelect && onStepSelect(index)}
                key={`${this.key}.${index}`}>
              <div className={'step-num'}>{currentStep > index ? <i className="material-icons">done</i>: index + 1}</div>
              <div className={'step-title'}>{step.title}</div>
              {currentStep === index && <div className={'step-content'}>
                {steps[currentStep].body}
                <hr/>
                {steps[currentStep].footer}
              </div>}
            </li>)}
      </ul>
    </div>
  }
}

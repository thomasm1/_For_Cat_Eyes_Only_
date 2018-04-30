import React from 'react';
const Highcharts = require('highcharts');
const ReactHighcharts = require('react-highcharts');
require('highcharts-release/highcharts-more')(ReactHighcharts.Highcharts);
import { times, random } from 'lodash';

export default class Chart extends React.Component{

  render() {
    const sample = () => {
      return times(15, () => {
        return { x: Date.UTC(2016, random(1,11), random(1,28)), y: random(200, 2000), z: random(40, 175)}
      });
    };

    const config = {
      legend: {
        layout: 'horizontal',
        align: 'right',
        verticalAlign: 'top',
        borderWidth: 0,
        backgroundColor:  '#FFFFFF'
      },
      title: { text: null },
      xAxis: {
        gridLineWidth: 1,
        gridLineDashStyle: 'shortdash',
        gridLineColor: '#F3F3F3',
        categories: [
          ' ', '01:00', '02:00',
          '03:00', '04:00', '05:00',
          '06:00', '07:00', '08:00',
          '09:00', '10:00', '11:00',
          '12:00', '13:00', '14:00',
          '15:00', '16:00', '17:00',
          '18:00', '19:00', '20:00',
          '21:00', '22:00', '23:00']
      },
      yAxis: {
        startOnTick: false,
        endOnTick: false,
        title: { text: null },
        maxPadding: 0.2
      },
      credits: { enabled: false },
      tooltip: {
        headerFormat: '',
        pointFormat: '{series.name}: {point.y} CIFs',
      },
      plotOptions: {
        line: {
          marker: {
            enabled: false
          }
        }
      },
      series: [{
        name: 'Encanta',
        data: [87, 95, 85, 92.5, 84.2, 94.5, 92.5, 90.5, 87.5, 86.5, 87.5, 90.5, 95.5, 89, 99, 97, 88, 86, 83, 84, 85, 93, 95, 96],
        color: '#74D9A3',
        shadow: {color: '#74D9A3', width: '13', opacity: '0.05'}
      }, {
        name: 'Carbon Creek',
        data: [91, 94, 90, 93, 95, 93.5, 90.5, 95.5, 90, 92.5, 84.5, 90.5, 88.5, 92, 91, 96, 84, 96, 92, 82, 86, 90, 94, 95],
        color: '#4C8FBF',
        shadow: {color: '#4C8FBF', width: '13', opacity: '0.05'}
      }, {
        name: 'Statoil',
        data: [84, 92, 96, 89.5, 90.2, 92.5, 90.5, 97.5, 82.5, 95.5, 93.5, 84.5, 98.5, 90, 93, 89, 87, 93, 90, 94, 84, 85, 90, 92],
        color: '#9D82E6',
        shadow: {color: '#9D82E6', width: '13', opacity: '0.05'}
      }, {
        name: 'Gas Co',
        data: [92, 100, 91, 98.5, 89.2, 82.5, 60.5, 70.5, 73.5, 70, 70.2, 63, 70, 33, 34, 27, 78, 86, 94, 91, 73, 91, 82, 88],
        color: '#E6C041',
        shadow: {color: '#E6C041', width: '13', opacity: '0.05'}
      },]
    }
    return <ReactHighcharts config = {config}></ReactHighcharts>;
  }
}

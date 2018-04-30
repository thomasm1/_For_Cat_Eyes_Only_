import React from 'react';
const Highcharts = require('highcharts');
const ReactHighcharts = require('react-highcharts');
require('highcharts-release/highcharts-more')(ReactHighcharts.Highcharts);
import { times, random } from 'lodash';

export default class Chart extends React.Component{
  render() {
    const config = {
      chart: { type: 'column' },
      plotOptions: {
        series: {
          pointWidth: 47
        },
        column: {
          pointPadding: 0,
          borderWidth: 0,
          groupPadding: 0,
          stacking: 'normal'
        }
      },
      legend: { enabled: false },
      title: { text: null },
      xAxis: {
        gridLineWidth: 1,
        gridLineDashStyle: 'shortdash',
        gridLineColor: '#F3F3F3',
        categories: [
          '', '01:00', '02:00',
          '03:00', '04:00', '05:00',
          '06:00', '07:00', '08:00',
          '09:00', '10:00', '11:00',
          '12:00', '13:00', '14:00',
          '15:00', '16:00', '17:00',
          '18:00', '19:00', '20:00',
          '21:00', '22:00', '23:00',
        ],
          crosshair: true
      },
      yAxis: {
        startOnTick: false,
        endOnTick: false,
        title: { text: null },
        maxPadding: 0.2
      },
      credits: { enabled: false },
      tooltip: {
          pointFormat: '{point.x: %m/%d}: {point.y} units at ${point.z}',
      },
      series: [{
          name: 'John',
          color: '#E6C041',
          data: [250, 190, 230, 160, 330, 240, 280, 330, 220, 270, 230, 170, 330, 210, 230, 430, 230, 280, 230, 230, 200, 130, 190]
        }, {
          name: 'John',
          color: '#9D82E6',
          data: [300, 320, 320, 320, 250, 260, 230, 220, 230, 240, 220, 320, 260, 520, 320, 220, 320, 310, 420, 220, 270, 220, 204]
        }, {
          name: 'Jane',
          color: '#4C8FBF',
          data: [600, 600, 600, 300, 600, 600, 300, 600, 600, 400, 700, 800, 300, 400, 200, 550, 503, 430, 500, 300, 100, 200, 200]
        }, {
          name: 'Joe',
          color: '#74D9A3',
          data: [1200, 900, 700, 900, 700, 500, 890, 910, 900, 840, 860, 900, 870, 830, 900, 930, 1000, 1200, 800, 860,920, 920, 860]
        }]
    }
    return <ReactHighcharts config = {config}></ReactHighcharts>;
  }
}

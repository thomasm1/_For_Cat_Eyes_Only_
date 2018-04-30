import React from 'react';
const Highcharts = require('highcharts');
const ReactHighcharts = require('react-highcharts');
require('highcharts-release/highcharts-more')(ReactHighcharts.Highcharts);
import { times, random } from 'lodash';

export default class Chart extends React.Component{

  render() {
    const sample = () => {
      return times(15, () => {
        return { x: Date.UTC(2016, 0, 0, random(1,23)), y: random(200, 1000), z: random(40, 175)}
      });
    };

    const config = {
      chart: {
        type: 'bubble',
        plotBorderWidth: 1,
        zoomType: 'xy'
      },
      legend: {
        enabled: false
      },
      title: { text: null },
      xAxis: {
        title: { text: null },
        type: 'datetime',
        tickInterval: 24 * 3600 * 50
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
      series: [ {
        name: 'Well 1',
        color: 'rgba(157, 130, 230, 0)',
        pointStart: Date.UTC(2016, 1, 0),
        data: sample()
        },{
        name: 'Well 2',
        color: 'rgba(230, 192, 65, 0)',
        pointStart: Date.UTC(2016, 1, 0),
        data: sample()
        },{
        name: 'Well 3',
        color: 'rgba(116, 217, 163, 0)',
        pointStart: Date.UTC(2016, 1, 0),
        data: sample()
        },{
        name: 'Well 4',
        color: 'rgba(76, 143, 191, 0)',
        pointStart: Date.UTC(2016, 1, 0),
        data: sample()
        }
      ]
    }
    return <ReactHighcharts config = {config}></ReactHighcharts>;
  }
}

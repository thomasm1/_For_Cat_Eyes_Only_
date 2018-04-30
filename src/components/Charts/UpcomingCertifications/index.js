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
      chart: {
        type: 'bubble',
        plotBorderWidth: 1,
        zoomType: 'xy'
      },
      legend: {
        layout: 'horizontal',
        align: 'right',
        verticalAlign: 'top',
        borderWidth: 0,
        backgroundColor:  '#FFFFFF'
      },
      title: { text: null },
      xAxis: {
        title: { text: null },
        type: 'datetime',
        labels: { format: '{value:%m/%d}'},
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
        color: '#A78DE9',
        pointStart: Date.UTC(2016, 1, 0),
        pointInterval: 24 * 3600 * 1000 * 15,
        data: sample()
        },{
        name: 'Well 2',
        color: '#E9C84A',
        pointStart: Date.UTC(2016, 1, 0),
        pointInterval: 24 * 3600 * 1000 * 15,
        data: sample()
        },{
        name: 'Well 3',
        color: '#7FDEAD',
        pointStart: Date.UTC(2016, 1, 0),
        pointInterval: 24 * 3600 * 1000 * 15,
        data: sample()
        },{
        name: 'Well 4',
        color: '#569AC6',
        pointStart: Date.UTC(2016, 1, 0),
        pointInterval: 24 * 3600 * 1000 * 15,
        data: sample()
        }
      ]
    }
    return <ReactHighcharts config = {config}></ReactHighcharts>;
  }
}

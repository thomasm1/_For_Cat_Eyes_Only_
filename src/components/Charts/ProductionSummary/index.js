import React from 'react';
const Highcharts = require('highcharts');
const ReactHighcharts = require('react-highcharts');

export default class Chart extends React.Component{

  render() {
    const config = {
    chart: {
      type: 'bar'
    },
    title: {
      text: null
    },
    xAxis: {
      labels: { enabled: false },
      gridLineWidth: 0,
      title: { text: null }
    },
    yAxis: {
      gridLineWidth: 1,
      gridLineDashStyle: 'shortdash',
      gridLineColor: '#F3F3F3',
      min: 0,
      tickInterval: 1,
      tickmarkPlacement: 'on',
      title: { text: null },
      labels: { overflow: 'justify' }
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: true
        }
      }
    },
    legend: {
      layout: 'horizontal',
      align: 'right',
      verticalAlign: 'top',
      borderWidth: 0,
      backgroundColor:  '#FFFFFF'
    },
    credits: {
      enabled: false
    },
    series: [{
        name: 'Tank Volume',
        color: '#7FDEAD',
        data: [16.8]
      }, {
        name: 'Recirculation',
        color: '#569AC6',
        data: [14.2]
      }, {
        name: 'Final Meter Run',
        color: '#A78DE9',
        data: [22]
      }, {
        name: 'Vapor Recirculation',
        color: '#E9C84A',
        data: [18.1]
      },
    ]
    };
    return <ReactHighcharts config={config}></ReactHighcharts>;
  }
}

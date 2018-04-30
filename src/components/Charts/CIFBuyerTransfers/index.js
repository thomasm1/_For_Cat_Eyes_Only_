import React from 'react';
const Highcharts = require('highcharts');
const ReactHighcharts = require('react-highcharts');

export default class Chart extends React.Component{

    render() {
      const config = {
        plotOptions: {
          series: {
              pointPadding: 0,
              groupPadding: 0.1,
              marker: { fillColor: '#569AC6'}
          }
        },
        credits: { enabled: false },
        title: { text: false },
        legend: { enabled: false },
        yAxis: {
          tickInterval: 300,
          gridLineDashStyle: 'shortdash',
          title: { enabled: false },
          gridLineColor: '#F3F3F3',
        },
          xAxis: {
            tickInterval: 1,
            tickmarkPlacement: 'on',
            gridLineWidth: 1,
            gridLineDashStyle: 'shortdash',
            gridLineColor: '#F3F3F3',
            categories: [
              '', '01:00', '02:00',
              '03:00', '04:00', '05:00',
              '06:00', '07:00', '08:00',
              '09:00', '10:00'
            ]
          },
          series: [
            {
              type: 'column',
              color: '#569AC6',
              data: [
                2100, 1950, 1510,
                1350, 340, 610,
                1050, 1350, 1525,
                1700, 1510
              ]
            }
          ]
        };

        return <ReactHighcharts config={config}></ReactHighcharts>;
      }
}

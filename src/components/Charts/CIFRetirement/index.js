import React from 'react';
const Highcharts = require('highcharts');
const ReactHighcharts = require('react-highcharts');

export default class Chart extends React.Component{

    render() {
      const config = {
        plotOptions: {
          line: {
            marker: {
              enabled: false
            }
          },
          series: {
              pointPadding: 0,
              groupPadding: 0.1,
              marker: { fillColor: 'purple'}
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
              '09:00', '10:00', '11:00',
              '12:00', '13:00', '14:00',
              '15:00', '16:00', '17:00',
              '18:00', '19:00', '20:00',
              '21:00', '22:00', '23:00',
            ]
          },
          series: [
            {
              type: 'column',
              color: '#A78EE6',
              data: [
                2150, 2150, 1900,
                1850, 1600, 1400,
                1200, 1500, 1400,
                400, 500, 600,
                1100, 1050, 1200,
                1400, 1350, 1700,
                1750, 1700, 1750,
                1400, 1810, 1900
              ]
            }
          ]
        };

        return <ReactHighcharts config={config}></ReactHighcharts>;
      }
}

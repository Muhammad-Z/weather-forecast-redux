import React from 'react';
import { useSelector } from 'react-redux';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ChartDataLabels
);

import chartGlobalOptions from './chartGlobalOptions.jsx';


export default function WindChart({selectedDay}) {
  const forecast = useSelector((state) => state.fiveDays.value);
  const globeOptions = chartGlobalOptions(forecast[selectedDay].wind);

  var style = getComputedStyle(document.getElementById('root'));
  var labelColor = (style.getPropertyValue('--main-font-color'));
  var pointBgColor = (style.getPropertyValue('--box-bg-color'));

  return (<div className="box">
    <h2>Wind (Km/h)</h2>
    <Line options={{
      ...globeOptions,
      parsing: {
        yAxisKey: 'speed',
        xAxisKey: 'time',
      },

      plugins: {
        datalabels: {
          color: globeOptions.plugins.datalabels.color,
          anchor: 'end',
          align: 'top',
          display: false,

          labels: {
            font: {
              weight: 'bold'
            },
            value: {
              display: true,
              /*   color: 'black', */
              formatter: (value, ctx) => { return value.speed },
            },
            pointLabel: {
              display: true,
              anchor: 'center',
              align: 'center',
              color: labelColor,
              font: {
                family: 'weathericons',
                weight: 'bold',
                size: 20,
              },
              formatter: function (value, ctx) {
                switch (value.direction) {
                  case 0: case 360: return '';
                  case 90: return '';
                  case 180: return '';
                  case 270: return '';
                  default: {
                    if (value.direction < 90) return '';
                    if (value.direction < 180) return '';
                    if (value.direction < 270) return '';
                    if (value.direction < 360) return '';
                  }
                }
              }
            }
          }
        }
      }
    }} data={{
      labels: forecast[selectedDay].time,
      datasets: [
        {
          label: 'Dataset 1',
          data: forecast[selectedDay].wind.list.map(
            (elem, index) => ({ speed: elem.speed, direction: elem.direction, time: forecast[selectedDay].time[index] })),
          /*      borderColor: 'blue', */
          pointRadius: 10,
          pointHoverRadius: 10,
          pointBackgroundColor: pointBgColor,
         /*  pointBackgroundColor: 'white', */
        },
      ],
    }} /></div>);
}
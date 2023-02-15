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
import chartGlobalOptions from './chartGlobalOptions.jsx';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ChartDataLabels
);


export default function HumadityChart({selectedDay}) {
  const forecast = useSelector((state) => state.fiveDays.value);
  const globeOptions = chartGlobalOptions(forecast[selectedDay].humidity);

  var style = getComputedStyle(document.getElementById('root'));
  var labelColor = (style.getPropertyValue('--main-font-color'));

  return (<div className="box">
    <h2>Humidity (%)</h2>
    <Line options={{
      ...globeOptions,
      plugins: {
        datalabels: {
          anchor: 'end',
          align: 'top',
          labels: {
            formatter: Math.round,
            font: {
              weight: 'bold'
            },
            value: {
              color: labelColor,
            }
          }
        }
      }
    }} data={{
      labels: forecast[selectedDay].time,
      datasets: [
        {
          label: 'Dataset 1',
          data: forecast[selectedDay].humidity.list,
          tension: 0.5
        },
      ],
    }} /></div>);
}
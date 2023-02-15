import React from 'react';
import { useSelector } from 'react-redux';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import chartGlobalOptions from './chartGlobalOptions';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
);


export default function RainChart({ selectedDay }) {
  const forecast = useSelector((state) => state.fiveDays.value);
  if (forecast[selectedDay].rain.list.some(elem => elem !== 0)) {
    const globeOptions = chartGlobalOptions(forecast[selectedDay].rain);
    console.log('rainy? ', forecast[selectedDay].rain.list)


    return (<div className="box">
      <h2>Rain (mm)</h2> <Bar options={{ ...globeOptions }} data={{
        labels: forecast[selectedDay].time,
        datasets: [
          {
            label: 'Dataset 1',
            data: forecast[selectedDay].rain.list,
            backgroundColor: '#4491FF',
          }
        ]
      }} /></div>);
  }
  else return (<div className="box rain-container"><h2>Rain</h2>No Rain</div>)
}
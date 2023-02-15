import { useState } from "react";

export default function chartGlobalOptions(arg) {

  var style = getComputedStyle(document.getElementById('root'));
  var labelColor = (style.getPropertyValue('--main-font-color'));

  return (
    {
      pointBackgroundColor: '#fff',
      borderColor: '#4491FF',
      fontColor: 'red',
      plugins: {
        datalabels: {
          color: labelColor,
        },
      },
      responsive: true,
      scales: {
        x: {
          grid: {
            display: false
          },
          ticks: {
            color: labelColor,
          },
        },
        y: {
          display: false,
          grid: {
            display: false
          },
          stepValue: 1,
          min: (arg.min > 1
            ? (arg.min * 0.8) : 0),
          max: ((arg.max) * 1.2),
        }
      },
    });
}
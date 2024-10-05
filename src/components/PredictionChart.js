import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function PredictionChart({ salesData, predictionData, title = 'Sales Trend and Prediction' }) {
  // Function to get the week number
  const getWeekNumber = (date) => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + 4 - (d.getDay() || 7));
    const yearStart = new Date(d.getFullYear(), 0, 1);
    return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
  };

  // Aggregate historical data by week
  const aggregatedData = salesData.reduce((acc, sale) => {
    const year = new Date(sale.date).getFullYear();
    const week = getWeekNumber(sale.date);
    const key = `${year}-W${week.toString().padStart(2, '0')}`;
    if (!acc[key]) {
      acc[key] = 0;
    }
    acc[key] += Number(sale.quantity);
    return acc;
  }, {});

  const labels = Object.keys(aggregatedData).sort();
  const historicalData = labels.map(key => aggregatedData[key]);

  // Add prediction data
  const lastWeek = labels[labels.length - 1];
  const [year, week] = lastWeek.split('-W').map(Number);
  const nextWeek = `${year}-W${(week + 1).toString().padStart(2, '0')}`;
  labels.push(nextWeek);
  historicalData.push(null); // Add null for the last historical data point

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Historical Sales',
        data: historicalData,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      },
      {
        label: 'Predicted Sales',
        data: [...new Array(historicalData.length - 1).fill(null), historicalData[historicalData.length - 2], predictionData.total.nextWeek],
        fill: false,
        borderColor: 'rgb(255, 99, 132)',
        borderDash: [5, 5],
        tension: 0.1
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: title
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Year-Week'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Total Quantity'
        },
        beginAtZero: true
      }
    }
  };

  return <Line data={chartData} options={options} />;
}

export default PredictionChart;
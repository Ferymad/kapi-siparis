import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

function ProductTypePieChart({ salesData }) {
  const productTypeSales = salesData.reduce((acc, sale) => {
    if (!acc[sale.product_type]) {
      acc[sale.product_type] = 0;
    }
    acc[sale.product_type] += Number(sale.quantity);
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(productTypeSales),
    datasets: [
      {
        data: Object.values(productTypeSales),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: 'Sales Distribution by Product Type',
      },
    },
  };

  return <Pie data={chartData} options={options} />;
}

export default ProductTypePieChart;
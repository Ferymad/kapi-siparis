import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function ProductTypeSalesChart({ salesData }) {
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
        label: 'Total Sales by Product Type',
        data: Object.values(productTypeSales),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Sales by Product Type',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Total Quantity Sold',
        },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
}

export default ProductTypeSalesChart;
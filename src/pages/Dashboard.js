import React, { useState, useMemo } from 'react';
import { useQuerySalesData } from '../hooks/useQuerySalesData';
import { useQueryPrediction } from '../hooks/useQueryPrediction';
import SalesChart from '../components/SalesChart';
import PredictionChart from '../components/PredictionChart';
import SalesFilters from '../components/SalesFilters';
import ErrorDisplay from '../components/ErrorDisplay';

function Dashboard() {
  const [filters, setFilters] = useState({});
  const { data: salesData, isLoading: salesLoading, error: salesError } = useQuerySalesData(filters);
  const { data: predictionData, isLoading: predictionLoading, error: predictionError } = useQueryPrediction(filters);
  const [displayCount, setDisplayCount] = useState(10);

  const productOptions = useMemo(() => {
    if (!salesData) return [];
    const uniqueProducts = salesData.reduce((acc, sale) => {
      const key = `${sale.product_code}|${sale.product_color}|${sale.product_model}`;
      if (!acc[key]) {
        acc[key] = {
          code: sale.product_code,
          color: sale.product_color,
          model: sale.product_model
        };
      }
      return acc;
    }, {});
    return Object.values(uniqueProducts);
  }, [salesData]);

  const getWeekNumber = (date) => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + 4 - (d.getDay() || 7));
    const yearStart = new Date(d.getFullYear(), 0, 1);
    return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
  };

  const weeklySalesData = useMemo(() => {
    if (!salesData) return [];
    const weeklyData = salesData.reduce((acc, sale) => {
      const year = new Date(sale.date).getFullYear();
      const week = getWeekNumber(sale.date);
      const key = `${year}-W${week.toString().padStart(2, '0')}`;
      if (!acc[key]) {
        acc[key] = 0;
      }
      acc[key] += Number(sale.quantity);
      return acc;
    }, {});
    return Object.entries(weeklyData)
      .map(([key, value]) => ({
        weekYear: key,
        totalQuantity: value
      }))
      .sort((a, b) => a.weekYear.localeCompare(b.weekYear));
  }, [salesData]);

  if (salesLoading || predictionLoading) return <div className="p-4">Loading...</div>;
  if (salesError) return <ErrorDisplay message={`Error loading sales data: ${salesError.message}`} />;
  if (predictionError) return <ErrorDisplay message={`Error loading prediction data: ${predictionError.message}`} />;

  return (
    <div className="p-4">
      <h1 className="text-3xl font-semibold mb-4">Dashboard</h1>
      
      <SalesFilters filters={filters} setFilters={setFilters} productOptions={productOptions} />
      
      {predictionData && predictionData.total && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Sales Predictions</h2>
          <div className="bg-blue-100 p-4 rounded-lg mb-4">
            <h3 className="text-xl font-semibold mb-2">Total Predictions</h3>
            <ul>
              <li><span className="font-semibold">Next Week:</span> {predictionData.total.nextWeek} units</li>
              <li><span className="font-semibold">Next Month:</span> {predictionData.total.nextMonth} units</li>
              <li><span className="font-semibold">End of Year:</span> {predictionData.total.endOfYear} units</li>
            </ul>
          </div>
          {predictionData.byProduct && (
            <>
              <h3 className="text-xl font-semibold mb-2">Predictions by Product Type</h3>
              <ul className="space-y-2">
                {Object.entries(predictionData.byProduct).map(([productType, prediction]) => (
                  <li key={productType} className="bg-green-100 p-3 rounded-lg">
                    <span className="font-semibold">{productType}:</span> {prediction} units (next week)
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}

      {salesData && salesData.length > 0 && predictionData && (
        <div>
          <h2 className="text-2xl font-semibold mb-2">Sales Trend and Prediction</h2>
          <div className="mb-8">
            <PredictionChart salesData={salesData} predictionData={predictionData} />
          </div>
          <h2 className="text-2xl font-semibold mb-2">Historical Sales Trend</h2>
          <div className="mb-8">
            <SalesChart salesData={salesData} />
          </div>
          <h2 className="text-2xl font-semibold mb-2">Weekly Sales Data</h2>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">Year-Week</th>
                <th className="px-4 py-2 text-left">Total Quantity</th>
              </tr>
            </thead>
            <tbody>
              {weeklySalesData.slice(0, displayCount).map((weekData) => (
                <tr key={weekData.weekYear}>
                  <td className="border px-4 py-2">{weekData.weekYear}</td>
                  <td className="border px-4 py-2">{weekData.totalQuantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {weeklySalesData.length > displayCount && (
            <button 
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => setDisplayCount(prevCount => prevCount + 10)}
            >
              Load More
            </button>
          )}
        </div>
      )}

      {(!salesData || salesData.length === 0) && (
        <p>No sales data available for the selected filters.</p>
      )}
    </div>
  );
}

export default Dashboard;
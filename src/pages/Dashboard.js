import React from 'react';
import { useFetchSalesData } from '../hooks/useFetchSalesData';

function Dashboard() {
  const { salesData, loading, error } = useFetchSalesData();

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-semibold mb-4">Dashboard</h1>
      <p className="text-lg mb-4">Sales data and predictions</p>
      {salesData ? (
        <div>
          <h2 className="text-2xl font-semibold mb-2">Sales Data</h2>
          {salesData.length > 0 ? (
            <ul className="space-y-2">
              {salesData.map((sale) => (
                <li key={sale.id} className="bg-gray-100 p-3 rounded-lg">
                  <span className="font-semibold">Date:</span> {formatDate(sale.date)}<br />
                  <span className="font-semibold">Product:</span> {sale.product_code} ({sale.product_type})<br />
                  <span className="font-semibold">Quantity:</span> {sale.quantity}
                </li>
              ))}
            </ul>
          ) : (
            <p>No sales data available.</p>
          )}
        </div>
      ) : (
        <p>Unable to fetch sales data. Please check your Supabase configuration.</p>
      )}
    </div>
  );
}

export default Dashboard;

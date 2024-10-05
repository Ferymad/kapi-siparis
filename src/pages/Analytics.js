import React, { useState, useMemo } from 'react';
import { useQuerySalesData } from '../hooks/useQuerySalesData';
import { useQueryPrediction } from '../hooks/useQueryPrediction';
import SalesChart from '../components/SalesChart';
import PredictionChart from '../components/PredictionChart';
import ProductTypeSalesChart from '../components/ProductTypeSalesChart';
import ProductTypePieChart from '../components/ProductTypePieChart';
import SalesFilters from '../components/SalesFilters';
import ErrorDisplay from '../components/ErrorDisplay';
import { downloadCSV } from '../utils/csvExport';

function Analytics() {
  const [filters, setFilters] = useState({});
  const { data: salesData, isLoading: salesLoading, error: salesError } = useQuerySalesData(filters);
  const { data: predictionData, isLoading: predictionLoading, error: predictionError } = useQueryPrediction(filters);

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

  const filteredSalesData = useMemo(() => {
    if (!salesData) return [];
    return salesData.filter(sale => 
      (!filters.productType || sale.product_code === filters.productType) &&
      (!filters.productColor || sale.product_color === filters.productColor) &&
      (!filters.productModel || sale.product_model === filters.productModel)
    );
  }, [salesData, filters]);

  const filteredPredictionData = useMemo(() => {
    if (!predictionData) return null;
    if (!filters.productType) return predictionData;
    return {
      byProduct: {
        [filters.productType]: predictionData.byProduct[filters.productType] || 0
      },
      total: {
        nextWeek: predictionData.byProduct[filters.productType] || 0,
        nextMonth: {
          range: [(predictionData.byProduct[filters.productType] || 0) * 4, (predictionData.byProduct[filters.productType] || 0) * 4],
          confidence: (predictionData.byProduct[filters.productType] || 0).confidence
        },
        endOfYear: {
          range: [Math.round((predictionData.byProduct[filters.productType] || 0) * 52), Math.round((predictionData.byProduct[filters.productType] || 0) * 52)],
          confidence: (predictionData.byProduct[filters.productType] || 0).confidence
        }
      }
    };
  }, [predictionData, filters]);

  const predictionsByProductCode = useMemo(() => {
    if (!salesData || !predictionData || !predictionData.byProduct) return {};
    return salesData.reduce((acc, sale) => {
      if (!acc[sale.product_code]) {
        acc[sale.product_code] = {
          prediction: predictionData.byProduct[sale.product_code] || 0,
          color: sale.product_color,
          model: sale.product_model
        };
      }
      return acc;
    }, {});
  }, [salesData, predictionData]);

  console.log('Predictions by product code:', predictionsByProductCode);

  const handleExport = () => {
    const dataToExport = filteredSalesData;
    const predictionsToExport = Object.entries(predictionsByProductCode).map(([productCode, data]) => ({
      product_code: productCode,
      color: data.color,
      model: data.model,
      prediction: data.prediction
    }));

    const exportData = [
      ...dataToExport.map(sale => ({
        date: sale.date,
        product_code: sale.product_code,
        product_color: sale.product_color,
        product_model: sale.product_model,
        quantity: sale.quantity
      })),
      { date: 'Predictions', product_code: '', product_color: '', product_model: '', quantity: '' },
      ...predictionsToExport.map(pred => ({
        date: 'Next Week',
        product_code: pred.product_code,
        product_color: pred.color,
        product_model: pred.model,
        quantity: pred.prediction
      }))
    ];

    downloadCSV(exportData, 'sales_and_predictions.csv');
  };

  if (salesLoading || predictionLoading) return <div className="p-4">Loading...</div>;
  if (salesError) return <ErrorDisplay message={`Error loading sales data: ${salesError.message}`} />;
  if (predictionError) return <ErrorDisplay message={`Error loading prediction data: ${predictionError.message}`} />;

  return (
    <div className="p-4">
      <h1 className="text-3xl font-semibold mb-4">Analytics</h1>
      
      <SalesFilters 
        filters={filters} 
        setFilters={setFilters} 
        productOptions={productOptions || []}
      />
      
      <button
        onClick={handleExport}
        className="mb-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Export to CSV
      </button>

      {filteredPredictionData && filteredPredictionData.total && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Sales Predictions</h2>
          <div className="bg-blue-100 p-4 rounded-lg mb-4">
            <h3 className="text-xl font-semibold mb-2">Total Predictions</h3>
            <ul>
              {filteredPredictionData.total.nextWeek && (
                <li>
                  <span className="font-semibold">Next Week:</span> 
                  {filteredPredictionData.total.nextWeek.range[0]} - {filteredPredictionData.total.nextWeek.range[1]} units 
                  ({Math.round(filteredPredictionData.total.nextWeek.confidence * 100)}% confident)
                </li>
              )}
              {filteredPredictionData.total.nextMonth && (
                <li>
                  <span className="font-semibold">Next Month:</span> 
                  {filteredPredictionData.total.nextMonth.range[0]} - {filteredPredictionData.total.nextMonth.range[1]} units 
                  ({Math.round(filteredPredictionData.total.nextMonth.confidence * 100)}% confident)
                </li>
              )}
              {filteredPredictionData.total.endOfYear && (
                <li>
                  <span className="font-semibold">End of Year:</span> 
                  {filteredPredictionData.total.endOfYear.range[0]} - {filteredPredictionData.total.endOfYear.range[1]} units 
                  ({Math.round(filteredPredictionData.total.endOfYear.confidence * 100)}% confident)
                </li>
              )}
            </ul>
          </div>
          {filteredPredictionData.byProduct && (
            <div className="bg-green-100 p-4 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Predictions by Product</h3>
              <ul className="space-y-2">
                {Object.entries(filteredPredictionData.byProduct).map(([productCode, prediction]) => (
                  <li key={productCode} className="flex justify-between">
                    <span>{productCode}:</span>
                    <span className="font-semibold">
                      {prediction.range[0]} - {prediction.range[1]} units 
                      ({Math.round(prediction.confidence * 100)}% confident)
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {filteredSalesData && filteredSalesData.length > 0 && filteredPredictionData && (
        <div>
          <h2 className="text-2xl font-semibold mb-2">Sales Trend and Prediction</h2>
          <div className="mb-8">
            <PredictionChart salesData={filteredSalesData} predictionData={filteredPredictionData} />
          </div>
          <h2 className="text-2xl font-semibold mb-2">Historical Sales Trend</h2>
          <div className="mb-8">
            <SalesChart salesData={filteredSalesData} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h2 className="text-2xl font-semibold mb-2">Sales by Product Type</h2>
              <ProductTypeSalesChart salesData={filteredSalesData} />
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-2">Sales Distribution</h2>
              <ProductTypePieChart salesData={filteredSalesData} />
            </div>
          </div>
        </div>
      )}

      {(!filteredSalesData || filteredSalesData.length === 0) && (
        <p>No sales data available for the selected product.</p>
      )}
    </div>
  );
}

export default Analytics;
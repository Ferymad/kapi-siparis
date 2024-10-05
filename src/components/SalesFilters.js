import React from 'react';
import DateRangeFilter from './DateRangeFilter';

function SalesFilters({ filters, setFilters, productOptions }) {
  const uniqueColors = productOptions ? [...new Set(productOptions.map(p => p.color))] : [];
  const uniqueModels = productOptions ? [...new Set(productOptions.map(p => p.model))] : [];

  return (
    <div className="mb-4 space-y-4">
      <DateRangeFilter
        startDate={filters.startDate}
        endDate={filters.endDate}
        onStartDateChange={(date) => setFilters({...filters, startDate: date})}
        onEndDateChange={(date) => setFilters({...filters, endDate: date})}
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="productType" className="block text-sm font-medium text-gray-700">Product Type</label>
          <select
            id="productType"
            value={filters.productType || ''}
            onChange={(e) => setFilters({...filters, productType: e.target.value})}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="">All Types</option>
            {productOptions && productOptions.map((product) => (
              <option key={product.code} value={product.code}>
                {product.code}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="productColor" className="block text-sm font-medium text-gray-700">Product Color</label>
          <select
            id="productColor"
            value={filters.productColor || ''}
            onChange={(e) => setFilters({...filters, productColor: e.target.value})}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="">All Colors</option>
            {uniqueColors.map((color) => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="productModel" className="block text-sm font-medium text-gray-700">Product Model</label>
          <select
            id="productModel"
            value={filters.productModel || ''}
            onChange={(e) => setFilters({...filters, productModel: e.target.value})}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="">All Models</option>
            {uniqueModels.map((model) => (
              <option key={model} value={model}>
                {model}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export default SalesFilters;
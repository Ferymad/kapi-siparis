import { supabase } from '../lib/supabaseClient'

export const predictionService = {
  async getPrediction(filters) {
    try {
      if (!supabase) {
        throw new Error('Supabase client is not initialized')
      }

      let query = supabase
        .from('sales')
        .select('date, product_code, product_type, product_color, product_model, quantity')
        .order('date', { ascending: true });

      if (filters.startDate) {
        query = query.gte('date', filters.startDate);
      } else {
        // Fetch the last 90 days of sales data if no start date is provided
        const ninetyDaysAgo = new Date();
        ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);
        query = query.gte('date', ninetyDaysAgo.toISOString());
      }

      if (filters.endDate) {
        query = query.lte('date', filters.endDate);
      }
      if (filters.productType) {
        query = query.eq('product_type', filters.productType);
      }

      const { data, error } = await query;

      if (error) throw error

      const predictions = calculatePredictions(data);

      return predictions;
    } catch (error) {
      console.error('Error fetching prediction data:', error.message)
      return {
        byProduct: {},
        total: {
          nextWeek: { range: [0, 0], confidence: 0 },
          nextMonth: { range: [0, 0], confidence: 0 },
          endOfYear: { range: [0, 0], confidence: 0 }
        }
      };
    }
  },
}

const calculatePredictions = (salesData) => {
  const byProduct = {};
  let totalQuantity = 0;

  // Group sales by product
  salesData.forEach(sale => {
    if (!byProduct[sale.product_code]) {
      byProduct[sale.product_code] = [];
    }
    byProduct[sale.product_code].push(sale.quantity);
    totalQuantity += sale.quantity;
  });

  // Calculate predictions for each product
  const productPredictions = {};
  Object.entries(byProduct).forEach(([productCode, quantities]) => {
    productPredictions[productCode] = calculatePrediction(quantities);
  });

  // Calculate total predictions
  const totalPrediction = calculatePrediction([totalQuantity]);

  return {
    byProduct: productPredictions,
    total: {
      nextWeek: totalPrediction,
      nextMonth: {
        range: [totalPrediction.range[0] * 4, totalPrediction.range[1] * 4],
        confidence: totalPrediction.confidence
      },
      endOfYear: {
        range: [Math.round(totalPrediction.range[0] * 52), Math.round(totalPrediction.range[1] * 52)],
        confidence: totalPrediction.confidence
      }
    }
  };
};

const calculatePrediction = (data) => {
  const average = data.reduce((sum, value) => sum + value, 0) / data.length;
  const stdDev = Math.sqrt(data.reduce((sum, value) => sum + Math.pow(value - average, 2), 0) / data.length);
  
  const lowerBound = Math.max(0, Math.round(average - stdDev));
  const upperBound = Math.round(average + stdDev);
  const confidence = 0.68; // Approximately 68% of data falls within one standard deviation

  return {
    range: [lowerBound, upperBound],
    confidence: confidence
  };
};

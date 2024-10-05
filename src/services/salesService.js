import { supabase } from '../lib/supabaseClient'

export const salesService = {
  async fetchSalesData(filters = {}) {
    try {
      if (!supabase) {
        throw new Error('Supabase client is not initialized')
      }

      console.log('Executing Supabase query with filters:', filters);
      let query = supabase
        .from('sales')
        .select('id, date, product_code, product_color, product_model, product_type, quantity')
        .order('date', { ascending: true });

      if (filters.startDate) {
        query = query.gte('date', filters.startDate);
      }
      if (filters.endDate) {
        query = query.lte('date', filters.endDate);
      }
      if (filters.productType) {
        query = query.eq('product_code', filters.productType);
      }
      if (filters.productColor) {
        query = query.eq('product_color', filters.productColor);
      }
      if (filters.productModel) {
        query = query.eq('product_model', filters.productModel);
      }

      const { data, error } = await query;

      console.log('Query completed. Data:', data, 'Error:', error);

      if (error) throw error

      return data
    } catch (error) {
      console.error('Error fetching sales data:', error.message)
      return null
    }
  },
}

import { supabase } from '../lib/supabaseClient'

export const salesService = {
  async fetchSalesData() {
    try {
      if (!supabase) {
        throw new Error('Supabase client is not initialized')
      }

      console.log('Executing Supabase query...');
      const { data, error } = await supabase
        .from('sales')
        .select('id, date, product_code, product_type, quantity')
        .order('date', { ascending: false })
        .limit(10)

      console.log('Query completed. Data:', data, 'Error:', error);

      if (error) throw error

      return data
    } catch (error) {
      console.error('Error fetching sales data:', error.message)
      return null
    }
  },
}

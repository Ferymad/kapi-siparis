import { useState, useEffect } from 'react'
import { salesService } from '../services/salesService'

export function useFetchSalesData(filters) {
  const [salesData, setSalesData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchData() {
      try {
        console.log('Fetching sales data with filters:', filters);
        const data = await salesService.fetchSalesData(filters)
        console.log('Fetched data:', data);
        setSalesData(data)
        setLoading(false)
      } catch (err) {
        console.error('Error in useFetchSalesData:', err);
        setError(err.message)
        setLoading(false)
      }
    }

    fetchData()
  }, [filters]) // Include filters in the dependency array

  return { salesData, loading, error }
}

import { useState, useEffect } from 'react'
import { salesService } from '../services/salesService'

export function useFetchSalesData() {
  const [salesData, setSalesData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchData() {
      try {
        console.log('Fetching sales data...');
        const data = await salesService.fetchSalesData()
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
  }, [])

  return { salesData, loading, error }
}

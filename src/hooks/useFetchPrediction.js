import { useState, useEffect } from 'react'
import { predictionService } from '../services/predictionService'

export function useFetchPrediction() {
  const [predictionData, setPredictionData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await predictionService.getPrediction()
        setPredictionData(data)
        setLoading(false)
      } catch (err) {
        console.error('Error in useFetchPrediction:', err);
        setError(err.message)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { predictionData, loading, error }
}
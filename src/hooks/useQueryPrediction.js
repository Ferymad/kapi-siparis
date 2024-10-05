import { useQuery } from 'react-query';
import { predictionService } from '../services/predictionService';

export function useQueryPrediction(filters) {
  return useQuery(['predictionData', filters], () => predictionService.getPrediction(filters), {
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 30 * 60 * 1000, // 30 minutes
  });
}
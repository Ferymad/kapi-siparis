import { useQuery } from 'react-query';
import { salesService } from '../services/salesService';

export function useQuerySalesData(filters) {
  return useQuery(['salesData', filters], () => salesService.fetchSalesData(filters), {
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 30 * 60 * 1000, // 30 minutes
  });
}
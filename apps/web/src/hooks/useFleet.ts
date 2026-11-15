import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchFleet,
  fetchAsset,
  fetchTelemetry,
  fetchAlerts,
  acknowledgeAlert,
  resolveAlert,
  fetchMaintenance,
  createWorkOrder,
  updateWorkOrderStatus,
  fetchDevices,
  fetchHealthAssessment
} from '../services/api.js';

export function useFleet() {
  return useQuery({
    queryKey: ['fleet'],
    queryFn: fetchFleet,
    refetchInterval: 5000
  });
}

export function useAsset(id: string) {
  return useQuery({
    queryKey: ['asset', id],
    queryFn: () => fetchAsset(id),
    enabled: !!id,
    refetchInterval: 3000
  });
}

export function useTelemetry(assetId: string) {
  return useQuery({
    queryKey: ['telemetry', assetId],
    queryFn: () => fetchTelemetry(assetId),
    enabled: !!assetId,
    refetchInterval: 2000
  });
}

export function useAlerts(params?: { status?: string; severity?: string; assetId?: string }) {
  return useQuery({
    queryKey: ['alerts', params],
    queryFn: () => fetchAlerts(params),
    refetchInterval: 4000
  });
}

export function useMaintenance(params?: { assetId?: string; status?: string }) {
  return useQuery({
    queryKey: ['maintenance', params],
    queryFn: () => fetchMaintenance(params),
    refetchInterval: 5000
  });
}

export function useDevices() {
  return useQuery({
    queryKey: ['devices'],
    queryFn: fetchDevices,
    refetchInterval: 5000
  });
}

export function useHealthAssessment(assetId: string, telemetry?: Record<string, number>) {
  return useQuery({
    queryKey: ['health-assessment', assetId, telemetry],
    queryFn: () => fetchHealthAssessment(assetId, telemetry),
    enabled: !!assetId,
    refetchInterval: 6000
  });
}

export function useAcknowledgeAlert() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, name }: { id: string; name: string }) => acknowledgeAlert(id, name),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['alerts'] });
      queryClient.invalidateQueries({ queryKey: ['fleet'] });
    }
  });
}

export function useResolveAlert() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, notes }: { id: string; notes: string }) => resolveAlert(id, notes),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['alerts'] });
      queryClient.invalidateQueries({ queryKey: ['fleet'] });
    }
  });
}

export function useCreateWorkOrder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createWorkOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['maintenance'] });
    }
  });
}

export function useUpdateWorkOrderStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) => updateWorkOrderStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['maintenance'] });
    }
  });
}

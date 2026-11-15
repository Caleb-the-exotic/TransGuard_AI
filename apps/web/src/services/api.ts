// ==============================================================================
// TransGuard AI – API & WebSocket Service Layer
// ==============================================================================

import { TransformerAsset, AlertItem, WorkOrderItem, EdgeDevice, HealthAssessment } from '../types/index.js';

const API_BASE = '/api/v1';

export async function fetchFleet(): Promise<{ kpis: any; assets: TransformerAsset[] }> {
  const res = await fetch(`${API_BASE}/fleet`);
  if (!res.ok) throw new Error('Failed to load fleet');
  return res.json();
}

export async function fetchAsset(id: string): Promise<TransformerAsset & { alerts: AlertItem[]; workOrders: WorkOrderItem[]; device: EdgeDevice | null }> {
  const res = await fetch(`${API_BASE}/assets/${id}`);
  if (!res.ok) throw new Error(`Failed to load asset ${id}`);
  return res.json();
}

export async function fetchTelemetry(assetId: string) {
  const res = await fetch(`${API_BASE}/telemetry/${assetId}`);
  if (!res.ok) throw new Error(`Failed to load telemetry for ${assetId}`);
  return res.json();
}

export async function fetchAlerts(params?: { status?: string; severity?: string; assetId?: string }): Promise<{ total: number; alerts: AlertItem[] }> {
  const query = new URLSearchParams(params as any).toString();
  const res = await fetch(`${API_BASE}/alerts?${query}`);
  if (!res.ok) throw new Error('Failed to load alerts');
  return res.json();
}

export async function acknowledgeAlert(id: string, acknowledgedBy: string) {
  const res = await fetch(`${API_BASE}/alerts/${id}/acknowledge`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ acknowledgedBy })
  });
  if (!res.ok) throw new Error(`Failed to acknowledge alert ${id}`);
  return res.json();
}

export async function resolveAlert(id: string, resolvedNotes: string) {
  const res = await fetch(`${API_BASE}/alerts/${id}/resolve`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ resolvedNotes })
  });
  if (!res.ok) throw new Error(`Failed to resolve alert ${id}`);
  return res.json();
}

export async function fetchMaintenance(params?: { assetId?: string; status?: string }): Promise<{ total: number; workOrders: WorkOrderItem[] }> {
  const query = new URLSearchParams(params as any).toString();
  const res = await fetch(`${API_BASE}/maintenance?${query}`);
  if (!res.ok) throw new Error('Failed to load maintenance work orders');
  return res.json();
}

export async function createWorkOrder(data: Partial<WorkOrderItem>) {
  const res = await fetch(`${API_BASE}/maintenance`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Failed to create work order');
  return res.json();
}

export async function updateWorkOrderStatus(id: string, status: string) {
  const res = await fetch(`${API_BASE}/maintenance/${id}/status`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status })
  });
  if (!res.ok) throw new Error('Failed to update work order status');
  return res.json();
}

export async function fetchDevices(): Promise<{ total: number; onlineCount: number; devices: EdgeDevice[] }> {
  const res = await fetch(`${API_BASE}/devices`);
  if (!res.ok) throw new Error('Failed to load devices');
  return res.json();
}

export async function fetchHealthAssessment(assetId: string, telemetry?: Record<string, number>): Promise<HealthAssessment> {
  const res = await fetch(`${API_BASE}/health/assess`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ assetId, telemetry })
  });
  if (!res.ok) throw new Error('Failed to assess health');
  return res.json();
}

// ------------------------------------------------------------------------------
// Live WebSocket Telemetry Stream Manager
// ------------------------------------------------------------------------------
type TelemetryListener = (event: any) => void;

class TelemetryWebSocket {
  private socket: WebSocket | null = null;
  private listeners: Set<TelemetryListener> = new Set();
  private reconnectTimer: any = null;

  connect() {
    if (this.socket && (this.socket.readyState === WebSocket.OPEN || this.socket.readyState === WebSocket.CONNECTING)) {
      return;
    }

    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${protocol}//${window.location.host}/ws/telemetry`;

    try {
      this.socket = new WebSocket(wsUrl);

      this.socket.onopen = () => {
        console.log('[TransGuard WS] Connected to live telemetry stream.');
      };

      this.socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          this.listeners.forEach(fn => fn(data));
        } catch {
          // Ignore
        }
      };

      this.socket.onclose = () => {
        this.socket = null;
        this.scheduleReconnect();
      };

      this.socket.onerror = () => {
        if (this.socket) this.socket.close();
      };
    } catch {
      this.scheduleReconnect();
    }
  }

  private scheduleReconnect() {
    if (!this.reconnectTimer) {
      this.reconnectTimer = setTimeout(() => {
        this.reconnectTimer = null;
        this.connect();
      }, 3000);
    }
  }

  subscribe(listener: TelemetryListener) {
    this.listeners.add(listener);
    this.connect();
    return () => {
      this.listeners.delete(listener);
    };
  }

  filterAsset(assetId: string) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify({ type: 'subscribe_asset', assetId }));
    }
  }
}

export const telemetryWS = new TelemetryWebSocket();

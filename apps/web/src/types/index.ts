// ==============================================================================
// TransGuard AI – Domain Types & Constants
// ==============================================================================

export type NavModule = 
  | 'overview' 
  | 'monitoring' 
  | 'analytics' 
  | 'alerts' 
  | 'maintenance' 
  | 'assets' 
  | 'reports' 
  | 'devices';

export type HealthStatus = 'NORMAL' | 'WARNING' | 'CRITICAL';
export type HardwareScale = 'bench' | 'field';
export type InputSource = 'sim' | 'usb' | 'wifi' | 'mqtt';
export type SimScenario = 'normal' | 'overload' | 'thermal' | 'harmonic';
export type TimeWindow = 'LIVE' | '1M' | '5M' | '15M';

export interface DataPoint {
  t: Date | string;
  timeStr: string;
  v: number;
}

export interface ScaleConfig {
  base: number;
  noise: number;
  warn: number;
  crit: number;
  minAxis: number;
  maxAxis: number;
}

export interface SensorDef {
  id: string;
  name: string;
  ic: string;
  tabLabel: string;
  unit: string;
  decimals: number;
  field: ScaleConfig;
  bench: ScaleConfig;
}

export interface TransformerAsset {
  id: string;
  name: string;
  location: string;
  capacityKva: number;
  voltageRating: string;
  coolingType: string;
  manufacturer: string;
  serialNumber: string;
  installationDate: string;
  lastServiced: string;
  status: HealthStatus;
  healthIndex: number;
  rulYears: number;
  activeAlertsCount: number;
  edgeDeviceId: string;
  telemetry: {
    oilTemp: number;
    windingTemp: number;
    current: number;
    voltage: number;
    vib: number;
    thd: number;
    gas: number;
    ambient: number;
    humidity: number;
  };
}

export interface AlertItem {
  id: string;
  assetId: string;
  timestamp: string;
  severity: HealthStatus;
  parameter: string;
  value: number;
  unit: string;
  threshold: number;
  message: string;
  status: 'ACTIVE' | 'ACKNOWLEDGED' | 'RESOLVED';
  acknowledgedBy?: string | null;
  resolvedNotes?: string | null;
}

export interface WorkOrderItem {
  id: string;
  assetId: string;
  title: string;
  description: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
  assignedTo: string;
  dueDate: string;
  createdDate: string;
}

export interface EdgeDevice {
  deviceId: string;
  assetId: string;
  hardware: string;
  connectionType: string;
  ipAddress: string;
  macAddress: string;
  rssi: number;
  status: 'ONLINE' | 'OFFLINE';
  firmwareVersion: string;
  uptimeSeconds: number;
  lastSeen: string;
  sensorsConnected: string[];
}

export interface HealthAssessment {
  asset_id: string;
  timestamp: string;
  health_index: number;
  overall_status: HealthStatus;
  rul_years: number;
  rul_pct: number;
  sub_scores: {
    winding: number;
    oil: number;
    power_quality: number;
    mechanical: number;
    load: number;
  };
  anomalies: Array<{
    parameter_id: string;
    parameter_name: string;
    current_value: number;
    nominal_baseline: number;
    deviation_pct: number;
    severity: HealthStatus;
    description: string;
  }>;
  faults: Array<{
    fault: string;
    confidence: number;
    risk: string;
    action: string;
    category?: string;
  }>;
  recommendations: Array<{
    priority: string;
    title: string;
    action: string;
    timeline: string;
    reason?: string;
  }>;
  metadata?: {
    faa?: number;
    weights?: Record<string, number>;
    model_type?: string;
    disclaimer?: string;
    engine?: string;
    [key: string]: any;
  };
}

export const SENSOR_DEFINITIONS: SensorDef[] = [
  {
    id: 'oilTemp',
    name: 'Top Oil Temperature',
    ic: 'PT100 / DS18B20',
    tabLabel: 'OIL TEMP',
    unit: '°C',
    decimals: 1,
    field: { base: 54.2, noise: 0.45, warn: 75, crit: 90, minAxis: 35, maxAxis: 105 },
    bench: { base: 33.4, noise: 0.3, warn: 55, crit: 70, minAxis: 20, maxAxis: 80 }
  },
  {
    id: 'windingTemp',
    name: 'Winding Hotspot Temp',
    ic: 'IEEE C57.91 Calc / RTD',
    tabLabel: 'WINDING',
    unit: '°C',
    decimals: 1,
    field: { base: 68.5, noise: 0.6, warn: 95, crit: 115, minAxis: 45, maxAxis: 135 },
    bench: { base: 38.2, noise: 0.4, warn: 65, crit: 80, minAxis: 20, maxAxis: 90 }
  },
  {
    id: 'current',
    name: 'Primary Load Current',
    ic: 'Current CT / ACS712',
    tabLabel: 'CURRENT',
    unit: 'A',
    decimals: 2,
    field: { base: 120.0, noise: 2.5, warn: 180, crit: 220, minAxis: 50, maxAxis: 260 },
    bench: { base: 0.42, noise: 0.04, warn: 2.5, crit: 4.2, minAxis: 0.0, maxAxis: 5.0 }
  },
  {
    id: 'voltage',
    name: 'Secondary Line Voltage',
    ic: 'ZMPT101B AC Sensor',
    tabLabel: 'VOLTAGE',
    unit: 'V',
    decimals: 1,
    field: { base: 415.0, noise: 1.2, warn: 430, crit: 440, minAxis: 380, maxAxis: 460 },
    bench: { base: 12.1, noise: 0.15, warn: 13.2, crit: 14.0, minAxis: 9.0, maxAxis: 15.0 }
  },
  {
    id: 'vib',
    name: 'Mechanical Vibration RMS',
    ic: 'MPU6050 Accelerometer',
    tabLabel: 'VIBRATION',
    unit: 'm/s²',
    decimals: 2,
    field: { base: 1.2, noise: 0.12, warn: 2.5, crit: 4.0, minAxis: 0.0, maxAxis: 5.5 },
    bench: { base: 0.85, noise: 0.08, warn: 1.8, crit: 3.0, minAxis: 0.0, maxAxis: 4.0 }
  },
  {
    id: 'thd',
    name: 'Harmonic Distortion (THD)',
    ic: 'Fast Fourier Transform',
    tabLabel: 'THD %',
    unit: '%',
    decimals: 2,
    field: { base: 2.5, noise: 0.15, warn: 5.0, crit: 8.0, minAxis: 0.0, maxAxis: 10.0 },
    bench: { base: 1.8, noise: 0.1, warn: 3.5, crit: 6.0, minAxis: 0.0, maxAxis: 8.0 }
  },
  {
    id: 'gas',
    name: 'Combustible Gas Concentration',
    ic: 'MQ-2 Gas Sensor',
    tabLabel: 'GAS (MQ-2)',
    unit: 'ppm',
    decimals: 0,
    field: { base: 120.0, noise: 8.0, warn: 300, crit: 450, minAxis: 50, maxAxis: 600 },
    bench: { base: 95.0, noise: 6.0, warn: 250, crit: 400, minAxis: 40, maxAxis: 500 }
  },
  {
    id: 'ambient',
    name: 'Ambient Temperature',
    ic: 'DHT22 / AM2302',
    tabLabel: 'AMBIENT',
    unit: '°C',
    decimals: 1,
    field: { base: 32.0, noise: 0.3, warn: 45, crit: 55, minAxis: 15, maxAxis: 60 },
    bench: { base: 29.8, noise: 0.2, warn: 40, crit: 50, minAxis: 15, maxAxis: 55 }
  }
];

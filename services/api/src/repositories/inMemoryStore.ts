// ==============================================================================
// TransGuard AI – In-Memory Industrial Telemetry & Fleet Store
// Serves as resilient operational state buffer & fallback when PostgreSQL is offline.
// ==============================================================================

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
  status: 'NORMAL' | 'WARNING' | 'CRITICAL';
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
  severity: 'NORMAL' | 'WARNING' | 'CRITICAL';
  parameter: string;
  value: number;
  unit: string;
  threshold: number;
  message: string;
  status: 'ACTIVE' | 'ACKNOWLEDGED' | 'RESOLVED';
  acknowledgedBy: string | null;
  resolvedNotes: string | null;
}

export interface WorkOrder {
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

export const fleetAssets: TransformerAsset[] = [
  {
    id: 'TG-TX-101',
    name: 'Substation Alpha – Main Stepdown',
    location: 'Sector 4, North Grid Substation',
    capacityKva: 500,
    voltageRating: '11 kV / 415 V',
    coolingType: 'ONAN (Oil Natural Air Natural)',
    manufacturer: 'ABB Power Grids',
    serialNumber: 'ABB-2019-TX9941',
    installationDate: '2019-04-12',
    lastServiced: '2026-08-10',
    status: 'NORMAL',
    healthIndex: 92,
    rulYears: 14.8,
    activeAlertsCount: 0,
    edgeDeviceId: 'ESP32-NODE-01',
    telemetry: {
      oilTemp: 48.5,
      windingTemp: 58.2,
      current: 98.4,
      voltage: 412.0,
      vib: 1.15,
      thd: 2.1,
      gas: 68,
      ambient: 31.2,
      humidity: 52
    }
  },
  {
    id: 'TG-TX-102',
    name: 'Industrial Feeder – Steel Works',
    location: 'Heavy Industrial Zone, Feeder 3B',
    capacityKva: 1000,
    voltageRating: '11 kV / 415 V',
    coolingType: 'ONAF (Oil Natural Air Forced)',
    manufacturer: 'Siemens Energy',
    serialNumber: 'SIE-2016-TX4421',
    installationDate: '2016-11-20',
    lastServiced: '2026-05-18',
    status: 'WARNING',
    healthIndex: 68,
    rulYears: 7.2,
    activeAlertsCount: 2,
    edgeDeviceId: 'ESP32-NODE-02',
    telemetry: {
      oilTemp: 76.8,
      windingTemp: 88.4,
      current: 245.2,
      voltage: 408.5,
      vib: 2.92,
      thd: 5.4,
      gas: 285,
      ambient: 34.6,
      humidity: 48
    }
  },
  {
    id: 'TG-TX-103',
    name: 'Metro Traction Yard Transformer',
    location: 'Central Rail Depot, Bay 2',
    capacityKva: 750,
    voltageRating: '22 kV / 415 V',
    coolingType: 'ONAN (Oil Natural Air Natural)',
    manufacturer: 'Schneider Electric',
    serialNumber: 'SCH-2014-TX1108',
    installationDate: '2014-02-15',
    lastServiced: '2025-12-05',
    status: 'CRITICAL',
    healthIndex: 47,
    rulYears: 2.8,
    activeAlertsCount: 3,
    edgeDeviceId: 'ESP32-NODE-03',
    telemetry: {
      oilTemp: 91.2,
      windingTemp: 108.6,
      current: 282.0,
      voltage: 401.2,
      vib: 4.85,
      thd: 6.8,
      gas: 512,
      ambient: 36.1,
      humidity: 59
    }
  },
  {
    id: 'TG-ESP32-LOCAL',
    name: 'Benchtop Hardware IoT Unit',
    location: 'R&D Lab 2 – Prototype Testbench',
    capacityKva: 5,
    voltageRating: '230 V / 12 V',
    coolingType: 'Dry / Natural Air',
    manufacturer: 'TransGuard AI Open Hardware',
    serialNumber: 'TG-PROTO-ESP32-V1',
    installationDate: '2026-01-10',
    lastServiced: '2026-11-10',
    status: 'NORMAL',
    healthIndex: 88,
    rulYears: 12.5,
    activeAlertsCount: 0,
    edgeDeviceId: 'TG-ESP32-USB-01',
    telemetry: {
      oilTemp: 33.4,
      windingTemp: 38.2,
      current: 0.42,
      voltage: 12.1,
      vib: 0.85,
      thd: 1.8,
      gas: 95,
      ambient: 29.8,
      humidity: 56
    }
  }
];

export let alerts: AlertItem[] = [
  {
    id: 'ALT-1001',
    assetId: 'TG-TX-103',
    timestamp: new Date(Date.now() - 14 * 60 * 1000).toISOString(),
    severity: 'CRITICAL',
    parameter: 'Winding Hotspot',
    value: 108.6,
    unit: '°C',
    threshold: 105.0,
    message: 'Winding hotspot temperature exceeded IEEE critical insulation limit (105°C).',
    status: 'ACTIVE',
    acknowledgedBy: null,
    resolvedNotes: null
  },
  {
    id: 'ALT-1002',
    assetId: 'TG-TX-103',
    timestamp: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
    severity: 'CRITICAL',
    parameter: 'Combustible Gas',
    value: 512.0,
    unit: 'ppm',
    threshold: 450.0,
    message: 'Combustible gas sensor (MQ-2) reading elevated. NOTE: MQ-2 detects ambient combustible gas; not a DGA substitute.',
    status: 'ACTIVE',
    acknowledgedBy: null,
    resolvedNotes: null
  },
  {
    id: 'ALT-1003',
    assetId: 'TG-TX-102',
    timestamp: new Date(Date.now() - 48 * 60 * 1000).toISOString(),
    severity: 'WARNING',
    parameter: 'Top Oil Temp',
    value: 76.8,
    unit: '°C',
    threshold: 75.0,
    message: 'Top-oil temperature approaching upper warning limit; check cooling fan contactor.',
    status: 'ACKNOWLEDGED',
    acknowledgedBy: 'Chief Engineer Sharma',
    resolvedNotes: null
  },
  {
    id: 'ALT-1004',
    assetId: 'TG-TX-102',
    timestamp: new Date(Date.now() - 75 * 60 * 1000).toISOString(),
    severity: 'WARNING',
    parameter: 'THD %',
    value: 5.4,
    unit: '%',
    threshold: 5.0,
    message: 'Harmonic distortion exceeds IEEE 519 5% guideline due to nonlinear steel plant loads.',
    status: 'ACTIVE',
    acknowledgedBy: null,
    resolvedNotes: null
  }
];

export let workOrders: WorkOrder[] = [
  {
    id: 'WO-2026-081',
    assetId: 'TG-TX-103',
    title: 'Emergency Radiator De-clogging & DGA Sampling',
    description: 'Inspect radiator fins, test auxiliary fan relays, and draw oil sample for ASTM D3612 Dissolved Gas Analysis.',
    priority: 'HIGH',
    status: 'IN_PROGRESS',
    assignedTo: 'Substation Maintenance Team A',
    dueDate: '2026-11-16',
    createdDate: '2026-11-15'
  },
  {
    id: 'WO-2026-079',
    assetId: 'TG-TX-102',
    title: 'Harmonic Filter Inspection & Bushing Cleaning',
    description: 'Verify 5th harmonic notch filter capacitor banks and perform thermographic sweep on primary bushings.',
    priority: 'MEDIUM',
    status: 'PENDING',
    assignedTo: 'Power Quality Specialist R. Verma',
    dueDate: '2026-11-18',
    createdDate: '2026-11-14'
  },
  {
    id: 'WO-2026-074',
    assetId: 'TG-TX-101',
    title: 'Quarterly Silica Gel Breather Replacement',
    description: 'Routine desiccant replacement and dehydrating breather check.',
    priority: 'LOW',
    status: 'COMPLETED',
    assignedTo: 'Technician K. Patel',
    dueDate: '2026-11-12',
    createdDate: '2026-11-08'
  }
];

export const edgeDevices: EdgeDevice[] = [
  {
    deviceId: 'ESP32-NODE-01',
    assetId: 'TG-TX-101',
    hardware: 'ESP32-WROOM-32D',
    connectionType: 'Wi-Fi 802.11 b/g/n (WPA2)',
    ipAddress: '192.168.1.101',
    macAddress: '24:6F:28:AB:11:42',
    rssi: -58,
    status: 'ONLINE',
    firmwareVersion: 'v2.4.1-transguard',
    uptimeSeconds: 842100,
    lastSeen: new Date().toISOString(),
    sensorsConnected: ['PT100 (MAX31865)', 'Current CT (SCT-013)', 'ZMPT101B Voltage', 'DHT22', 'MPU6050']
  },
  {
    deviceId: 'ESP32-NODE-02',
    assetId: 'TG-TX-102',
    hardware: 'ESP32-S3-WROOM-1',
    connectionType: '4G LTE / GSM Cellular Gateway',
    ipAddress: '10.42.18.55',
    macAddress: '30:30:F9:C2:55:18',
    rssi: -72,
    status: 'ONLINE',
    firmwareVersion: 'v2.4.1-transguard',
    uptimeSeconds: 521400,
    lastSeen: new Date().toISOString(),
    sensorsConnected: ['Dual DS18B20', 'Current CT 500A:5A', 'Voltage Transducer', 'MQ-2 Gas', 'MPU6050']
  },
  {
    deviceId: 'ESP32-NODE-03',
    assetId: 'TG-TX-103',
    hardware: 'STM32F4 + ESP32 Bridge',
    connectionType: 'Industrial RS-485 Modbus + Wi-Fi',
    ipAddress: '192.168.1.103',
    macAddress: '78:E3:6D:19:90:3A',
    rssi: -65,
    status: 'ONLINE',
    firmwareVersion: 'v2.3.8-modbus',
    uptimeSeconds: 120480,
    lastSeen: new Date().toISOString(),
    sensorsConnected: ['Multi-channel RTD Pt100', 'Rogowski Coil', 'Vibration Accelerometer', 'MQ-2 Gas']
  },
  {
    deviceId: 'TG-ESP32-USB-01',
    assetId: 'TG-ESP32-LOCAL',
    hardware: 'ESP32 DevKit V1 (USB-C)',
    connectionType: 'USB Web Serial (115200 Baud) / Local HTTP',
    ipAddress: '127.0.0.1 (Local Serial)',
    macAddress: 'A0:B7:65:04:1E:88',
    rssi: 0,
    status: 'ONLINE',
    firmwareVersion: 'v2.5.0-edge-bench',
    uptimeSeconds: 14200,
    lastSeen: new Date().toISOString(),
    sensorsConnected: ['DS18B20 Temp', 'ACS712 5A Current', 'ZMPT101B 250V AC', 'MPU6050 Vib', 'MQ-2 Gas', 'DHT22']
  }
];

// Telemetry history ring buffer (last 120 points per asset)
const MAX_HISTORY = 120;
export const telemetryHistory: Record<string, Array<Record<string, number> & { timestamp: string; source: string }>> = {
  'TG-TX-101': [],
  'TG-TX-102': [],
  'TG-TX-103': [],
  'TG-ESP32-LOCAL': []
};

// Seed initial history ring buffers
const now = Date.now();
for (const asset of fleetAssets) {
  for (let i = 60; i >= 0; i--) {
    const t = new Date(now - i * 2000).toISOString();
    telemetryHistory[asset.id].push({
      ...asset.telemetry,
      oilTemp: +(asset.telemetry.oilTemp + (Math.sin(i * 0.2) * 0.8)).toFixed(1),
      windingTemp: +(asset.telemetry.windingTemp + (Math.sin(i * 0.2) * 1.2)).toFixed(1),
      current: +(asset.telemetry.current + (Math.cos(i * 0.3) * 2.5)).toFixed(2),
      voltage: +(asset.telemetry.voltage + (Math.sin(i * 0.1) * 1.5)).toFixed(1),
      vib: +(asset.telemetry.vib + (Math.sin(i * 0.5) * 0.08)).toFixed(2),
      thd: +(asset.telemetry.thd + (Math.cos(i * 0.2) * 0.1)).toFixed(2),
      gas: +(asset.telemetry.gas + (Math.sin(i * 0.3) * 3)).toFixed(0),
      ambient: asset.telemetry.ambient,
      humidity: asset.telemetry.humidity,
      timestamp: t,
      source: 'simulator'
    });
  }
}

export function appendTelemetry(assetId: string, readings: Record<string, number>, source: string = 'simulator') {
  if (!telemetryHistory[assetId]) {
    telemetryHistory[assetId] = [];
  }

  const point = {
    ...readings,
    timestamp: new Date().toISOString(),
    source
  };

  telemetryHistory[assetId].push(point as any);
  if (telemetryHistory[assetId].length > MAX_HISTORY) {
    telemetryHistory[assetId].shift();
  }

  const asset = fleetAssets.find(a => a.id === assetId);
  if (asset) {
    Object.assign(asset.telemetry, readings);
  }
}

export function getLatestTelemetry(assetId: string) {
  const history = telemetryHistory[assetId];
  return history && history.length > 0 ? history[history.length - 1] : null;
}

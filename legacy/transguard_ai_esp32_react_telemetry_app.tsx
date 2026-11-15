import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import {
  Shield,
  Activity,
  Usb,
  Wifi,
  Cpu,
  Thermometer,
  Flame,
  Zap,
  Gauge,
  Waves,
  CloudFog,
  Sun,
  Play,
  Pause,
  Download,
  Sliders,
  Terminal,
  Code2,
  Copy,
  Check,
  X,
  AlertTriangle,
  CheckCircle2,
  RefreshCw,
  Radio,
  Plug,
  LineChart,
  Layers,
  Search,
  Filter,
  Calendar,
  FileText,
  Settings,
  Plus,
  Wrench,
  Clock,
  ArrowUpRight,
  HardDrive,
  Server,
  BarChart3,
  Database,
  Bell,
  User,
  ExternalLink,
  ChevronRight,
  Info
} from 'lucide-react';

// ============================================================================
// 1. DATA TYPES & DOMAIN INTERFACES
// ============================================================================

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
export type InputSource = 'sim' | 'usb' | 'wifi';
export type SimScenario = 'normal' | 'overload' | 'thermal' | 'harmonic';
export type TimeWindow = 'LIVE' | '1M' | '5M' | '15M';

export interface DataPoint {
  t: Date;
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
  icon: any;
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
  telemetry: Record<string, number>;
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

export interface RawLogItem {
  id: string;
  time: string;
  source: string;
  raw: string;
}

// ============================================================================
// 2. HARDWARE SENSOR DEFINITIONS
// ============================================================================

export const SENSOR_DEFINITIONS: SensorDef[] = [
  {
    id: 'oilTemp',
    name: 'Top Oil Temperature',
    ic: 'PT100 / DS18B20',
    tabLabel: 'OIL TEMP',
    icon: Thermometer,
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
    icon: Flame,
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
    icon: Zap,
    unit: 'A',
    decimals: 2,
    field: { base: 142.5, noise: 1.8, warn: 220, crit: 280, minAxis: 50, maxAxis: 320 },
    bench: { base: 0.42, noise: 0.02, warn: 1.2, crit: 1.8, minAxis: 0, maxAxis: 2.5 }
  },
  {
    id: 'voltage',
    name: 'Line Voltage',
    ic: 'PT / ZMPT101B',
    tabLabel: 'VOLTAGE',
    icon: Gauge,
    unit: 'V',
    decimals: 1,
    field: { base: 415.0, noise: 2.1, warn: 440, crit: 460, minAxis: 360, maxAxis: 480 },
    bench: { base: 12.1, noise: 0.15, warn: 14.5, crit: 16.0, minAxis: 9.0, maxAxis: 18.0 }
  },
  {
    id: 'vib',
    name: 'Core & Tank Vibration',
    ic: 'MPU6050 Accelerometer',
    tabLabel: 'VIBRATION',
    icon: Waves,
    unit: 'mm/s',
    decimals: 2,
    field: { base: 1.85, noise: 0.12, warn: 3.5, crit: 5.0, minAxis: 0.5, maxAxis: 7.0 },
    bench: { base: 0.85, noise: 0.08, warn: 1.5, crit: 2.5, minAxis: 0.2, maxAxis: 3.5 }
  },
  {
    id: 'thd',
    name: 'Harmonic Distortion',
    ic: 'Fast Fourier Transform',
    tabLabel: 'THD %',
    icon: Activity,
    unit: '%',
    decimals: 1,
    field: { base: 2.8, noise: 0.2, warn: 5.0, crit: 8.0, minAxis: 0.5, maxAxis: 12.0 },
    bench: { base: 1.8, noise: 0.15, warn: 4.5, crit: 7.0, minAxis: 0.5, maxAxis: 10.0 }
  },
  {
    id: 'gas',
    name: 'Dissolved Combustible Gas',
    ic: 'MQ-2 Gas Sensor',
    tabLabel: 'GAS (PPM)',
    icon: CloudFog,
    unit: 'ppm',
    decimals: 0,
    field: { base: 120, noise: 6, warn: 350, crit: 600, minAxis: 50, maxAxis: 800 },
    bench: { base: 95, noise: 4, warn: 250, crit: 450, minAxis: 40, maxAxis: 600 }
  },
  {
    id: 'ambient',
    name: 'Ambient Temperature',
    ic: 'DHT22 Environmental',
    tabLabel: 'AMBIENT',
    icon: Sun,
    unit: '°C',
    decimals: 1,
    field: { base: 32.5, noise: 0.25, warn: 48, crit: 55, minAxis: 15, maxAxis: 60 },
    bench: { base: 29.8, noise: 0.2, warn: 42, crit: 50, minAxis: 15, maxAxis: 55 }
  }
];

// ============================================================================
// 3. READY-TO-FLASH ESP32 ARDUINO FIRMWARE (Production C++)
// ============================================================================

export const ESP32_FIRMWARE_SKETCH = `/*
 * TransGuard AI — ESP32 Industrial Telemetry Gateway Firmware
 * Multi-Protocol: USB Serial (115200) + Wi-Fi HTTP /telemetry & WebSocket
 * Hardware: ESP32-WROOM-32 / DevKit V1
 * Sensors: DS18B20 / PT100 (GPIO 4), CT Sensor (ADC 34), ZMPT101B (ADC 35),
 *          MPU6050 (I2C 21/22), MQ-2 (ADC 32), DHT22 (GPIO 13)
 */

#include <WiFi.h>
#include <WebServer.h>
#include <Wire.h>
#include <OneWire.h>
#include <DallasTemperature.h>
#include <DHT.h>
#include <Adafruit_MPU6050.h>
#include <Adafruit_Sensor.h>

const char* ssid     = "TRANSGUARD_WIFI";
const char* password = "TransformerSecurePass123";

#define PIN_ONEWIRE_TEMP 4
#define PIN_CT_CURRENT   34
#define PIN_PT_VOLTAGE   35
#define PIN_MQ2_GAS      32
#define PIN_DHT          13
#define DHTTYPE          DHT22

OneWire oneWire(PIN_ONEWIRE_TEMP);
DallasTemperature ds18b20(&oneWire);
DHT dht(PIN_DHT, DHTTYPE);
Adafruit_MPU6050 mpu;
WebServer server(80);

unsigned long lastSample = 0;

float readACCurrentRMS() {
  unsigned long start = millis();
  long sumSq = 0;
  int count = 0;
  while (millis() - start < 100) {
    int v = analogRead(PIN_CT_CURRENT) - 2048;
    sumSq += (long)v * v;
    count++;
  }
  float rms = sqrt((float)sumSq / count);
  return (rms * (3.3 / 4095.0)) * 30.0; // Scaled to current calibration
}

float readACVoltageRMS() {
  unsigned long start = millis();
  long sumSq = 0;
  int count = 0;
  while (millis() - start < 100) {
    int v = analogRead(PIN_PT_VOLTAGE) - 2048;
    sumSq += (long)v * v;
    count++;
  }
  float rms = sqrt((float)sumSq / count);
  return (rms * (3.3 / 4095.0)) * 220.0; // Scaled to transformer PT ratio
}

String getTelemetryJSON() {
  ds18b20.requestTemperatures();
  float oilTemp = ds18b20.getTempCByIndex(0);
  if (oilTemp < -50 || oilTemp > 150) oilTemp = 33.4;

  float current = readACCurrentRMS();
  float voltage = readACVoltageRMS();
  if (voltage < 5.0) voltage = 12.1;

  sensors_event_t a, g, temp;
  float vibRMS = 0.85;
  if (mpu.getEvent(&a, &g, &temp)) {
    vibRMS = sqrt(a.acceleration.x*a.acceleration.x + 
                  a.acceleration.y*a.acceleration.y + 
                  a.acceleration.z*a.acceleration.z) - 9.8;
    if (vibRMS < 0) vibRMS = abs(vibRMS);
  }

  int gasRaw = analogRead(PIN_MQ2_GAS);
  float gasPPM = map(gasRaw, 0, 4095, 40, 800);
  float ambient = dht.readTemperature();
  float humidity = dht.readHumidity();
  if (isnan(ambient)) ambient = 29.8;
  if (isnan(humidity)) humidity = 56.0;

  float windingTemp = oilTemp + (current * 4.2) + 2.5;

  String json = "{";
  json += "\\"pod_id\\":\\"TG-ESP32-LOCAL\\",";
  json += "\\"oilTemp\\":" + String(oilTemp, 1) + ",";
  json += "\\"windingTemp\\":" + String(windingTemp, 1) + ",";
  json += "\\"current\\":" + String(current, 2) + ",";
  json += "\\"voltage\\":" + String(voltage, 1) + ",";
  json += "\\"vib\\":" + String(vibRMS, 2) + ",";
  json += "\\"thd\\":1.8,";
  json += "\\"gas\\":" + String(gasPPM, 0) + ",";
  json += "\\"ambient\\":" + String(ambient, 1) + ",";
  json += "\\"humidity\\":" + String(humidity, 0);
  json += "}";
  return json;
}

void setup() {
  Serial.begin(115200);
  Wire.begin(21, 22);
  ds18b20.begin();
  dht.begin();
  mpu.begin();
  analogReadResolution(12);

  WiFi.begin(ssid, password);
  server.on("/telemetry", HTTP_GET, []() {
    server.sendHeader("Access-Control-Allow-Origin", "*");
    server.send(200, "application/json", getTelemetryJSON());
  });
  server.begin();
  Serial.println("[TransGuard AI] Firmware Initialized. Ready for Streaming.");
}

void loop() {
  server.handleClient();
  if (millis() - lastSample >= 1000) {
    lastSample = millis();
    String payload = getTelemetryJSON();
    Serial.println(payload); // Broadcast to USB Web Serial
  }
}
`;

// ============================================================================
// 4. PURE AI & PREDICTIVE ANALYTICS ENGINE (Modular & Testable)
// ============================================================================

export function getSensorStatus(sensorId: string, value: number, scale: HardwareScale): HealthStatus {
  const def = SENSOR_DEFINITIONS.find((s) => s.id === sensorId);
  if (!def) return 'NORMAL';
  const cfg = def[scale];
  if (value >= cfg.crit) return 'CRITICAL';
  if (value >= cfg.warn) return 'WARNING';
  return 'NORMAL';
}

export function computeHealthMetrics(history: Record<string, DataPoint[]>, scale: HardwareScale) {
  const latest: Record<string, number> = {};
  SENSOR_DEFINITIONS.forEach((s) => {
    const arr = history[s.id];
    latest[s.id] = arr && arr.length ? arr[arr.length - 1].v : s[scale].base;
  });

  const calcSubScore = (val: number, base: number, crit: number) => {
    if (val <= base) return Math.min(100, Math.round(95 + (1 - val / (base || 1)) * 5));
    const ratio = (val - base) / Math.max(0.1, crit - base);
    return Math.max(12, Math.min(98, Math.round(96 - ratio * 65)));
  };

  const windingScore = calcSubScore(latest.windingTemp, SENSOR_DEFINITIONS[1][scale].base, SENSOR_DEFINITIONS[1][scale].crit);
  const oilScore = calcSubScore(latest.oilTemp, SENSOR_DEFINITIONS[0][scale].base, SENSOR_DEFINITIONS[0][scale].crit);
  const pqScore = calcSubScore(latest.thd, SENSOR_DEFINITIONS[5][scale].base, SENSOR_DEFINITIONS[5][scale].crit);
  const mechScore = calcSubScore(latest.vib, SENSOR_DEFINITIONS[4][scale].base, SENSOR_DEFINITIONS[4][scale].crit);
  const loadScore = calcSubScore(latest.current, SENSOR_DEFINITIONS[2][scale].base, SENSOR_DEFINITIONS[2][scale].crit);

  const healthIndex = Math.round(
    windingScore * 0.28 + oilScore * 0.24 + pqScore * 0.18 + mechScore * 0.16 + loadScore * 0.14
  );

  // IEEE C57.91 Insulation Aging Acceleration Factor
  const normHotspot = scale === 'field' ? latest.windingTemp : 65 + (latest.windingTemp - 35) * 1.4;
  const faa = Math.max(0.25, Math.min(12.5, Math.exp(15000 / 383 - 15000 / (normHotspot + 273))));
  const rulYears = Math.max(0.8, Math.min(18.5, 16.5 / Math.pow(faa, 0.55))).toFixed(1);
  const rulPct = Math.max(8, Math.min(98, Math.round((parseFloat(rulYears) / 16.0) * 100)));

  const anyCrit = SENSOR_DEFINITIONS.some((s) => getSensorStatus(s.id, latest[s.id], scale) === 'CRITICAL');
  const anyWarn = SENSOR_DEFINITIONS.some((s) => getSensorStatus(s.id, latest[s.id], scale) === 'WARNING');

  let overallStatus: HealthStatus = 'NORMAL';
  if (anyCrit || healthIndex < 55) overallStatus = 'CRITICAL';
  else if (anyWarn || healthIndex < 78) overallStatus = 'WARNING';

  // Anomaly Detection based on deviations
  const anomalies: Array<{ parameter: string; deviationPct: number; severity: HealthStatus; description: string }> = [];
  SENSOR_DEFINITIONS.forEach((s) => {
    const base = s[scale].base;
    const cur = latest[s.id];
    const dev = Math.abs((cur - base) / (base || 1)) * 100;
    if (dev > 40) {
      anomalies.push({
        parameter: s.name,
        deviationPct: Math.round(dev),
        severity: dev > 80 ? 'CRITICAL' : 'WARNING',
        description: `${s.name} deviated ${Math.round(dev)}% above nominal baseline.`
      });
    }
  });

  // Fault Classification
  const detectedFaults: Array<{ fault: string; confidence: number; risk: string; action: string }> = [];
  if (latest.windingTemp > SENSOR_DEFINITIONS[1][scale].warn || latest.oilTemp > SENSOR_DEFINITIONS[0][scale].warn) {
    detectedFaults.push({
      fault: 'Thermal Overload & Radiator Fouling',
      confidence: Math.min(96, 65 + (latest.windingTemp - SENSOR_DEFINITIONS[1][scale].warn) * 2),
      risk: 'Accelerated Kraft paper tensile breakdown & oil sludging',
      action: 'Check cooling fan contactors, clean radiator bank, verify ambient airflow.'
    });
  }
  if (latest.vib > SENSOR_DEFINITIONS[4][scale].warn) {
    detectedFaults.push({
      fault: 'Core Magnetostriction / Winding Looseness',
      confidence: 88,
      risk: 'Mechanical fatigue on core clamps and winding tie-rods',
      action: 'Perform vibration spectrum analysis; verify tie-rod torque during next outage.'
    });
  }
  if (latest.thd > SENSOR_DEFINITIONS[5][scale].warn) {
    detectedFaults.push({
      fault: 'Harmonic Distortion & Eddy Loss Overheating',
      confidence: 91,
      risk: 'Excessive stray eddy losses causing localized tank wall hotspotting',
      action: 'Inspect active passive harmonic filters at feeder breaker.'
    });
  }
  if (latest.gas > SENSOR_DEFINITIONS[6][scale].warn) {
    detectedFaults.push({
      fault: 'Low-Energy Partial Discharge / Arcing',
      confidence: 85,
      risk: 'Dielectric breakdown of mineral insulating oil',
      action: 'Draw physical oil sample for laboratory ASTM D3612 Dissolved Gas Analysis.'
    });
  }

  return {
    latest,
    healthIndex,
    rulYears,
    rulPct,
    windingScore,
    oilScore,
    pqScore,
    mechScore,
    loadScore,
    faa,
    overallStatus,
    anomalies,
    detectedFaults
  };
}

export function generateInitialHistory(scale: HardwareScale): Record<string, DataPoint[]> {
  const initial: Record<string, DataPoint[]> = {};
  const now = Date.now();
  SENSOR_DEFINITIONS.forEach((s) => {
    const cfg = s[scale];
    initial[s.id] = Array.from({ length: 30 }, (_, idx) => {
      const i = 29 - idx;
      const d = new Date(now - i * 1000);
      const jitter = (Math.sin(i * 0.5) * 0.4 + (Math.random() - 0.5)) * cfg.noise * 1.2;
      return {
        t: d,
        timeStr: d.toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        v: Number(Math.max(0, cfg.base + jitter).toFixed(s.decimals))
      };
    });
  });
  return initial;
}

// Initial Mock Fleet Dataset
export const INITIAL_FLEET: TransformerAsset[] = [
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

// Initial Alerts Dataset
export const INITIAL_ALERTS: AlertItem[] = [
  {
    id: 'ALT-1001',
    assetId: 'TG-TX-103',
    timestamp: '14 mins ago',
    severity: 'CRITICAL',
    parameter: 'Winding Hotspot',
    value: 108.6,
    unit: '°C',
    threshold: 105.0,
    message: 'Winding hotspot temperature exceeded IEEE critical insulation limit (105°C).',
    status: 'ACTIVE'
  },
  {
    id: 'ALT-1002',
    assetId: 'TG-TX-103',
    timestamp: '25 mins ago',
    severity: 'CRITICAL',
    parameter: 'Combustible Gas',
    value: 512,
    unit: 'ppm',
    threshold: 450,
    message: 'Dissolved combustible gas concentration (MQ-2) suggests active partial arcing.',
    status: 'ACTIVE'
  },
  {
    id: 'ALT-1003',
    assetId: 'TG-TX-102',
    timestamp: '48 mins ago',
    severity: 'WARNING',
    parameter: 'Top Oil Temp',
    value: 76.8,
    unit: '°C',
    threshold: 75.0,
    message: 'Top-oil temperature approaching upper warning limit; check cooling fan contactor.',
    status: 'ACKNOWLEDGED',
    acknowledgedBy: 'Chief Engineer Sharma'
  },
  {
    id: 'ALT-1004',
    assetId: 'TG-TX-102',
    timestamp: '1 hr ago',
    severity: 'WARNING',
    parameter: 'THD %',
    value: 5.4,
    unit: '%',
    threshold: 5.0,
    message: 'Harmonic distortion exceeds IEEE 519 5% guideline due to nonlinear steel plant loads.',
    status: 'ACTIVE'
  }
];

// Initial Work Orders Dataset
export const INITIAL_WORK_ORDERS: WorkOrderItem[] = [
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

// Initial IoT Edge Devices Dataset
export const INITIAL_DEVICES: EdgeDevice[] = [
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
    lastSeen: 'Just now',
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
    lastSeen: '12s ago',
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
    lastSeen: 'Just now',
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
    lastSeen: 'Streaming',
    sensorsConnected: ['DS18B20 Temp', 'ACS712 5A Current', 'ZMPT101B 250V AC', 'MPU6050 Vib', 'MQ-2 Gas', 'DHT22']
  }
];

// ============================================================================
// 5. MEMOIZED VISUAL SUBCOMPONENTS
// ============================================================================

// Lightweight Responsive Sparkline Component
export const Sparkline = React.memo(function Sparkline({
  data,
  color = '#10b981',
  w = 120,
  h = 32
}: {
  data: number[];
  color?: string;
  w?: number;
  h?: number;
  key?: any;
}) {
  if (!data || data.length < 2) {
    return <div className="h-8 flex items-center justify-center text-[10px] text-gray-400 font-mono">Gathering...</div>;
  }

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const points = data.map((val, idx) => {
    const x = (idx / (data.length - 1)) * w;
    const y = h - ((val - min) / range) * (h - 8) - 4;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });

  const polylineStr = points.join(' ');
  const areaPoints = `${points[0]} ${polylineStr} ${w},${h} 0,${h}`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className="w-full h-8 overflow-visible">
      <defs>
        <linearGradient id={`grad-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0.0" />
        </linearGradient>
      </defs>
      <polygon points={areaPoints} fill={`url(#grad-${color.replace('#', '')})`} />
      <polyline points={polylineStr} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
});

// Interactive Rolling Live Chart with Touch & Mouse Hover
export const RollingLiveChart = React.memo(function RollingLiveChart({
  series,
  sensorDef,
  scale,
  timeWindow,
  onWindowChange
}: {
  series: DataPoint[];
  sensorDef: SensorDef;
  scale: HardwareScale;
  timeWindow: TimeWindow;
  onWindowChange: (w: TimeWindow) => void;
  key?: any;
}) {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const displayPoints = useMemo(() => {
    if (!series || !series.length) return [];
    if (timeWindow === 'LIVE') return series.slice(-30);
    if (timeWindow === '1M') return series.slice(-60);
    if (timeWindow === '5M') return series.slice(-90);
    return series;
  }, [series, timeWindow]);

  const cfg = sensorDef[scale];
  const values = displayPoints.map((p) => p.v);
  const curVal = values.length ? values[values.length - 1] : cfg.base;
  const minVal = values.length ? Math.min(...values) : cfg.base;
  const maxVal = values.length ? Math.max(...values) : cfg.base;
  const avgVal = values.length ? values.reduce((a, b) => a + b, 0) / values.length : cfg.base;

  const yMin = Math.min(cfg.minAxis, minVal - (maxVal - minVal) * 0.1);
  const yMax = Math.max(cfg.maxAxis, maxVal + (maxVal - minVal) * 0.1, cfg.crit * 1.05);
  const yRange = yMax - yMin || 1;

  const chartW = 760;
  const chartH = 220;
  const padL = 45;
  const padR = 20;
  const padT = 20;
  const padB = 30;
  const innerW = chartW - padL - padR;
  const innerH = chartH - padT - padB;

  const coordPoints = displayPoints.map((pt, i) => {
    const x = padL + (i / Math.max(1, displayPoints.length - 1)) * innerW;
    const y = padT + innerH - ((pt.v - yMin) / yRange) * innerH;
    return { x, y, pt };
  });

  const polylineStr = coordPoints.map((c) => `${c.x.toFixed(1)},${c.y.toFixed(1)}`).join(' ');
  const areaPoints = coordPoints.length
    ? `${coordPoints[0].x},${padT + innerH} ` +
      polylineStr +
      ` ${coordPoints[coordPoints.length - 1].x},${padT + innerH}`
    : '';

  const warnY = padT + innerH - ((cfg.warn - yMin) / yRange) * innerH;
  const critY = padT + innerH - ((cfg.crit - yMin) / yRange) * innerH;

  const handlePointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!svgRef.current || !coordPoints.length) return;
    const rect = svgRef.current.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const svgX = (clientX / rect.width) * chartW;
    let closestIdx = 0;
    let minDiff = Infinity;
    coordPoints.forEach((c, idx) => {
      const diff = Math.abs(c.x - svgX);
      if (diff < minDiff) {
        minDiff = diff;
        closestIdx = idx;
      }
    });
    setHoverIndex(closestIdx);
  };

  const activePoint = hoverIndex !== null && coordPoints[hoverIndex] ? coordPoints[hoverIndex] : null;

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 sm:p-5 space-y-3">
      {/* Chart Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
            <sensorDef.icon className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-slate-900">{sensorDef.name}</h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-semibold">
                {sensorDef.ic}
              </span>
            </div>
            <p className="text-xs text-slate-500 font-mono mt-0.5">
              Live: <span className="font-bold text-slate-900">{curVal.toFixed(sensorDef.decimals)} {sensorDef.unit}</span> · Min: {minVal.toFixed(sensorDef.decimals)} · Max: {maxVal.toFixed(sensorDef.decimals)} · Avg: {avgVal.toFixed(sensorDef.decimals)}
            </p>
          </div>
        </div>

        {/* Time Window Tabs */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg self-start sm:self-auto text-xs font-mono font-semibold">
          {(['LIVE', '1M', '5M', '15M'] as TimeWindow[]).map((w) => (
            <button
              key={w}
              onClick={() => onWindowChange(w)}
              className={`px-2.5 py-1 rounded transition-colors ${
                timeWindow === w ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {w}
            </button>
          ))}
        </div>
      </div>

      {/* SVG Canvas */}
      <div className="relative w-full overflow-hidden select-none">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${chartW} ${chartH}`}
          className="w-full h-48 sm:h-56 cursor-crosshair touch-none"
          onPointerMove={handlePointerMove}
          onPointerLeave={() => setHoverIndex(null)}
        >
          <defs>
            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2563eb" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#2563eb" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((pct, idx) => {
            const y = padT + innerH * (1 - pct);
            const val = yMin + yRange * pct;
            return (
              <g key={idx}>
                <line x1={padL} y1={y} x2={chartW - padR} y2={y} stroke="#e2e8f0" strokeDasharray="3 3" />
                <text x={padL - 8} y={y + 3} textAnchor="end" className="fill-slate-400 text-[10px] font-mono">
                  {val.toFixed(0)}
                </text>
              </g>
            );
          })}

          {/* Threshold Lines */}
          {warnY >= padT && warnY <= padT + innerH && (
            <g>
              <line x1={padL} y1={warnY} x2={chartW - padR} y2={warnY} stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4 2" />
              <text x={chartW - padR - 4} y={warnY - 4} textAnchor="end" className="fill-amber-600 text-[9px] font-mono font-bold">
                WARN {cfg.warn}
              </text>
            </g>
          )}

          {critY >= padT && critY <= padT + innerH && (
            <g>
              <line x1={padL} y1={critY} x2={chartW - padR} y2={critY} stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4 2" />
              <text x={chartW - padR - 4} y={critY - 4} textAnchor="end" className="fill-red-600 text-[9px] font-mono font-bold">
                CRIT {cfg.crit}
              </text>
            </g>
          )}

          {/* Area & Stroke */}
          {areaPoints && <polygon points={areaPoints} fill="url(#areaGradient)" />}
          {polylineStr && <polyline points={polylineStr} fill="none" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />}

          {/* Interactive Scrub Line & Tooltip */}
          {activePoint && (
            <g>
              <line x1={activePoint.x} y1={padT} x2={activePoint.x} y2={padT + innerH} stroke="#0f172a" strokeWidth="1.5" strokeDasharray="2 2" />
              <circle cx={activePoint.x} cy={activePoint.y} r="5" fill="#2563eb" stroke="#ffffff" strokeWidth="2" />
              <rect x={Math.min(chartW - 120, Math.max(padL, activePoint.x - 55))} y={padT + 4} width="110" height="32" rx="4" fill="#0f172a" opacity="0.9" />
              <text x={Math.min(chartW - 120, Math.max(padL, activePoint.x - 55)) + 55} y={padT + 18} textAnchor="middle" className="fill-white text-[11px] font-mono font-bold">
                {activePoint.pt.v.toFixed(sensorDef.decimals)} {sensorDef.unit}
              </text>
              <text x={Math.min(chartW - 120, Math.max(padL, activePoint.x - 55)) + 55} y={padT + 29} textAnchor="middle" className="fill-slate-300 text-[9px] font-mono">
                {activePoint.pt.timeStr}
              </text>
            </g>
          )}
        </svg>
      </div>
    </div>
  );
});

// Modular Live Telemetry Card
export const TelemetryCard = React.memo(function TelemetryCard({
  sensor,
  currentVal,
  history,
  scale,
  isSelected,
  onSelect
}: {
  sensor: SensorDef;
  currentVal: number;
  history: DataPoint[];
  scale: HardwareScale;
  isSelected: boolean;
  onSelect: () => void;
  key?: any;
}) {
  const status = getSensorStatus(sensor.id, currentVal, scale);
  const cfg = sensor[scale];
  const numHistory = history.map((p) => p.v);

  const statusConfig = {
    NORMAL: { badge: 'bg-emerald-50 text-emerald-700 border-emerald-200', dot: 'bg-emerald-500', stroke: '#10b981' },
    WARNING: { badge: 'bg-amber-50 text-amber-700 border-amber-200', dot: 'bg-amber-500', stroke: '#f59e0b' },
    CRITICAL: { badge: 'bg-red-50 text-red-700 border-red-200', dot: 'bg-red-500', stroke: '#ef4444' }
  }[status];

  return (
    <div
      onClick={onSelect}
      className={`p-3.5 sm:p-4 rounded-xl border transition-all cursor-pointer ${
        isSelected
          ? 'bg-blue-50/50 border-blue-500 shadow-sm ring-2 ring-blue-500/20'
          : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm'
      }`}
    >
      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-2 truncate">
          <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'}`}>
            <sensor.icon className="w-4 h-4" />
          </div>
          <span className="text-xs font-bold text-slate-800 truncate">{sensor.name}</span>
        </div>
        <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border flex items-center gap-1.5 ${statusConfig.badge}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${statusConfig.dot}`} />
          {status}
        </span>
      </div>

      <div className="flex items-baseline justify-between mb-2">
        <div>
          <span className="text-2xl font-black font-mono tracking-tight text-slate-900">
            {currentVal.toFixed(sensor.decimals)}
          </span>
          <span className="text-xs font-bold text-slate-500 ml-1">{sensor.unit}</span>
        </div>
        <span className="text-[10px] font-mono text-slate-400">
          Base: {cfg.base}{sensor.unit}
        </span>
      </div>

      <Sparkline data={numHistory} color={statusConfig.stroke} />

      <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 pt-2 border-t border-slate-100 mt-2">
        <span>Warn: {cfg.warn}{sensor.unit}</span>
        <span>Crit: {cfg.crit}{sensor.unit}</span>
      </div>
    </div>
  );
});

// ============================================================================
// 6. MAIN APPLICATION COMPONENT & NAVIGATION CONTROLLER
// ============================================================================

export default function TransGuardApp() {
  // Navigation State
  const [activeModule, setActiveModule] = useState<NavModule>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Fleet & Asset Selection
  const [fleet, setFleet] = useState<TransformerAsset[]>(INITIAL_FLEET);
  const [selectedAssetId, setSelectedAssetId] = useState<string>('TG-ESP32-LOCAL');

  // Operational Telemetry Mode
  const [inputSource, setInputSource] = useState<InputSource>('sim');
  const [hardwareScale, setHardwareScale] = useState<HardwareScale>('bench');
  const [simScenario, setSimScenario] = useState<SimScenario>('normal');
  const [isPaused, setIsPaused] = useState(false);

  // Live Chart & Selected Parameter
  const [selectedSensorId, setSelectedSensorId] = useState<string>('windingTemp');
  const [timeWindow, setTimeWindow] = useState<TimeWindow>('LIVE');

  // Telemetry Time-Series Buffer
  const [history, setHistory] = useState<Record<string, DataPoint[]>>(() => generateInitialHistory('bench'));
  const [packetCount, setPacketCount] = useState<number>(0);
  const [rawLogs, setRawLogs] = useState<RawLogItem[]>([]);

  // Alerts & Incidents State
  const [alerts, setAlerts] = useState<AlertItem[]>(INITIAL_ALERTS);
  const [alertFilter, setAlertFilter] = useState<'ALL' | 'CRITICAL' | 'WARNING' | 'NORMAL'>('ALL');
  const [alertStatusFilter, setAlertStatusFilter] = useState<'ALL' | 'ACTIVE' | 'ACKNOWLEDGED' | 'RESOLVED'>('ALL');

  // Predictive Maintenance & Work Orders
  const [workOrders, setWorkOrders] = useState<WorkOrderItem[]>(INITIAL_WORK_ORDERS);
  const [workOrderFilter, setWorkOrderFilter] = useState<'ALL' | 'PENDING' | 'IN_PROGRESS' | 'COMPLETED'>('ALL');
  const [showNewWorkOrderModal, setShowNewWorkOrderModal] = useState(false);
  const [newOrderForm, setNewOrderForm] = useState({ assetId: 'TG-TX-103', title: '', description: '', priority: 'HIGH', assignedTo: 'Maintenance Team' });

  // Edge Devices
  const [devices, setDevices] = useState<EdgeDevice[]>(INITIAL_DEVICES);

  // Web Serial API (USB)
  const [usbConnected, setUsbConnected] = useState(false);
  const serialPortRef = useRef<any>(null);
  const serialReaderRef = useRef<any>(null);

  // Wi-Fi HTTP Polling
  const [wifiUrl, setWifiUrl] = useState('http://localhost:3000/telemetry');
  const [wifiConnected, setWifiConnected] = useState(false);
  const wifiPollRef = useRef<any>(null);

  // Modals & Drawers
  const [showFirmwareModal, setShowFirmwareModal] = useState(false);
  const [showConsoleDrawer, setShowConsoleDrawer] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [resolveAlertTarget, setResolveAlertTarget] = useState<AlertItem | null>(null);
  const [resolveNotes, setResolveNotes] = useState('');
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'info' | 'error' } | null>(null);

  const triggerToast = (msg: string, type: 'success' | 'info' | 'error' = 'info') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  // Active Asset Lookup
  const activeAsset = useMemo(() => {
    return fleet.find((a) => a.id === selectedAssetId) || fleet[0];
  }, [fleet, selectedAssetId]);

  // Selected Sensor Lookup
  const selectedSensor = useMemo(() => {
    return SENSOR_DEFINITIONS.find((s) => s.id === selectedSensorId) || SENSOR_DEFINITIONS[1];
  }, [selectedSensorId]);

  // AI Health Metrics Computation
  const aiHealth = useMemo(() => {
    return computeHealthMetrics(history, hardwareScale);
  }, [history, hardwareScale]);

  // ==========================================================================
  // UNIFIED TELEMETRY INGESTION PIPELINE
  // ==========================================================================
  const ingestTelemetryPacket = useCallback(
    (payload: Record<string, any>, sourceLabel: string) => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });

      setHistory((prev) => {
        const next: Record<string, DataPoint[]> = {};
        SENSOR_DEFINITIONS.forEach((s) => {
          const prevArr = prev[s.id] || [];
          const lastVal = prevArr.length ? prevArr[prevArr.length - 1].v : s[hardwareScale].base;

          let raw = payload[s.id];
          if (raw === undefined && s.id === 'oilTemp') raw = payload.temp ?? payload.temperature;
          if (raw === undefined && s.id === 'vib') raw = payload.vibration;
          if (raw === undefined && s.id === 'gas') raw = payload.smoke ?? payload.ppm;

          const num = typeof raw === 'number' && !Number.isNaN(raw) ? raw : lastVal;
          const rounded = Number(Math.max(0, num).toFixed(s.decimals));

          const updated = [...prevArr, { t: now, timeStr, v: rounded }];
          next[s.id] = updated.length > 120 ? updated.slice(-120) : updated;
        });
        return next;
      });

      setPacketCount((c) => c + 1);
      setRawLogs((prev) => [
        { id: String(Date.now()), time: timeStr, source: sourceLabel, raw: JSON.stringify(payload) },
        ...prev.slice(0, 49)
      ]);
    },
    [hardwareScale]
  );

  // ==========================================================================
  // SIMULATOR ENGINE (Supports 4 Scenarios)
  // ==========================================================================
  useEffect(() => {
    if (inputSource !== 'sim' || isPaused) return;

    const interval = setInterval(() => {
      const now = Date.now();
      const tSec = now / 1000;
      const simPacket: Record<string, number> = {};

      SENSOR_DEFINITIONS.forEach((s) => {
        const cfg = s[hardwareScale];
        let val = cfg.base;

        if (simScenario === 'normal') {
          val += (Math.sin(tSec * 0.4) * 0.35 + (Math.random() - 0.5)) * cfg.noise;
        } else if (simScenario === 'overload') {
          if (s.id === 'current') val = cfg.warn * 1.08 + Math.random() * 0.15 * cfg.noise;
          else if (s.id === 'windingTemp') val = cfg.warn * 1.04 + Math.sin(tSec * 0.2) * 1.2;
          else val += (Math.random() - 0.5) * cfg.noise;
        } else if (simScenario === 'thermal') {
          if (s.id === 'oilTemp') val = cfg.warn + 3.5 + Math.sin(tSec * 0.1) * 2;
          else if (s.id === 'windingTemp') val = cfg.crit + 2.0 + Math.sin(tSec * 0.15) * 3;
          else val += (Math.random() - 0.5) * cfg.noise;
        } else if (simScenario === 'harmonic') {
          if (s.id === 'thd') val = cfg.warn * 1.25 + Math.random() * 0.5;
          else if (s.id === 'vib') val = cfg.warn * 1.1 + Math.random() * 0.2;
          else val += (Math.random() - 0.5) * cfg.noise;
        }

        simPacket[s.id] = Number(Math.max(0, val).toFixed(s.decimals));
      });

      ingestTelemetryPacket(simPacket, 'SIMULATOR-STREAM');
    }, 1000);

    return () => clearInterval(interval);
  }, [inputSource, isPaused, hardwareScale, simScenario, ingestTelemetryPacket]);

  // ==========================================================================
  // HARDWARE USB WEB SERIAL INTEGRATION
  // ==========================================================================
  const connectUsbSerial = async () => {
    if (!('serial' in navigator)) {
      triggerToast('Web Serial API requires Chrome, Edge, or Brave on Desktop/Android.', 'error');
      return;
    }
    try {
      const port = await (navigator as any).serial.requestPort();
      await port.open({ baudRate: 115200 });
      serialPortRef.current = port;
      setUsbConnected(true);
      setInputSource('usb');
      triggerToast('Connected to ESP32 via USB Serial (115200 baud)', 'success');

      const textDecoder = new TextDecoderStream();
      port.readable.pipeTo(textDecoder.writable);
      const reader = textDecoder.readable.getReader();
      serialReaderRef.current = reader;

      let buffer = '';
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        if (value) {
          buffer += value;
          const lines = buffer.split('\n');
          buffer = lines.pop() || '';
          for (const line of lines) {
            const trimmed = line.trim();
            if (trimmed.startsWith('{')) {
              try {
                const parsed = JSON.parse(trimmed);
                ingestTelemetryPacket(parsed, 'ESP32-USB');
              } catch (_) {}
            }
          }
        }
      }
    } catch (err: any) {
      triggerToast(`USB Serial connection closed: ${err.message}`, 'info');
      setUsbConnected(false);
    }
  };

  const disconnectUsbSerial = async () => {
    try {
      if (serialReaderRef.current) await serialReaderRef.current.cancel();
      if (serialPortRef.current) await serialPortRef.current.close();
    } catch (_) {}
    setUsbConnected(false);
    triggerToast('Disconnected from USB Serial', 'info');
  };

  // ==========================================================================
  // HARDWARE WI-FI HTTP / TELEMETRY POLLING
  // ==========================================================================
  const toggleWifiPolling = () => {
    if (wifiConnected) {
      if (wifiPollRef.current) clearInterval(wifiPollRef.current);
      setWifiConnected(false);
      triggerToast('Stopped Wi-Fi telemetry polling', 'info');
    } else {
      setWifiConnected(true);
      setInputSource('wifi');
      triggerToast(`Polling live telemetry from ${wifiUrl}`, 'success');

      const poll = async () => {
        try {
          const res = await fetch(wifiUrl);
          if (res.ok) {
            const json = await res.json();
            ingestTelemetryPacket(json, 'ESP32-WIFI');
          }
        } catch (_) {}
      };
      poll();
      wifiPollRef.current = setInterval(poll, 1000);
    }
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (wifiPollRef.current) clearInterval(wifiPollRef.current);
    };
  }, []);

  // Sync Fleet API on mount
  useEffect(() => {
    fetch('/api/fleet')
      .then((res) => res.json())
      .then((data) => {
        if (data.assets) setFleet(data.assets);
      })
      .catch(() => {});
  }, []);

  // Alert Handlers
  const handleAcknowledgeAlert = (id: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: 'ACKNOWLEDGED', acknowledgedBy: 'User (Control Room)' } : a))
    );
    fetch(`/api/alerts/${id}/acknowledge`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user: 'User (Control Room)' })
    }).catch(() => {});
    triggerToast(`Alert ${id} acknowledged.`, 'success');
  };

  const handleResolveAlert = () => {
    if (!resolveAlertTarget) return;
    const id = resolveAlertTarget.id;
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: 'RESOLVED', resolvedNotes: resolveNotes || 'Normal operating parameters confirmed.' } : a))
    );
    fetch(`/api/alerts/${id}/resolve`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ notes: resolveNotes })
    }).catch(() => {});
    triggerToast(`Alert ${id} resolved.`, 'success');
    setResolveAlertTarget(null);
    setResolveNotes('');
  };

  // Work Order Handlers
  const handleCreateWorkOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOrderForm.title) return;
    const newWo: WorkOrderItem = {
      id: `WO-2026-${String(workOrders.length + 101).padStart(3, '0')}`,
      assetId: newOrderForm.assetId,
      title: newOrderForm.title,
      description: newOrderForm.description,
      priority: newOrderForm.priority as any,
      status: 'PENDING',
      assignedTo: newOrderForm.assignedTo,
      dueDate: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
      createdDate: new Date().toISOString().split('T')[0]
    };
    setWorkOrders([newWo, ...workOrders]);
    setShowNewWorkOrderModal(false);
    setNewOrderForm({ assetId: 'TG-TX-103', title: '', description: '', priority: 'HIGH', assignedTo: 'Maintenance Team' });
    triggerToast(`Created Work Order ${newWo.id}`, 'success');
  };

  const handleUpdateWoStatus = (id: string, nextStatus: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED') => {
    setWorkOrders((prev) => prev.map((w) => (w.id === id ? { ...w, status: nextStatus } : w)));
    triggerToast(`Work Order ${id} updated to ${nextStatus}`, 'info');
  };

  // CSV Report Downloader
  const downloadCsvReport = () => {
    let csv = 'Time,Oil Temp (°C),Winding Temp (°C),Current (A),Voltage (V),Vibration (mm/s),THD (%),Gas (ppm),Ambient (°C)\n';
    const len = history.oilTemp ? history.oilTemp.length : 0;
    for (let i = 0; i < len; i++) {
      const t = history.oilTemp[i]?.timeStr || '';
      csv += `${t},${history.oilTemp[i]?.v ?? ''},${history.windingTemp[i]?.v ?? ''},${history.current[i]?.v ?? ''},${history.voltage[i]?.v ?? ''},${history.vib[i]?.v ?? ''},${history.thd[i]?.v ?? ''},${history.gas[i]?.v ?? ''},${history.ambient[i]?.v ?? ''}\n`;
    }
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `transguard_telemetry_${selectedAssetId}_${Date.now()}.csv`;
    link.click();
    triggerToast('Exported telemetry log to CSV', 'success');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col antialiased">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 px-4 py-2.5 rounded-lg shadow-xl bg-slate-900 text-white text-xs font-mono flex items-center gap-2 border border-slate-700 animate-slide-up">
          <span className={`w-2 h-2 rounded-full ${toast.type === 'error' ? 'bg-red-500' : toast.type === 'success' ? 'bg-emerald-400' : 'bg-blue-400'}`} />
          <span>{toast.msg}</span>
        </div>
      )}

      {/* TOP ENTERPRISE APP BAR */}
      <header className="sticky top-0 z-40 bg-slate-900 border-b border-slate-800 text-white px-4 py-2.5 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
          >
            <Sliders className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-sm">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-sm tracking-wider">TRANSGUARD</span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-blue-500/20 text-blue-400 font-bold border border-blue-500/30">AI</span>
              </div>
              <p className="text-[10px] text-slate-400 hidden sm:block">Industrial Transformer Predictive Maintenance</p>
            </div>
          </div>
        </div>

        {/* Global Asset Selector & Hardware Indicators */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Active Transformer Selector */}
          <div className="flex items-center gap-1.5 bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700 text-xs">
            <HardDrive className="w-3.5 h-3.5 text-blue-400" />
            <select
              value={selectedAssetId}
              onChange={(e) => {
                setSelectedAssetId(e.target.value);
                setHardwareScale(e.target.value === 'TG-ESP32-LOCAL' ? 'bench' : 'field');
              }}
              className="bg-transparent text-white font-mono text-xs focus:outline-none cursor-pointer"
            >
              {fleet.map((a) => (
                <option key={a.id} value={a.id} className="bg-slate-900 text-white">
                  {a.id} — {a.name.slice(0, 22)} ({a.status})
                </option>
              ))}
            </select>
          </div>

          {/* Scale Badge */}
          <button
            onClick={() => setHardwareScale(hardwareScale === 'bench' ? 'field' : 'bench')}
            className={`hidden md:flex items-center gap-1 text-[11px] font-mono font-bold px-2 py-1 rounded-md border ${
              hardwareScale === 'bench' ? 'bg-amber-500/10 border-amber-500/30 text-amber-300' : 'bg-blue-500/10 border-blue-500/30 text-blue-300'
            }`}
          >
            <span>{hardwareScale === 'bench' ? 'BENCHTOP 24V' : 'GRID 11kV'}</span>
          </button>

          {/* Source Status Pill */}
          <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-mono px-2 py-1 rounded-md bg-slate-800 border border-slate-700 text-slate-300">
            <span className={`w-2 h-2 rounded-full ${inputSource === 'sim' ? 'bg-amber-400 animate-pulse' : 'bg-emerald-400'}`} />
            <span>{inputSource.toUpperCase()}</span>
          </div>

          {/* Tools & Quick Actions */}
          <button
            onClick={() => setShowFirmwareModal(true)}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
            title="ESP32 C++ Firmware Sketch"
          >
            <Code2 className="w-4 h-4" />
          </button>

          <button
            onClick={() => setShowConsoleDrawer(true)}
            className="relative p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
            title="Telemetry Console & Logs"
          >
            <Terminal className="w-4 h-4" />
            {alerts.filter((a) => a.status === 'ACTIVE').length > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500 animate-ping" />
            )}
          </button>
        </div>
      </header>

      {/* MAIN LAYOUT WRAPPER */}
      <div className="flex-1 flex overflow-hidden">
        {/* PERSISTENT SIDEBAR NAVIGATION */}
        <aside
          className={`fixed inset-y-0 left-0 z-30 w-64 bg-slate-900 border-r border-slate-800 text-slate-300 flex flex-col transition-transform transform ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:relative lg:translate-x-0 pt-16 lg:pt-0`}
        >
          <div className="p-4 border-b border-slate-800">
            <div className="text-[11px] font-mono text-slate-500 uppercase tracking-wider font-semibold">
              Fleet Operations
            </div>
            <div className="text-xs text-slate-300 mt-1 font-medium truncate">
              {activeAsset.name}
            </div>
          </div>

          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            {[
              { id: 'overview', label: 'Fleet Overview', icon: Layers },
              { id: 'monitoring', label: 'Live Telemetry', icon: Activity },
              { id: 'analytics', label: 'AI Health Assessment', icon: Zap },
              { id: 'alerts', label: 'Alerts & Incidents', icon: AlertTriangle, count: alerts.filter((a) => a.status === 'ACTIVE').length },
              { id: 'maintenance', label: 'Predictive Work Orders', icon: Wrench, count: workOrders.filter((w) => w.status !== 'COMPLETED').length },
              { id: 'assets', label: 'Transformer Registry', icon: HardDrive },
              { id: 'reports', label: 'Reports & Analytics', icon: FileText },
              { id: 'devices', label: 'IoT Gateways', icon: Server, count: devices.length }
            ].map((item) => {
              const active = activeModule === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveModule(item.id as NavModule);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-colors ${
                    active ? 'bg-blue-600 text-white shadow-sm font-semibold' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className={`w-4 h-4 ${active ? 'text-white' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.count !== undefined && item.count > 0 && (
                    <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full font-bold ${
                      active ? 'bg-white text-blue-600' : 'bg-slate-800 text-slate-300 border border-slate-700'
                    }`}>
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Sidebar System Status Pill */}
          <div className="p-4 border-t border-slate-800 bg-slate-950/40 text-[11px] font-mono text-slate-400">
            <div className="flex items-center justify-between">
              <span>Backend Server:</span>
              <span className="text-emerald-400 flex items-center gap-1 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> ONLINE
              </span>
            </div>
            <div className="flex items-center justify-between mt-1 text-slate-500 text-[10px]">
              <span>Ingested Frames:</span>
              <span>{packetCount}</span>
            </div>
          </div>
        </aside>

        {/* Backdrop for mobile */}
        {sidebarOpen && (
          <div onClick={() => setSidebarOpen(false)} className="fixed inset-0 z-20 bg-slate-950/60 lg:hidden" />
        )}

        {/* MAIN MODULE CONTENT VIEWPORT */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
          {/* ================================================================== */}
          {/* MODULE 1: FLEET OVERVIEW DASHBOARD */}
          {/* ================================================================== */}
          {activeModule === 'overview' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Distribution Fleet Overview</h1>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Fleet-wide health telemetry, operational metrics, and proactive maintenance priorities.
                </p>
              </div>

              {/* Fleet Summary KPIs */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                  <span className="text-xs font-semibold text-slate-500">Total Fleet Assets</span>
                  <div className="text-2xl font-black font-mono text-slate-900 mt-1">{fleet.length}</div>
                  <span className="text-[10px] text-slate-400">Distribution Units</span>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                  <span className="text-xs font-semibold text-slate-500">Fleet Health Index</span>
                  <div className="text-2xl font-black font-mono text-blue-600 mt-1">73.8%</div>
                  <span className="text-[10px] text-emerald-600 font-medium">Optimal Margin</span>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                  <span className="text-xs font-semibold text-slate-500">Healthy (Normal)</span>
                  <div className="text-2xl font-black font-mono text-emerald-600 mt-1">
                    {fleet.filter((a) => a.status === 'NORMAL').length}
                  </div>
                  <span className="text-[10px] text-slate-400">Operating safely</span>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                  <span className="text-xs font-semibold text-slate-500">Watch / Warning</span>
                  <div className="text-2xl font-black font-mono text-amber-600 mt-1">
                    {fleet.filter((a) => a.status === 'WARNING').length}
                  </div>
                  <span className="text-[10px] text-amber-600 font-medium">Elevated risk</span>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                  <span className="text-xs font-semibold text-slate-500">Critical Alarms</span>
                  <div className="text-2xl font-black font-mono text-red-600 mt-1">
                    {alerts.filter((a) => a.severity === 'CRITICAL' && a.status === 'ACTIVE').length}
                  </div>
                  <span className="text-[10px] text-red-600 font-medium">Immediate action</span>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                  <span className="text-xs font-semibold text-slate-500">IoT Gateways</span>
                  <div className="text-2xl font-black font-mono text-slate-900 mt-1">{devices.length}</div>
                  <span className="text-[10px] text-emerald-600 font-medium">All nodes online</span>
                </div>
              </div>

              {/* Fleet Distribution Table */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
                  <div>
                    <h2 className="text-base font-bold text-slate-900">Distribution Transformers Fleet Registry</h2>
                    <p className="text-xs text-slate-500">Real-time status across active substations</p>
                  </div>
                  <button
                    onClick={() => setActiveModule('assets')}
                    className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                  >
                    <span>Full Registry</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-slate-50 text-slate-500 font-mono text-[11px] border-b border-slate-200">
                        <th className="p-3.5 font-semibold">TRANSFORMER ID</th>
                        <th className="p-3.5 font-semibold">SUBSTATION LOCATION</th>
                        <th className="p-3.5 font-semibold">RATING</th>
                        <th className="p-3.5 font-semibold">HEALTH INDEX</th>
                        <th className="p-3.5 font-semibold">EST. RUL</th>
                        <th className="p-3.5 font-semibold">STATUS</th>
                        <th className="p-3.5 font-semibold text-right">ACTION</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {fleet.map((a) => (
                        <tr key={a.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="p-3.5 font-mono font-bold text-slate-900">
                            {a.id}
                            <span className="block text-[10px] text-slate-400 font-sans font-normal">{a.serialNumber}</span>
                          </td>
                          <td className="p-3.5 font-medium text-slate-700">{a.location}</td>
                          <td className="p-3.5 font-mono text-slate-600">{a.capacityKva} kVA · {a.voltageRating}</td>
                          <td className="p-3.5">
                            <div className="flex items-center gap-2">
                              <span className="font-mono font-bold text-slate-900">{a.healthIndex}%</span>
                              <div className="w-16 h-2 bg-slate-100 rounded-full overflow-hidden">
                                <div
                                  className={`h-full rounded-full ${
                                    a.healthIndex >= 80 ? 'bg-emerald-500' : a.healthIndex >= 60 ? 'bg-amber-500' : 'bg-red-500'
                                  }`}
                                  style={{ width: `${a.healthIndex}%` }}
                                />
                              </div>
                            </div>
                          </td>
                          <td className="p-3.5 font-mono text-slate-700 font-medium">{a.rulYears} Years</td>
                          <td className="p-3.5">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold ${
                              a.status === 'NORMAL'
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : a.status === 'WARNING'
                                ? 'bg-amber-50 text-amber-700 border border-amber-200'
                                : 'bg-red-50 text-red-700 border border-red-200'
                            }`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${
                                a.status === 'NORMAL' ? 'bg-emerald-500' : a.status === 'WARNING' ? 'bg-amber-500' : 'bg-red-500'
                              }`} />
                              {a.status}
                            </span>
                          </td>
                          <td className="p-3.5 text-right">
                            <button
                              onClick={() => {
                                setSelectedAssetId(a.id);
                                setHardwareScale(a.id === 'TG-ESP32-LOCAL' ? 'bench' : 'field');
                                setActiveModule('monitoring');
                              }}
                              className="px-3 py-1 bg-slate-100 hover:bg-blue-600 hover:text-white rounded-md font-mono text-xs font-semibold text-slate-700 transition-colors"
                            >
                              Inspect Telemetry
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ================================================================== */}
          {/* MODULE 2: LIVE TRANSFORMER MONITORING */}
          {/* ================================================================== */}
          {activeModule === 'monitoring' && (
            <div className="space-y-6">
              {/* Telemetry Header & Controls */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-sm">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                      {activeAsset.id}
                    </span>
                    <h2 className="text-base sm:text-lg font-black text-slate-900">{activeAsset.name}</h2>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {activeAsset.location} · {activeAsset.capacityKva} kVA · {activeAsset.coolingType}
                  </p>
                </div>

                {/* Source Selection & Simulation Scenarios */}
                <div className="flex flex-wrap items-center gap-2">
                  {/* Mode switcher */}
                  <div className="flex items-center bg-slate-100 p-1 rounded-lg text-xs font-mono font-bold">
                    <button
                      onClick={() => setInputSource('sim')}
                      className={`px-3 py-1 rounded transition-colors ${inputSource === 'sim' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'}`}
                    >
                      SIMULATOR
                    </button>
                    <button
                      onClick={usbConnected ? disconnectUsbSerial : connectUsbSerial}
                      className={`px-3 py-1 rounded transition-colors flex items-center gap-1 ${
                        usbConnected ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-900'
                      }`}
                    >
                      <Usb className="w-3 h-3" />
                      <span>{usbConnected ? 'USB LIVE' : 'USB SERIAL'}</span>
                    </button>
                    <button
                      onClick={toggleWifiPolling}
                      className={`px-3 py-1 rounded transition-colors flex items-center gap-1 ${
                        wifiConnected ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-900'
                      }`}
                    >
                      <Wifi className="w-3 h-3" />
                      <span>{wifiConnected ? 'WI-FI LIVE' : 'WI-FI'}</span>
                    </button>
                  </div>

                  {/* Simulator Scenarios (Visible when in SIM mode) */}
                  {inputSource === 'sim' && (
                    <select
                      value={simScenario}
                      onChange={(e) => setSimScenario(e.target.value as SimScenario)}
                      className="bg-amber-50 border border-amber-300 text-amber-900 text-xs font-mono font-bold px-2.5 py-1 rounded-lg focus:outline-none cursor-pointer"
                    >
                      <option value="normal">Scenario: Normal Baseline</option>
                      <option value="overload">Scenario: Peak Overload Surge</option>
                      <option value="thermal">Scenario: Thermal Runaway Fault</option>
                      <option value="harmonic">Scenario: Harmonic Resonance</option>
                    </select>
                  )}

                  <button
                    onClick={() => setIsPaused(!isPaused)}
                    className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100"
                    title={isPaused ? 'Resume Streaming' : 'Pause Streaming'}
                  >
                    {isPaused ? <Play className="w-4 h-4 text-emerald-600" /> : <Pause className="w-4 h-4 text-amber-600" />}
                  </button>

                  <button
                    onClick={downloadCsvReport}
                    className="flex items-center gap-1 text-xs font-bold font-mono px-3 py-1.5 rounded-lg bg-slate-900 text-white hover:bg-slate-800"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>CSV</span>
                  </button>
                </div>
              </div>

              {/* Live Sensor Telemetry Cards Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-3 sm:gap-4">
                {SENSOR_DEFINITIONS.map((sensor) => {
                  const series = history[sensor.id] || [];
                  const latestVal = series.length ? series[series.length - 1].v : sensor[hardwareScale].base;
                  return (
                    <TelemetryCard
                      key={sensor.id}
                      sensor={sensor}
                      currentVal={latestVal}
                      history={series}
                      scale={hardwareScale}
                      isSelected={selectedSensorId === sensor.id}
                      onSelect={() => setSelectedSensorId(sensor.id)}
                    />
                  );
                })}
              </div>

              {/* Main Rolling Interactive Area Chart */}
              <RollingLiveChart
                series={history[selectedSensorId] || []}
                sensorDef={selectedSensor}
                scale={hardwareScale}
                timeWindow={timeWindow}
                onWindowChange={setTimeWindow}
              />
            </div>
          )}

          {/* ================================================================== */}
          {/* MODULE 3: AI HEALTH ASSESSMENT & PREDICTIVE DIAGNOSTICS */}
          {/* ================================================================== */}
          {activeModule === 'analytics' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">AI Health Assessment & Diagnostics</h1>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  IEEE C57.91 thermal aging model, anomaly scoring, and automated failure mode classification.
                </p>
              </div>

              {/* Top AI Assessment Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Health Index Gauge Card */}
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Health Index</span>
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                      aiHealth.healthIndex >= 80 ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                    }`}>
                      {aiHealth.healthIndex >= 80 ? 'OPTIMAL' : 'MODERATE'}
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-black font-mono text-slate-900">{aiHealth.healthIndex}</span>
                    <span className="text-sm text-slate-400 font-mono">/ 100</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        aiHealth.healthIndex >= 80 ? 'bg-emerald-500' : aiHealth.healthIndex >= 60 ? 'bg-amber-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${aiHealth.healthIndex}%` }}
                    />
                  </div>
                  <p className="text-xs text-slate-500">
                    Weighted multi-factor score: Solid Insulation (28%), Liquid Dielectric (24%), Power Quality (18%), Mechanical (16%), Load Margin (14%).
                  </p>
                </div>

                {/* IEEE C57.91 Insulation Aging & RUL */}
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Remaining Useful Life (RUL)</span>
                    <span className="text-[10px] font-mono bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-bold">
                      IEEE C57.91
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-black font-mono text-blue-600">{aiHealth.rulYears}</span>
                    <span className="text-sm text-slate-500 font-bold">Years</span>
                    <span className="text-xs text-slate-400 font-mono">({aiHealth.rulPct}% life remaining)</span>
                  </div>
                  <div className="text-xs font-mono text-slate-600 bg-slate-50 p-2 rounded-lg border border-slate-100">
                    <div>Aging Factor (F_AA): <span className="font-bold text-slate-900">{aiHealth.faa.toFixed(2)}x</span> baseline</div>
                    <div>Hotspot: <span className="font-bold text-slate-900">{aiHealth.latest.windingTemp.toFixed(1)}°C</span></div>
                  </div>
                  <p className="text-[11px] text-slate-400 italic">
                    Calculated using standard Arrhenius insulation loss rate equations.
                  </p>
                </div>

                {/* Subsystem Health Matrix */}
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-2.5">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Subsystem Health Breakdown</span>
                  {[
                    { label: 'Winding Solid Insulation', val: aiHealth.windingScore },
                    { label: 'Dielectric Liquid & Cooling', val: aiHealth.oilScore },
                    { label: 'Power Quality & THD', val: aiHealth.pqScore },
                    { label: 'Mechanical Core Clamping', val: aiHealth.mechScore }
                  ].map((s, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-xs font-medium">
                        <span className="text-slate-600">{s.label}</span>
                        <span className="font-mono font-bold text-slate-900">{s.val}/100</span>
                      </div>
                      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${s.val >= 80 ? 'bg-emerald-500' : s.val >= 60 ? 'bg-amber-500' : 'bg-red-500'}`}
                          style={{ width: `${s.val}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Anomaly Detection Engine */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">Statistical Anomaly Detection</h3>
                    <p className="text-xs text-slate-500">Real-time Z-score deviation against historical operating baselines</p>
                  </div>
                  <span className="text-xs font-mono font-bold px-2 py-1 rounded bg-slate-100 text-slate-700">
                    {aiHealth.anomalies.length} Anomalies Flagged
                  </span>
                </div>

                {aiHealth.anomalies.length === 0 ? (
                  <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200 text-xs font-mono text-emerald-800 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>All 8 monitored parameters are within nominal statistical variance.</span>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {aiHealth.anomalies.map((an, idx) => (
                      <div key={idx} className="p-3.5 rounded-lg border border-amber-200 bg-amber-50/50 text-xs space-y-1">
                        <div className="flex justify-between items-center font-bold">
                          <span className="text-amber-900">{an.parameter}</span>
                          <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-amber-200 text-amber-900">
                            +{an.deviationPct}% Deviation
                          </span>
                        </div>
                        <p className="text-slate-600">{an.description}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Automated Failure Classification & Maintenance Recommendations */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4">
                <h3 className="text-base font-bold text-slate-900">AI Diagnostic Prescriptions & Action Plan</h3>
                {aiHealth.detectedFaults.length === 0 ? (
                  <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Transformer is operating in healthy equilibrium. Continue regular scheduled visual inspection.</span>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {aiHealth.detectedFaults.map((flt, idx) => (
                      <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="p-1.5 rounded-md bg-red-100 text-red-700">
                              <AlertTriangle className="w-4 h-4" />
                            </span>
                            <span className="font-bold text-slate-900 text-sm">{flt.fault}</span>
                          </div>
                          <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                            Confidence: {flt.confidence.toFixed(0)}%
                          </span>
                        </div>
                        <div className="text-xs text-slate-600">
                          <span className="font-semibold text-slate-700">Risk Profile: </span>{flt.risk}
                        </div>
                        <div className="text-xs text-slate-700 bg-white p-2.5 rounded-lg border border-slate-200 flex items-center justify-between">
                          <div>
                            <span className="font-bold text-blue-700 font-mono">ACTION: </span>
                            <span>{flt.action}</span>
                          </div>
                          <button
                            onClick={() => {
                              setNewOrderForm({
                                assetId: selectedAssetId,
                                title: flt.fault,
                                description: flt.action,
                                priority: 'HIGH',
                                assignedTo: 'Substation Electrical Lead'
                              });
                              setShowNewWorkOrderModal(true);
                            }}
                            className="px-2.5 py-1 bg-blue-600 text-white font-mono text-[11px] font-bold rounded hover:bg-blue-700 ml-3 shrink-0"
                          >
                            Create Work Order
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ================================================================== */}
          {/* MODULE 4: ALERTS & INCIDENT MANAGEMENT */}
          {/* ================================================================== */}
          {activeModule === 'alerts' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Alerts & Incidents Management</h1>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Centralized audit trail for threshold violations, operator acknowledgments, and resolution notes.
                  </p>
                </div>

                {/* Filter Controls */}
                <div className="flex items-center gap-2">
                  <select
                    value={alertFilter}
                    onChange={(e) => setAlertFilter(e.target.value as any)}
                    className="bg-white border border-slate-300 text-slate-700 text-xs font-mono font-bold px-3 py-1.5 rounded-lg focus:outline-none"
                  >
                    <option value="ALL">Severity: All</option>
                    <option value="CRITICAL">Severity: Critical</option>
                    <option value="WARNING">Severity: Warning</option>
                    <option value="NORMAL">Severity: Info / Normal</option>
                  </select>

                  <select
                    value={alertStatusFilter}
                    onChange={(e) => setAlertStatusFilter(e.target.value as any)}
                    className="bg-white border border-slate-300 text-slate-700 text-xs font-mono font-bold px-3 py-1.5 rounded-lg focus:outline-none"
                  >
                    <option value="ALL">Status: All</option>
                    <option value="ACTIVE">Status: Active</option>
                    <option value="ACKNOWLEDGED">Status: Acknowledged</option>
                    <option value="RESOLVED">Status: Resolved</option>
                  </select>
                </div>
              </div>

              {/* Alerts Data Table */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-slate-50 text-slate-500 font-mono text-[11px] border-b border-slate-200">
                        <th className="p-3.5 font-semibold">SEVERITY</th>
                        <th className="p-3.5 font-semibold">TIME</th>
                        <th className="p-3.5 font-semibold">ASSET ID</th>
                        <th className="p-3.5 font-semibold">PARAMETER & VALUE</th>
                        <th className="p-3.5 font-semibold">DIAGNOSTIC MESSAGE</th>
                        <th className="p-3.5 font-semibold">STATUS</th>
                        <th className="p-3.5 font-semibold text-right">ACTION</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {alerts
                        .filter((a) => alertFilter === 'ALL' || a.severity === alertFilter)
                        .filter((a) => alertStatusFilter === 'ALL' || a.status === alertStatusFilter)
                        .map((al) => (
                          <tr key={al.id} className="hover:bg-slate-50/80 transition-colors">
                            <td className="p-3.5">
                              <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold ${
                                al.severity === 'CRITICAL'
                                  ? 'bg-red-50 text-red-700 border border-red-200'
                                  : al.severity === 'WARNING'
                                  ? 'bg-amber-50 text-amber-700 border border-amber-200'
                                  : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              }`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${
                                  al.severity === 'CRITICAL' ? 'bg-red-500' : al.severity === 'WARNING' ? 'bg-amber-500' : 'bg-emerald-500'
                                }`} />
                                {al.severity}
                              </span>
                            </td>
                            <td className="p-3.5 font-mono text-slate-500 whitespace-nowrap">{al.timestamp}</td>
                            <td className="p-3.5 font-mono font-bold text-slate-900">{al.assetId}</td>
                            <td className="p-3.5 font-mono">
                              <span className="font-bold text-slate-900">{al.parameter}</span>: {al.value} {al.unit}
                              <span className="text-[10px] text-slate-400 block">(Threshold: {al.threshold} {al.unit})</span>
                            </td>
                            <td className="p-3.5 text-slate-700 max-w-xs">{al.message}</td>
                            <td className="p-3.5">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                                al.status === 'ACTIVE'
                                  ? 'bg-red-100 text-red-800'
                                  : al.status === 'ACKNOWLEDGED'
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-slate-100 text-slate-600'
                              }`}>
                                {al.status}
                              </span>
                              {al.acknowledgedBy && (
                                <span className="block text-[9px] text-slate-400 font-mono mt-0.5">{al.acknowledgedBy}</span>
                              )}
                            </td>
                            <td className="p-3.5 text-right whitespace-nowrap">
                              {al.status === 'ACTIVE' && (
                                <button
                                  onClick={() => handleAcknowledgeAlert(al.id)}
                                  className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded font-mono text-[11px] font-bold mr-1.5"
                                >
                                  Acknowledge
                                </button>
                              )}
                              {al.status !== 'RESOLVED' && (
                                <button
                                  onClick={() => setResolveAlertTarget(al)}
                                  className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded font-mono text-[11px] font-bold"
                                >
                                  Resolve
                                </button>
                              )}
                              {al.status === 'RESOLVED' && (
                                <span className="text-[11px] font-mono text-slate-400">Resolved</span>
                              )}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ================================================================== */}
          {/* MODULE 5: PREDICTIVE MAINTENANCE & WORK ORDERS */}
          {/* ================================================================== */}
          {activeModule === 'maintenance' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Predictive Maintenance & Work Orders</h1>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Automated maintenance ticketing, condition-based inspection schedule, and crew assignment.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={workOrderFilter}
                    onChange={(e) => setWorkOrderFilter(e.target.value as any)}
                    className="bg-white border border-slate-300 text-slate-700 text-xs font-mono font-bold px-3 py-1.5 rounded-lg focus:outline-none"
                  >
                    <option value="ALL">Filter: All Orders</option>
                    <option value="PENDING">Filter: Pending</option>
                    <option value="IN_PROGRESS">Filter: In Progress</option>
                    <option value="COMPLETED">Filter: Completed</option>
                  </select>

                  <button
                    onClick={() => setShowNewWorkOrderModal(true)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold font-mono shadow-sm"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Create Work Order</span>
                  </button>
                </div>
              </div>

              {/* Work Orders List */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {workOrders
                  .filter((w) => workOrderFilter === 'ALL' || w.status === workOrderFilter)
                  .map((wo) => (
                    <div key={wo.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-3">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                            {wo.id}
                          </span>
                          <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                            wo.priority === 'HIGH' ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-blue-50 text-blue-700'
                          }`}>
                            {wo.priority} PRIORITY
                          </span>
                        </div>
                        <h3 className="font-bold text-slate-900 text-sm">{wo.title}</h3>
                        <p className="text-xs text-slate-500 line-clamp-2">{wo.description}</p>
                      </div>

                      <div className="pt-3 border-t border-slate-100 space-y-2 text-xs">
                        <div className="flex justify-between text-slate-500">
                          <span>Asset:</span>
                          <span className="font-mono font-bold text-slate-800">{wo.assetId}</span>
                        </div>
                        <div className="flex justify-between text-slate-500">
                          <span>Assigned To:</span>
                          <span className="font-medium text-slate-700">{wo.assignedTo}</span>
                        </div>
                        <div className="flex justify-between text-slate-500">
                          <span>Target Due Date:</span>
                          <span className="font-mono text-slate-700">{wo.dueDate}</span>
                        </div>

                        {/* Status Switcher Buttons */}
                        <div className="flex gap-1.5 pt-2">
                          {(['PENDING', 'IN_PROGRESS', 'COMPLETED'] as const).map((st) => (
                            <button
                              key={st}
                              onClick={() => handleUpdateWoStatus(wo.id, st)}
                              className={`flex-1 py-1 rounded text-[10px] font-mono font-bold transition-colors ${
                                wo.status === st
                                  ? 'bg-slate-900 text-white'
                                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                              }`}
                            >
                              {st === 'IN_PROGRESS' ? 'IN PROGRESS' : st}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* ================================================================== */}
          {/* MODULE 6: TRANSFORMER ASSET REGISTRY */}
          {/* ================================================================== */}
          {activeModule === 'assets' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Transformer Asset Registry</h1>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Master inventory of fleet transformers, nameplate data, and edge instrumentation.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {fleet.map((asset) => (
                  <div key={asset.id} className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">
                          {asset.id}
                        </span>
                        <h2 className="text-base font-bold text-slate-900 mt-1.5">{asset.name}</h2>
                        <p className="text-xs text-slate-500">{asset.location}</p>
                      </div>
                      <span className={`px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold ${
                        asset.status === 'NORMAL' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                      }`}>
                        {asset.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-3 rounded-lg border border-slate-100 font-mono">
                      <div>
                        <span className="text-slate-400 block text-[10px]">RATING & VOLTAGE</span>
                        <span className="font-bold text-slate-800">{asset.capacityKva} kVA · {asset.voltageRating}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">COOLING METHOD</span>
                        <span className="font-bold text-slate-800">{asset.coolingType}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">MANUFACTURER</span>
                        <span className="font-bold text-slate-800">{asset.manufacturer}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">COMMISSIONED</span>
                        <span className="font-bold text-slate-800">{asset.installationDate}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs pt-1">
                      <span className="text-slate-500">Connected IoT Gateway: <strong className="font-mono text-slate-800">{asset.edgeDeviceId}</strong></span>
                      <button
                        onClick={() => {
                          setSelectedAssetId(asset.id);
                          setHardwareScale(asset.id === 'TG-ESP32-LOCAL' ? 'bench' : 'field');
                          setActiveModule('monitoring');
                        }}
                        className="px-3 py-1.5 bg-blue-600 text-white rounded-lg font-mono text-xs font-bold hover:bg-blue-700"
                      >
                        Inspect Live
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================================================================== */}
          {/* MODULE 7: REPORTS & ANALYTICS */}
          {/* ================================================================== */}
          {activeModule === 'reports' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Fleet Reports & Analytical Exports</h1>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Compliance reporting, parameter trend archives, and official engineering logs.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                    <FileText className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-base">Comprehensive Fleet Telemetry CSV</h3>
                  <p className="text-xs text-slate-500">
                    Export all recorded multi-sensor data points across the fleet including oil temperature, winding hotspot, and THD.
                  </p>
                  <button
                    onClick={downloadCsvReport}
                    className="w-full py-2 bg-slate-900 text-white rounded-lg font-mono text-xs font-bold hover:bg-slate-800 flex items-center justify-center gap-1.5"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Raw Telemetry CSV</span>
                  </button>
                </div>

                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-base">IEEE C57.91 Insulation Audit Report</h3>
                  <p className="text-xs text-slate-500">
                    Formal thermal loss-of-life audit documenting cumulative aging factor (F_AA) and estimated Remaining Useful Life.
                  </p>
                  <button
                    onClick={() => window.print()}
                    className="w-full py-2 bg-slate-100 text-slate-800 rounded-lg font-mono text-xs font-bold hover:bg-slate-200 flex items-center justify-center gap-1.5"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Print Formal Report</span>
                  </button>
                </div>

                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
                  <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-base">Alarm & Incident Logbook</h3>
                  <p className="text-xs text-slate-500">
                    Export incident chronology including critical temperature excursions, combustible gas alerts, and engineer notes.
                  </p>
                  <button
                    onClick={downloadCsvReport}
                    className="w-full py-2 bg-slate-100 text-slate-800 rounded-lg font-mono text-xs font-bold hover:bg-slate-200 flex items-center justify-center gap-1.5"
                  >
                    <Download className="w-4 h-4" />
                    <span>Export Incident Log</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ================================================================== */}
          {/* MODULE 8: IOT DEVICE & HARDWARE GATEWAY MANAGEMENT */}
          {/* ================================================================== */}
          {activeModule === 'devices' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">IoT Edge Gateways & Device Management</h1>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Hardware nodes status, sensor interfaces, and firmware configurations for ESP32 and STM32 gateways.
                  </p>
                </div>

                <button
                  onClick={() => setShowFirmwareModal(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold font-mono shadow-sm"
                >
                  <Code2 className="w-4 h-4" />
                  <span>View ESP32 Firmware Sketch</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {devices.map((dev) => (
                  <div key={dev.deviceId} className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-sm text-slate-900">{dev.deviceId}</span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
                            ONLINE
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">Asset Link: <strong className="font-mono text-slate-700">{dev.assetId}</strong></p>
                      </div>
                      <span className="text-[11px] font-mono font-bold text-slate-600 bg-slate-100 px-2 py-1 rounded">
                        {dev.hardware}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-3 rounded-lg border border-slate-100 font-mono">
                      <div>
                        <span className="text-slate-400 block text-[10px]">INTERFACE PROTOCOL</span>
                        <span className="font-bold text-slate-800">{dev.connectionType}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">IP / MAC ADDRESS</span>
                        <span className="font-bold text-slate-800">{dev.ipAddress}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">FIRMWARE BUILD</span>
                        <span className="font-bold text-slate-800">{dev.firmwareVersion}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">UPTIME</span>
                        <span className="font-bold text-slate-800">{(dev.uptimeSeconds / 3600).toFixed(1)} hrs</span>
                      </div>
                    </div>

                    <div>
                      <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                        Connected Sensor Bus
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {dev.sensorsConnected.map((s, idx) => (
                          <span key={idx} className="text-[11px] font-mono bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ==================================================================== */}
      {/* MODALS & DRAWERS */}
      {/* ==================================================================== */}

      {/* 1. ESP32 Arduino C++ Firmware Modal */}
      {showFirmwareModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh]">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between text-white">
              <div className="flex items-center gap-2">
                <Code2 className="w-5 h-5 text-blue-400" />
                <h3 className="font-bold text-sm">TransGuard AI — ESP32 Edge Firmware Sketch</h3>
              </div>
              <button
                onClick={() => setShowFirmwareModal(false)}
                className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 overflow-y-auto flex-1 font-mono text-xs text-slate-300 bg-slate-950">
              <pre>{ESP32_FIRMWARE_SKETCH}</pre>
            </div>

            <div className="p-4 border-t border-slate-800 bg-slate-900/90 flex justify-between items-center">
              <span className="text-xs text-slate-400 font-mono">Compatible with Arduino IDE, PlatformIO, ESP-IDF</span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(ESP32_FIRMWARE_SKETCH);
                  setCopiedCode(true);
                  setTimeout(() => setCopiedCode(false), 2500);
                  triggerToast('Firmware sketch copied to clipboard!', 'success');
                }}
                className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-mono font-bold"
              >
                {copiedCode ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copiedCode ? 'COPIED TO CLIPBOARD' : 'COPY FIRMWARE CODE'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Telemetry Console Drawer */}
      {showConsoleDrawer && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-slate-900 text-white h-full flex flex-col shadow-2xl border-l border-slate-800">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-emerald-400" />
                <h3 className="font-bold text-sm">Telemetry Terminal & Stream Logs</h3>
              </div>
              <button
                onClick={() => setShowConsoleDrawer(false)}
                className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 overflow-y-auto flex-1 space-y-2 font-mono text-xs">
              <div className="text-[11px] text-slate-400 font-bold uppercase tracking-wider mb-2">
                Incoming Frames ({rawLogs.length})
              </div>
              {rawLogs.map((log) => (
                <div key={log.id} className="p-2.5 rounded bg-slate-950 border border-slate-800 text-[11px]">
                  <div className="flex justify-between text-[10px] text-slate-500 mb-1">
                    <span className="text-emerald-400 font-bold">{log.source}</span>
                    <span>{log.time}</span>
                  </div>
                  <div className="text-slate-300 break-all">{log.raw}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 3. Create Work Order Modal */}
      {showNewWorkOrderModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl border border-slate-200">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-base text-slate-900">Create New Maintenance Work Order</h3>
              <button
                onClick={() => setShowNewWorkOrderModal(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateWorkOrder} className="p-5 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Target Transformer</label>
                <select
                  value={newOrderForm.assetId}
                  onChange={(e) => setNewOrderForm({ ...newOrderForm, assetId: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-mono"
                >
                  {fleet.map((a) => (
                    <option key={a.id} value={a.id}>{a.id} — {a.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Work Order Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Inspect radiator cooling fans and DGA sampling"
                  value={newOrderForm.title}
                  onChange={(e) => setNewOrderForm({ ...newOrderForm, title: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Description & Scope</label>
                <textarea
                  rows={3}
                  placeholder="Detail inspection procedures, safety lockouts, and required tools..."
                  value={newOrderForm.description}
                  onChange={(e) => setNewOrderForm({ ...newOrderForm, description: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Priority</label>
                  <select
                    value={newOrderForm.priority}
                    onChange={(e) => setNewOrderForm({ ...newOrderForm, priority: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-mono"
                  >
                    <option value="HIGH">HIGH</option>
                    <option value="MEDIUM">MEDIUM</option>
                    <option value="LOW">LOW</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Assigned Lead / Team</label>
                  <input
                    type="text"
                    value={newOrderForm.assignedTo}
                    onChange={(e) => setNewOrderForm({ ...newOrderForm, assignedTo: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowNewWorkOrderModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold shadow-sm"
                >
                  Create Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 4. Resolve Alert Modal */}
      {resolveAlertTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl border border-slate-200">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-base text-slate-900">Resolve Alarm: {resolveAlertTarget.id}</h3>
              <button
                onClick={() => setResolveAlertTarget(null)}
                className="p-1 rounded-lg text-slate-400 hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-4 space-y-3 text-xs">
              <div className="p-2.5 rounded bg-slate-50 border border-slate-200 text-slate-600">
                <span className="font-bold text-slate-900 block">{resolveAlertTarget.parameter} Violation</span>
                {resolveAlertTarget.message}
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Resolution Summary / Action Notes</label>
                <textarea
                  rows={3}
                  placeholder="e.g. Cleaned fan radiator grills, confirmed temperature returned below 65°C."
                  value={resolveNotes}
                  onChange={(e) => setResolveNotes(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => setResolveAlertTarget(null)}
                  className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg font-bold"
                >
                  Cancel
                </button>
                <button
                  onClick={handleResolveAlert}
                  className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold"
                >
                  Confirm Resolution
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

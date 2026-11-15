import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;
const HTML_FILE = path.join(__dirname, 'transguard_app.html');

// ============================================================================
// IN-MEMORY DATABASE & FLEET STATE
// ============================================================================

const fleetAssets = [
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

let alerts = [
  {
    id: 'ALT-1001',
    assetId: 'TG-TX-103',
    timestamp: new Date(Date.now() - 14 * 60 * 1000).toISOString(),
    severity: 'CRITICAL',
    parameter: 'windingTemp',
    value: 108.6,
    unit: '°C',
    threshold: 105.0,
    message: 'Winding hotspot temperature exceeded IEEE critical insulation limit (105°C).',
    status: 'ACTIVE',
    acknowledgedBy: null
  },
  {
    id: 'ALT-1002',
    assetId: 'TG-TX-103',
    timestamp: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
    severity: 'CRITICAL',
    parameter: 'gas',
    value: 512,
    unit: 'ppm',
    threshold: 450,
    message: 'Dissolved combustible gas concentration (MQ-2) suggests active partial arcing.',
    status: 'ACTIVE',
    acknowledgedBy: null
  },
  {
    id: 'ALT-1003',
    assetId: 'TG-TX-102',
    timestamp: new Date(Date.now() - 48 * 60 * 1000).toISOString(),
    severity: 'WARNING',
    parameter: 'oilTemp',
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
    timestamp: new Date(Date.now() - 75 * 60 * 1000).toISOString(),
    severity: 'WARNING',
    parameter: 'thd',
    value: 5.4,
    unit: '%',
    threshold: 5.0,
    message: 'Harmonic distortion exceeds IEEE 519 5% guideline due to nonlinear steel plant loads.',
    status: 'ACTIVE',
    acknowledgedBy: null
  },
  {
    id: 'ALT-1005',
    assetId: 'TG-TX-101',
    timestamp: new Date(Date.now() - 180 * 60 * 1000).toISOString(),
    severity: 'NORMAL',
    parameter: 'current',
    value: 142.0,
    unit: 'A',
    threshold: 220.0,
    message: 'Peak load test completed smoothly; all thermal margins normal.',
    status: 'RESOLVED',
    acknowledgedBy: 'Operator Unit 1'
  }
];

let workOrders = [
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

const edgeDevices = [
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

// Helper: send JSON response
function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  });
  res.end(JSON.stringify(data));
}

// Helper: read JSON body from request
function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
      if (body.length > 1e6) {
        req.destroy();
        reject(new Error('Payload too large'));
      }
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (err) {
        reject(err);
      }
    });
    req.on('error', reject);
  });
}

// ============================================================================
// HTTP ROUTER & API CONTROLLER
// ============================================================================

const server = http.createServer(async (req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost:3000'}`);
  const pathname = parsedUrl.pathname;

  // Handle CORS Pre-flight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    });
    res.end();
    return;
  }

  // --------------------------------------------------------------------------
  // 1. FRONTEND DASHBOARD PAGES
  // --------------------------------------------------------------------------
  if (pathname === '/' || pathname === '/index.html' || pathname === '/transguard_app.html') {
    fs.readFile(HTML_FILE, (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Error loading dashboard: ' + err.message);
        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(data);
    });
    return;
  }

  // --------------------------------------------------------------------------
  // 2. FLEET ASSETS API
  // --------------------------------------------------------------------------
  if (pathname === '/api/fleet' && req.method === 'GET') {
    // Dynamic summary KPIs
    const totalAssets = fleetAssets.length;
    const healthyCount = fleetAssets.filter(a => a.status === 'NORMAL').length;
    const warningCount = fleetAssets.filter(a => a.status === 'WARNING').length;
    const criticalCount = fleetAssets.filter(a => a.status === 'CRITICAL').length;
    const avgHealthIndex = Math.round(
      fleetAssets.reduce((acc, a) => acc + a.healthIndex, 0) / totalAssets
    );

    return sendJson(res, 200, {
      kpis: {
        totalAssets,
        healthyCount,
        warningCount,
        criticalCount,
        avgHealthIndex,
        activeAlerts: alerts.filter(a => a.status === 'ACTIVE').length,
        openWorkOrders: workOrders.filter(w => w.status !== 'COMPLETED').length,
        connectedDevices: edgeDevices.filter(d => d.status === 'ONLINE').length
      },
      assets: fleetAssets
    });
  }

  if (pathname.startsWith('/api/assets/') && req.method === 'GET') {
    const assetId = pathname.replace('/api/assets/', '');
    const asset = fleetAssets.find(a => a.id === assetId);
    if (!asset) return sendJson(res, 404, { error: 'Asset not found' });
    const assetAlerts = alerts.filter(a => a.assetId === assetId);
    const assetWorkOrders = workOrders.filter(w => w.assetId === assetId);
    const device = edgeDevices.find(d => d.assetId === assetId);
    return sendJson(res, 200, {
      ...asset,
      alerts: assetAlerts,
      workOrders: assetWorkOrders,
      device: device || null
    });
  }

  // --------------------------------------------------------------------------
  // 3. LIVE TELEMETRY API (Backward-Compatible + Multi-Asset)
  // --------------------------------------------------------------------------
  if ((pathname === '/telemetry' || pathname === '/api/telemetry') && req.method === 'GET') {
    const assetId = parsedUrl.searchParams.get('assetId') || 'TG-ESP32-LOCAL';
    const targetAsset = fleetAssets.find(a => a.id === assetId) || fleetAssets[3];

    // Jitter simulated live values slightly on each poll for realism
    const jitter = (Math.random() - 0.5);
    const base = targetAsset.telemetry;

    const liveData = {
      pod_id: targetAsset.id,
      assetName: targetAsset.name,
      timestamp: new Date().toISOString(),
      oilTemp: +(base.oilTemp + jitter * 0.4).toFixed(1),
      windingTemp: +(base.windingTemp + jitter * 0.6).toFixed(1),
      current: +(base.current + jitter * 0.05).toFixed(2),
      voltage: +(base.voltage + jitter * 0.3).toFixed(1),
      vib: +(Math.max(0.1, base.vib + jitter * 0.08)).toFixed(2),
      thd: +(Math.max(0.5, base.thd + jitter * 0.1)).toFixed(1),
      gas: Math.max(10, Math.round(base.gas + jitter * 3)),
      ambient: +(base.ambient + jitter * 0.2).toFixed(1),
      humidity: Math.round(base.humidity + jitter * 1)
    };

    return sendJson(res, 200, liveData);
  }

  // Telemetry Ingestion from Physical ESP32 / IoT Gateways
  if ((pathname === '/telemetry' || pathname === '/api/telemetry') && req.method === 'POST') {
    try {
      const payload = await readJsonBody(req);
      const targetId = payload.pod_id || payload.assetId || 'TG-ESP32-LOCAL';
      let asset = fleetAssets.find(a => a.id === targetId);
      if (!asset) {
        asset = fleetAssets[3]; // default to local bench asset
      }

      // Update in-memory telemetry
      asset.telemetry = {
        oilTemp: payload.oilTemp ?? asset.telemetry.oilTemp,
        windingTemp: payload.windingTemp ?? asset.telemetry.windingTemp,
        current: payload.current ?? asset.telemetry.current,
        voltage: payload.voltage ?? asset.telemetry.voltage,
        vib: payload.vib ?? asset.telemetry.vib,
        thd: payload.thd ?? asset.telemetry.thd,
        gas: payload.gas ?? asset.telemetry.gas,
        ambient: payload.ambient ?? asset.telemetry.ambient,
        humidity: payload.humidity ?? asset.telemetry.humidity
      };

      // Check for alert thresholds
      if (asset.telemetry.windingTemp > 80 && targetId === 'TG-ESP32-LOCAL') {
        alerts.unshift({
          id: `ALT-${Date.now()}`,
          assetId: targetId,
          timestamp: new Date().toISOString(),
          severity: 'CRITICAL',
          parameter: 'windingTemp',
          value: asset.telemetry.windingTemp,
          unit: '°C',
          threshold: 80.0,
          message: `Hardware Hotspot Temperature reached ${asset.telemetry.windingTemp}°C.`,
          status: 'ACTIVE',
          acknowledgedBy: null
        });
      }

      return sendJson(res, 200, { success: true, message: 'Telemetry ingested successfully', timestamp: new Date().toISOString() });
    } catch (err) {
      return sendJson(res, 400, { error: 'Invalid JSON payload: ' + err.message });
    }
  }

  // --------------------------------------------------------------------------
  // 4. ALERTS & INCIDENTS API
  // --------------------------------------------------------------------------
  if (pathname === '/api/alerts' && req.method === 'GET') {
    return sendJson(res, 200, { alerts });
  }

  if (pathname.match(/^\/api\/alerts\/([\w-]+)\/acknowledge$/) && req.method === 'POST') {
    const alertId = pathname.split('/')[3];
    const alert = alerts.find(a => a.id === alertId);
    if (!alert) return sendJson(res, 404, { error: 'Alert not found' });
    const body = await readJsonBody(req);
    alert.status = 'ACKNOWLEDGED';
    alert.acknowledgedBy = body.user || 'Operations Supervisor';
    alert.acknowledgedAt = new Date().toISOString();
    return sendJson(res, 200, { success: true, alert });
  }

  if (pathname.match(/^\/api\/alerts\/([\w-]+)\/resolve$/) && req.method === 'POST') {
    const alertId = pathname.split('/')[3];
    const alert = alerts.find(a => a.id === alertId);
    if (!alert) return sendJson(res, 404, { error: 'Alert not found' });
    const body = await readJsonBody(req);
    alert.status = 'RESOLVED';
    alert.resolvedNotes = body.notes || 'Parameter returned to normal operational limits.';
    alert.resolvedAt = new Date().toISOString();
    return sendJson(res, 200, { success: true, alert });
  }

  // --------------------------------------------------------------------------
  // 5. PREDICTIVE MAINTENANCE & WORK ORDERS API
  // --------------------------------------------------------------------------
  if (pathname === '/api/maintenance' && req.method === 'GET') {
    return sendJson(res, 200, { workOrders });
  }

  if (pathname === '/api/maintenance' && req.method === 'POST') {
    try {
      const body = await readJsonBody(req);
      if (!body.assetId || !body.title) {
        return sendJson(res, 400, { error: 'assetId and title are required' });
      }
      const newOrder = {
        id: `WO-2026-${String(workOrders.length + 101).padStart(3, '0')}`,
        assetId: body.assetId,
        title: body.title,
        description: body.description || '',
        priority: body.priority || 'MEDIUM',
        status: 'PENDING',
        assignedTo: body.assignedTo || 'Unassigned',
        dueDate: body.dueDate || new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
        createdDate: new Date().toISOString().split('T')[0]
      };
      workOrders.unshift(newOrder);
      return sendJson(res, 201, { success: true, workOrder: newOrder });
    } catch (err) {
      return sendJson(res, 400, { error: err.message });
    }
  }

  if (pathname.match(/^\/api\/maintenance\/([\w-]+)\/status$/) && req.method === 'POST') {
    const orderId = pathname.split('/')[3];
    const order = workOrders.find(w => w.id === orderId);
    if (!order) return sendJson(res, 404, { error: 'Work order not found' });
    const body = await readJsonBody(req);
    if (['PENDING', 'IN_PROGRESS', 'COMPLETED'].includes(body.status)) {
      order.status = body.status;
      return sendJson(res, 200, { success: true, workOrder: order });
    }
    return sendJson(res, 400, { error: 'Invalid status' });
  }

  // --------------------------------------------------------------------------
  // 6. IOT EDGE DEVICES API
  // --------------------------------------------------------------------------
  if (pathname === '/api/devices' && req.method === 'GET') {
    return sendJson(res, 200, { devices: edgeDevices });
  }

  // --------------------------------------------------------------------------
  // 7. CSV REPORT EXPORT API
  // --------------------------------------------------------------------------
  if (pathname === '/api/reports/export.csv' && req.method === 'GET') {
    res.writeHead(200, {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': 'attachment; filename="transguard_ai_fleet_report.csv"'
    });
    let csv = 'Asset ID,Asset Name,Location,Rating (kVA),Status,Health Index,RUL (Years),Oil Temp (°C),Winding Temp (°C),Current (A),Voltage (V),Vib (mm/s),THD (%),Gas (ppm)\n';
    fleetAssets.forEach(a => {
      const t = a.telemetry;
      csv += `"${a.id}","${a.name}","${a.location}",${a.capacityKva},"${a.status}",${a.healthIndex},${a.rulYears},${t.oilTemp},${t.windingTemp},${t.current},${t.voltage},${t.vib},${t.thd},${t.gas}\n`;
    });
    res.end(csv);
    return;
  }

  // --------------------------------------------------------------------------
  // 8. STATIC ASSET SERVING
  // --------------------------------------------------------------------------
  const safePath = path.normalize(path.join(__dirname, pathname));
  if (safePath.startsWith(__dirname) && fs.existsSync(safePath) && fs.statSync(safePath).isFile()) {
    const ext = path.extname(safePath).toLowerCase();
    const mimeTypes = {
      '.html': 'text/html; charset=utf-8',
      '.js': 'application/javascript; charset=utf-8',
      '.css': 'text/css; charset=utf-8',
      '.json': 'application/json; charset=utf-8',
      '.svg': 'image/svg+xml'
    };
    res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
    fs.createReadStream(safePath).pipe(res);
    return;
  }

  // 404 Fallback
  sendJson(res, 404, { error: 'Route not found: ' + pathname });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`TransGuard AI Industrial Telemetry Server listening on port ${PORT}`);
  console.log(`  - Dashboard:  http://localhost:${PORT}`);
  console.log(`  - Fleet API:  http://localhost:${PORT}/api/fleet`);
  console.log(`  - Telemetry:  http://localhost:${PORT}/telemetry`);
});

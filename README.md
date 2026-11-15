# TransGuard AI — Predictive Maintenance Platform for Distribution Transformers

**TransGuard AI** is an industrial-grade, AI/IoT-driven predictive maintenance and telemetry monitoring system designed specifically for electrical distribution transformers (11 kV / 415 V and benchtop hardware prototypes).

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- **Node.js** (v16.x or newer, tested on Node.js v24)
- Any modern web browser (**Google Chrome**, **Microsoft Edge**, or **Brave** recommended for full **Web Serial API** support)

### 2. Start the Local Server
Open a terminal in the project directory:
```bash
node server.js
```
The server will initialize immediately on port **3000**:
```text
TransGuard AI Industrial Telemetry Server listening on port 3000
  - Dashboard:  http://localhost:3000
  - Fleet API:  http://localhost:3000/api/fleet
  - Telemetry:  http://localhost:3000/telemetry
```

### 3. Open the Dashboard
Navigate to:
👉 **[http://localhost:3000](http://localhost:3000)**

*(Alternatively, you can open [transguard_app.html](file:///c:/Users/Aarthy/Desktop/TransGuard%20AI%20app/transguard_app.html) or [index.html](file:///c:/Users/Aarthy/Desktop/TransGuard%20AI%20app/index.html) directly in your browser.)*

---

## 🏛️ System Architecture

```text
  [ Physical Transformer Sensors ]
   ├── Top Oil Temp (PT100 / DS18B20)
   ├── Current Transformer CT (SCT-013 / ACS712)
   ├── Line Voltage PT (ZMPT101B)
   ├── Tank Core Vibration (MPU6050 Accelerometer)
   ├── Dissolved Combustible Gas (MQ-2)
   └── Ambient Conditions (DHT22)
                 │
                 ▼
  [ ESP32 / STM32 Edge Gateway ]
   ├── USB Web Serial (115200 Baud)
   └── Wi-Fi 802.11 / HTTP REST & WebSocket
                 │
                 ▼
  [ Node.js Backend Server (server.js) ]
   ├── REST API Endpoints (/api/fleet, /api/telemetry, /api/alerts, /api/maintenance)
   └── Real-Time Telemetry Ingestion Engine
                 │
                 ▼
  [ AI Analytics & Diagnostic Engine ]
   ├── Transformer Health Index (THI: 0–100)
   ├── IEEE C57.91 Insulation Thermal Aging (F_AA) & RUL Estimation
   ├── Statistical Anomaly Detection (Z-score deviation)
   └── Failure Mode Classification Matrix
                 │
                 ▼
  [ TransGuard AI Enterprise Dashboard ]
```

---

## 📦 The 8 Core Operational Modules

1. **Fleet Overview Dashboard (`/overview`)**
   - Fleet KPIs: Total Transformers, Average Health Index, Healthy/Warning/Critical breakdown, Active Alarms, and Connected Edge Gateways.
   - Comprehensive fleet summary table with live health progress bars, RUL projections, and quick jump buttons.

2. **Live Transformer Telemetry (`/monitoring`)**
   - Active transformer selector with full nameplate specs and operational mode.
   - 8 modular live telemetry cards with real-time numerical readings, sensor IC details, operational thresholds (Base, Warn, Crit), and dynamic sparklines.
   - High-precision rolling interactive SVG area chart with touch drag and mouse hover scrubber inspection.
   - Selectable time windows: **LIVE**, **1M**, **5M**, **15M**.
   - Dual hardware calibration scales: **Benchtop Prototype (24V)** vs **Grid Distribution (11kV)**.

3. **AI Health Assessment & Diagnostics (`/analytics`)**
   - **Transformer Health Index (THI)** weighted across 5 critical subsystems: Solid Insulation (28%), Liquid Dielectric (24%), Power Quality (18%), Mechanical Clamping (16%), and Load Margin (14%).
   - **IEEE C57.91 Insulation Aging Acceleration Factor ($F_{AA}$)** and **Remaining Useful Life (RUL in years and %)**.
   - **Statistical Anomaly Engine**: Automatic flagging of sensor deviations above 40% from baseline.
   - **Fault Classification Matrix**: Detects Thermal Runaway, Harmonic Resonance, Core Looseness, and Partial Discharge.
   - **AI Maintenance Prescriptions**: Actionable maintenance recommendations linked directly to work order generation.

4. **Alerts & Incidents Management (`/alerts`)**
   - Filterable alert audit log by severity (All, Critical, Warning, Normal) and status (Active, Acknowledged, Resolved).
   - Instant operator acknowledgment button with audit timestamping.
   - Modal for resolving alarms with mandatory technician corrective action notes.

5. **Predictive Maintenance & Work Orders (`/maintenance`)**
   - Kanban-style and list views of maintenance work orders (Pending, In Progress, Completed).
   - Priority tagging (High, Medium, Routine).
   - "Create New Work Order" interactive modal with target asset selection, scope of work, and technician assignment.

6. **Transformer Asset Registry (`/assets`)**
   - Master technical directory of fleet transformers.
   - Technical specifications: Serial Number, Substation, Feeder, Rating (kVA), Voltage Ratio, Cooling Class (ONAN/ONAF), Manufacturer, and Commissioning Date.

7. **Reports & Analytics (`/reports`)**
   - **Comprehensive Telemetry CSV Downloader**: Single-click export of recorded multi-sensor data points.
   - **IEEE C57.91 Insulation Audit Report**: Printable formal documentation for engineering records.
   - **Incident Logbook Export**: Historical record of all alarms and maintenance resolutions.

8. **IoT Device & Gateway Management (`/devices`)**
   - Edge gateway hardware inventory (ESP32-WROOM-32D, ESP32-S3, STM32F4 Gateway).
   - Network parameters: Protocol (Wi-Fi, USB Serial, 4G LTE, RS-485 Modbus), IP address, MAC address, signal strength (RSSI in dBm), and uptime.
   - Sensor bus mapping.
   - Built-in ESP32 C++ Arduino sketch viewer with one-click copy.
   - Real-time raw serial/JSON terminal console drawer.

---

## 🔌 Hardware Connectivity & Testing Modes

### 1. Simulation Mode (Default)
Allows full demonstration without physical hardware. Choose from 4 scenarios:
- **Normal Baseline**: Standard nominal fluctuations within safe margins.
- **Peak Overload Surge**: Current and winding hotspot surge above warning thresholds.
- **Thermal Runaway Fault**: Oil and winding temperatures climb rapidly into critical failure territory.
- **Harmonic Resonance**: Elevated Total Harmonic Distortion (THD > 5%) and vibration spikes.

### 2. ESP32 USB Web Serial Mode
- Connect an ESP32 microcontroller directly to your computer via USB.
- Click **"USB SERIAL"** in the top bar or Live Telemetry module.
- Select the serial port in Chrome/Edge/Brave at **115200 baud**.
- The dashboard parses incoming JSON frames (`{"oilTemp": 33.4, ...}`) in real time.

### 3. ESP32 Wi-Fi / REST Polling Mode
- The ESP32 connects to local Wi-Fi and hosts a `/telemetry` endpoint.
- Click **"WI-FI"** in the dashboard and specify the URL (defaults to `http://localhost:3000/telemetry`).
- The dashboard polls live telemetry at 1 Hz intervals.

---

## 🛠️ Flashing the ESP32 Firmware

1. Install the **Arduino IDE** (or PlatformIO).
2. Install the following libraries via the Arduino Library Manager:
   - `DallasTemperature`
   - `OneWire`
   - `DHT sensor library`
   - `Adafruit MPU6050`
   - `Adafruit Unified Sensor`
3. Click the **"Firmware"** button (`<Code2 />` icon) in the dashboard header and copy the sketch.
4. Paste the sketch into Arduino IDE, update your Wi-Fi credentials (`ssid`, `password`), and flash to your ESP32.

### Sensor Pinout Configuration

| Sensor | Parameter | ESP32 GPIO | Interface |
|---|---|---|---|
| **DS18B20 / PT100** | Top Oil Temperature | `GPIO 4` | 1-Wire (4.7kΩ pullup) |
| **SCT-013 / ACS712** | Load Current | `ADC1_CH6 (GPIO 34)` | Analog In |
| **ZMPT101B** | Line Voltage | `ADC1_CH7 (GPIO 35)` | Analog In |
| **MPU6050** | Core Vibration | `SDA (GPIO 21), SCL (GPIO 22)` | I2C |
| **MQ-2** | Combustible Gas | `ADC1_CH4 (GPIO 32)` | Analog In |
| **DHT22** | Ambient Temp & Humidity | `GPIO 13` | Digital |

---

## 🌐 REST API Endpoints Reference

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/` or `/index.html` | Serves the enterprise web application |
| `GET` | `/api/fleet` | Returns fleet KPIs and list of all transformers |
| `GET` | `/api/assets/:id` | Returns single transformer profile, alarms, and work orders |
| `GET` | `/telemetry` or `/api/telemetry` | Retrieves latest sensor readings (supports `?assetId=...`) |
| `POST`| `/telemetry` or `/api/telemetry` | Ingests sensor JSON payload from ESP32/IoT nodes |
| `GET` | `/api/alerts` | Lists all active and historical alerts |
| `POST`| `/api/alerts/:id/acknowledge` | Acknowledges an alert by ID |
| `POST`| `/api/alerts/:id/resolve` | Resolves an alert with engineering notes |
| `GET` | `/api/maintenance` | Lists all predictive maintenance work orders |
| `POST`| `/api/maintenance` | Creates a new maintenance work order |
| `POST`| `/api/maintenance/:id/status`| Updates work order status (`PENDING`, `IN_PROGRESS`, `COMPLETED`) |
| `GET` | `/api/devices` | Returns connected IoT edge gateways |
| `GET` | `/api/reports/export.csv` | Downloads full fleet CSV report |

---

## 📄 License & Attribution
**TransGuard AI** — Open Industrial IoT Predictive Maintenance Framework. Built for reliability, operator safety, and grid resilience.

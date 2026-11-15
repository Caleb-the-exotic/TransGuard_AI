# TransGuard AI – Smart Distribution Transformer Predictive Maintenance Platform

[![Architecture: Monorepo](https://img.shields.io/badge/Architecture-Clean%20Monorepo-0284c7.svg)](#architecture)
[![Frontend: React + Vite](https://img.shields.io/badge/Frontend-React%2018%20%7C%20Vite%20%7C%20ECharts-38bdf8.svg)](apps/web)
[![Backend: Fastify + TypeScript](https://img.shields.io/badge/Backend-Fastify%20%7C%20WebSockets%20%7C%20pg-10b981.svg)](services/api)
[![AI Engine: Python FastAPI](https://img.shields.io/badge/AI%20Engine-Python%20FastAPI%20%7C%20IEEE%20C57.91-f59e0b.svg)](services/ai-engine)
[![Firmware: ESP32 + STM32](https://img.shields.io/badge/Firmware-ESP32%20%7C%20STM32%20Modbus-ef4444.svg)](firmware)

An industrial-grade IoT and AI-driven predictive maintenance platform for distribution transformers (5 kVA – 1000 kVA). TransGuard AI combines physical sensor transducers (temperature, current, voltage, vibration, THD, and combustible gas), edge gateways (ESP32/STM32), high-throughput message brokers (Eclipse Mosquitto MQTT), an enterprise Fastify + TypeScript backend, a Python predictive analytics engine (IEEE C57.91), and an Apache ECharts-powered React dashboard.

---

## Architecture Overview

```
Transformer Sensors (PT100, CT, ZMPT101B, MPU6050, DHT22)
                          ↓
        ESP32 / STM32 Edge Telemetry Gateway
                          ↓
      (MQTT :1883 / USB Web Serial / Wi-Fi HTTP)
                          ↓
      Mosquitto Broker ───→ Fastify Backend API (:3001)
                                  │
                  ┌───────────────┴───────────────┐
                  ▼                               ▼
       PostgreSQL / TimescaleDB        Python FastAPI AI Engine (:8000)
       (In-Memory Fallback Active)     (IEEE C57.91 Thermal Aging)
                  │                               │
                  └───────────────┬───────────────┘
                                  ▼
                     React 18 + Vite Web App (:5173)
```

---

## Repository Structure

```
TransGuard_AI/
│
├── apps/
│   └── web/                           # React 18 + TypeScript + Vite + Tailwind + ECharts
│       ├── src/
│       │   ├── components/            # UI components (charts, monitoring, layout)
│       │   ├── pages/                 # 8 Core application modules
│       │   ├── hooks/                 # TanStack Query data hooks
│       │   ├── services/              # REST & WebSocket client
│       │   └── types/                 # TypeScript domain interfaces
│       ├── package.json
│       └── vite.config.ts
│
├── services/
│   ├── api/                           # Node.js + TypeScript + Fastify Backend
│   │   ├── src/
│   │   │   ├── routes/                # REST endpoints (fleet, telemetry, alerts, maintenance)
│   │   │   ├── websocket/             # Bidirectional live telemetry streaming (/ws/telemetry)
│   │   │   ├── mqtt/                  # MQTT.js subscriber and ingestion layer
│   │   │   ├── repositories/          # PostgreSQL driver (pg) + In-memory resilience buffer
│   │   │   └── services/simulator.ts  # Real-time multi-asset telemetry simulator
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   └── ai-engine/                     # Python 3.12 + FastAPI Diagnostic & RUL Engine
│       ├── app/
│       │   ├── health_index/          # IEEE C57.91 multi-variable weighted scoring
│       │   ├── rul/                   # Arrhenius thermal insulation life model (F_AA)
│       │   ├── anomaly_detection/     # Baseline deviation tracking
│       │   ├── diagnostics/           # Rule-based fault classifier
│       │   └── recommendations/       # Automated predictive maintenance generator
│       ├── requirements.txt
│       └── start.py
│
├── database/
│   ├── schema.sql                     # Full PostgreSQL + TimescaleDB hypertable schema
│   ├── migrations/                    # Version-controlled SQL migration scripts
│   └── seeds/                         # Realistic industrial fleet & event seeds
│
├── firmware/
│   ├── esp32/                         # ESP32 Arduino C++ firmware sketch & pinout guide
│   └── stm32/                         # STM32 industrial RS-485 Modbus gateway specs
│
├── infrastructure/
│   └── mosquitto/                     # Eclipse Mosquitto MQTT broker configuration
│
├── docs/                              # Architecture, API specs, and hardware wiring diagrams
├── scripts/                           # Native startup scripts (dev.bat, dev.ps1, migrate.js)
├── legacy/                            # Original prototype files safely preserved
└── package.json                       # Monorepo root manifest
```

---

## 8 Core Application Modules

1. **Overview Dashboard** (`/`): Fleet-wide KPIs, healthy/warning/critical distribution donut chart, live alerts feed, and assets overview.
2. **Live Transformer Monitoring** (`/monitoring`): Real-time numerical metrics for all 8 parameters, Apache ECharts interactive trend line with threshold markings, Field vs. Benchtop scale switcher, and live sensor connection status.
3. **AI Health Assessment** (`/analytics`): Transformer Health Index (0–100), sub-scores breakdown (Winding 28%, Oil 24%, PQ 18%, Mechanical 16%, Load 14%), IEEE C57.91 Remaining Useful Life (RUL), fault signatures, and maintenance recommendations.
4. **Alerts & Notifications** (`/alerts`): Critical, warning, and normal event log with 1-click Acknowledge and Resolve modals.
5. **Predictive Maintenance** (`/maintenance`): Automated work-order generation, technician assignment, priority scheduling, and status lifecycle transitions.
6. **Transformer Assets** (`/assets`): Asset directory, nameplate ratings, commissioning history, and digital twin specifications.
7. **Reports & Analytics** (`/reports`): Audit snapshot preview and downloadable UTF-8 CSV reports for fleet status and historical alerts.
8. **Device Management** (`/devices`): ESP32 and STM32 microcontroller registry, Wi-Fi/LTE/USB telemetry connectivity status, and copyable firmware code snippets.

---

## Quickstart Guide

### Prerequisites
- **Node.js** >= v20.0.0
- **Python** >= 3.10
- **PostgreSQL** (Optional; the API features an automatic in-memory fallback store if PostgreSQL is not running)
- **Eclipse Mosquitto** (Optional; telemetry simulator operates automatically)

### 1. Installation

Install all dependencies in the web and API workspaces:
```bash
# In services/api
cd services/api
npm install

# In apps/web
cd ../../apps/web
npm install

# In services/ai-engine
cd ../../services/ai-engine
pip install -r requirements.txt
```

### 2. Launching Services Locally

#### Option A: One-Click Windows Script
```powershell
# In PowerShell from project root:
.\scripts\dev.ps1

# Or in Command Prompt:
scripts\dev.bat
```

#### Option B: Individual Terminals
```bash
# Terminal 1: Fastify Backend API (Port 3001)
cd services/api
npm run dev

# Terminal 2: Python AI Engine (Port 8000)
cd services/ai-engine
python start.py

# Terminal 3: React Web Dashboard (Port 5173)
cd apps/web
npm run dev
```

Open your browser at **[http://localhost:5173](http://localhost:5173)**.

---

## Hardware Integration & Pinout

| Parameter | Sensor IC | ESP32 GPIO | Measurement |
|---|---|---|---|
| Top-Oil Temperature | DS18B20 / PT100 | GPIO 4 | -55°C to +125°C |
| Primary Load Current | ACS712 / CT | GPIO 34 (ADC1) | True-AC RMS (A) |
| Secondary Line Voltage | ZMPT101B | GPIO 35 (ADC1) | True-AC RMS (V) |
| Mechanical Vibration | MPU6050 | I2C (SDA 21, SCL 22) | RMS Acceleration (m/s²) |
| Harmonic Distortion | Calculation | FFT on Current Samples | Total Harmonic Distortion (%) |
| Combustible Gas | MQ-2 | GPIO 32 (ADC1) | Enclosure Gas Concentration (ppm)* |
| Ambient Temp / Humidity | DHT22 | GPIO 13 | Ambient °C & % RH |

> **IMPORTANT DISCLAIMER ON MQ-2 GAS SENSING:**
> The MQ-2 sensor measures combustible hydrocarbon/hydrogen concentrations in the ambient transformer enclosure. It does NOT perform ASTM D3612 Dissolved Gas Analysis (DGA) in transformer oil. Any gas alarm serves as a preliminary indication to schedule physical oil laboratory testing.

---

## License
Apache License 2.0. Built for industrial IoT reliability and predictive maintenance operations.

# TransGuard AI – System Architecture Documentation

## 1. System Overview
TransGuard AI is a modular, high-reliability industrial IoT predictive maintenance system designed for distribution transformers (5 kVA – 1000 kVA). It provides real-time condition assessment, IEEE C57.91 thermal aging tracking, transparent rule-based anomaly detection, and automated maintenance work-order generation.

```
+-------------------------------------------------------------------------------+
|                             DISTRIBUTION TRANSFORMER                          |
|  PT100/DS18B20 (Oil) | CT/ACS712 (Current) | ZMPT101B (Voltage) | MPU6050 (Vib)|
+-------------------------------------------------------------------------------+
                                      |
                                      v
+-------------------------------------------------------------------------------+
|                       EDGE HARDWARE NODE (ESP32 / STM32)                      |
|           • ADC RMS Sampling (12-bit)       • I2C Motion / Vibration          |
|           • USB Web Serial (115200)         • Wi-Fi HTTP / MQTT Pub           |
+-------------------------------------------------------------------------------+
                                      |
                +---------------------+---------------------+
                |                                           |
                v (MQTT 1883)                               v (REST / HTTP 3001)
+-------------------------------+           +-------------------------------+
|   MOSQUITTO MQTT BROKER       |           |   FASTIFY API SERVICE         |
|   • Pub/Sub Telemetry Broker  | --------> |   • Node.js + TypeScript      |
|   • Topics: transguard/#      |           |   • WebSockets (/ws/telemetry)|
+-------------------------------+           +-------------------------------+
                                                            |
                                    +-----------------------+-----------------------+
                                    |                                               |
                                    v                                               v
                    +-------------------------------+               +-------------------------------+
                    |   POSTGRESQL + TIMESCALEDB    |               |   PYTHON FASTAPI AI ENGINE    |
                    |   • Raw SQL migrations        |               |   • IEEE C57.91 Aging Model   |
                    |   • Hypertables (Telemetry)   |               |   • Arrhenius Thermal RUL     |
                    |   • In-Memory Store Fallback  |               |   • Rule-Based Diagnostics    |
                    +-------------------------------+               +-------------------------------+
                                    |
                                    v
                    +-------------------------------+
                    |   REACT 18 + VITE FRONTEND    |
                    |   • Apache ECharts Visuals    |
                    |   • TanStack React Query      |
                    |   • Tailwind Industrial Theme |
                    |   • 8 Integrated Modules      |
                    +-------------------------------+
```

## 2. Core Subsystems

### A. Edge Telemetry Gateway (`firmware/esp32`, `firmware/stm32`)
- Multi-protocol ingestion: USB Serial, Wi-Fi HTTP, and MQTT.
- RMS True-AC current and voltage sampling at 100 ms windows.
- Non-blocking loop structure with 1-second telemetry broadcasting.

### B. High-Performance Fastify Backend (`services/api`)
- Fastify v4 HTTP engine with native TypeScript.
- Real-time bidirectional WebSocket server at `/ws/telemetry`.
- Dual repository strategy: Native PostgreSQL driver (`pg`) + resilient in-memory operational state buffer.
- Real-time stochastic telemetry simulator with distinct `source: 'simulator'` attribution.

### C. Predictive AI & Diagnostic Engine (`services/ai-engine`)
- Python 3.12 + FastAPI + NumPy + Pandas.
- IEEE C57.91 Insulation Aging Acceleration Factor:
  $$F_{AA} = \exp\left(\frac{15000}{383} - \frac{15000}{\theta_H + 273}\right)$$
- Multi-parameter Transformer Health Index (THI):
  $$\text{THI} = 0.28 S_{\text{winding}} + 0.24 S_{\text{oil}} + 0.18 S_{\text{PQ}} + 0.16 S_{\text{vib}} + 0.14 S_{\text{load}}$$

### D. Industrial Web Dashboard (`apps/web`)
- React 18 + Vite + Tailwind CSS.
- Apache ECharts dynamic time-series charts with smooth interpolation and warning/critical threshold lines.
- TanStack Query automatic polling and cache synchronization.

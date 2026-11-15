# TransGuard AI – REST & WebSocket API Specification

Base URL: `http://localhost:3001/api/v1`

## 1. Fleet & Assets

### `GET /fleet`
Returns global fleet KPIs and list of all monitored transformer assets.
```json
{
  "kpis": {
    "totalAssets": 4,
    "healthyCount": 2,
    "warningCount": 1,
    "criticalCount": 1,
    "avgHealthIndex": 74,
    "activeAlerts": 3,
    "openWorkOrders": 2,
    "connectedDevices": 4
  },
  "assets": [...]
}
```

### `GET /assets/:id`
Returns detailed asset profile, connected edge node details, active alerts, and associated work orders.

---

## 2. Telemetry Ingestion & Stream

### `GET /telemetry/:assetId`
Returns latest telemetry reading and historical ring buffer.

### `POST /telemetry`
Ingests telemetry packet from edge microcontrollers (ESP32/STM32) or simulator.
```json
{
  "assetId": "TG-TX-101",
  "oilTemp": 54.2,
  "windingTemp": 68.5,
  "current": 120.4,
  "voltage": 415.0,
  "vib": 1.15,
  "thd": 2.2,
  "gas": 85,
  "source": "hardware"
}
```

### `WS /ws/telemetry`
Bidirectional WebSocket stream broadcasting `telemetry_update`, `alert_acknowledged`, and `work_order_created` events.

---

## 3. Alerts & Events

### `GET /alerts`
Query parameters: `?status=ACTIVE&severity=CRITICAL&assetId=TG-TX-103`

### `POST /alerts/:id/acknowledge`
```json
{
  "acknowledgedBy": "Shift Engineer Sharma"
}
```

### `POST /alerts/:id/resolve`
```json
{
  "resolvedNotes": "Thermal camera scan confirmed fan contactor reset. Temperatures returned to nominal."
}
```

---

## 4. Maintenance & Work Orders

### `GET /maintenance`
Query parameters: `?assetId=TG-TX-103&status=PENDING`

### `POST /maintenance`
Creates a new maintenance dispatch order.
```json
{
  "assetId": "TG-TX-102",
  "title": "Bushing Seal Inspection",
  "description": "Inspect oil seepage on primary HV bushings.",
  "priority": "HIGH",
  "assignedTo": "High Voltage Line Team"
}
```

### `POST /maintenance/:id/status`
Updates status: `{"status": "IN_PROGRESS" | "COMPLETED"}`

---

## 5. AI Diagnostics & Health Assessment

### `POST /health/assess`
Calls the Python AI diagnostic engine (with deterministic fallback) to compute THI, Arrhenius RUL, and fault classifications.

---

## 6. Reports & Audit Exports

- `GET /reports/export.csv` – Download complete fleet telemetry snapshot as UTF-8 CSV.
- `GET /reports/alerts.csv` – Download complete alert violation history as UTF-8 CSV.

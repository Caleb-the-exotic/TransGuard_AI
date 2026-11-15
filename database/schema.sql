-- ==============================================================================
-- TransGuard AI – PostgreSQL & TimescaleDB Core Schema
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Try enabling TimescaleDB if installed (gracefully continues if not present)
DO $$
BEGIN
  CREATE EXTENSION IF NOT EXISTS timescaledb CASCADE;
EXCEPTION
  WHEN OTHERS THEN
    RAISE NOTICE 'TimescaleDB extension not available, using standard PostgreSQL tables.';
END $$;

-- ------------------------------------------------------------------------------
-- 1. TRANSFORMERS (Assets)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS transformers (
  id                VARCHAR(50) PRIMARY KEY,
  name              VARCHAR(255) NOT NULL,
  location          VARCHAR(255) NOT NULL,
  capacity_kva      NUMERIC(10,2) NOT NULL,
  voltage_rating    VARCHAR(100) NOT NULL,
  cooling_type      VARCHAR(100) NOT NULL,
  manufacturer      VARCHAR(100) NOT NULL,
  serial_number     VARCHAR(100) NOT NULL,
  installation_date DATE NOT NULL,
  last_serviced     DATE NOT NULL,
  status            VARCHAR(20) NOT NULL DEFAULT 'NORMAL',
  health_index      NUMERIC(5,2) NOT NULL DEFAULT 100.0,
  rul_years         NUMERIC(5,2) NOT NULL DEFAULT 20.0,
  edge_device_id    VARCHAR(100),
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 2. EDGE DEVICES (Hardware nodes: ESP32 / STM32)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS edge_devices (
  device_id         VARCHAR(100) PRIMARY KEY,
  asset_id          VARCHAR(50) REFERENCES transformers(id) ON DELETE SET NULL,
  hardware          VARCHAR(100) NOT NULL,
  connection_type   VARCHAR(100) NOT NULL,
  ip_address        VARCHAR(50) NOT NULL,
  mac_address       VARCHAR(50) NOT NULL,
  rssi              INT NOT NULL DEFAULT 0,
  status            VARCHAR(20) NOT NULL DEFAULT 'OFFLINE',
  firmware_version  VARCHAR(50) NOT NULL,
  uptime_seconds    BIGINT NOT NULL DEFAULT 0,
  last_seen         TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  sensors_connected TEXT[] NOT NULL DEFAULT '{}',
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 3. SENSOR READINGS (Time-series telemetry)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS sensor_readings (
  id                UUID DEFAULT uuid_generate_v4(),
  asset_id          VARCHAR(50) NOT NULL REFERENCES transformers(id) ON DELETE CASCADE,
  device_id         VARCHAR(100),
  timestamp         TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  oil_temp          NUMERIC(6,2),
  winding_temp      NUMERIC(6,2),
  current_a         NUMERIC(8,3),
  voltage_v         NUMERIC(8,2),
  vibration         NUMERIC(6,3),
  thd_pct           NUMERIC(5,2),
  gas_ppm           NUMERIC(8,2),
  ambient_temp      NUMERIC(6,2),
  humidity_pct      NUMERIC(5,2),
  source            VARCHAR(30) NOT NULL DEFAULT 'simulator',
  PRIMARY KEY (id, timestamp)
);

CREATE INDEX IF NOT EXISTS idx_sensor_readings_asset_time ON sensor_readings(asset_id, timestamp DESC);

-- Enable TimescaleDB hypertable if Timescale is loaded
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_extension WHERE extname = 'timescaledb') THEN
    PERFORM create_hypertable('sensor_readings', 'timestamp', if_not_exists => TRUE);
  END IF;
EXCEPTION
  WHEN OTHERS THEN
    RAISE NOTICE 'Skipping hypertable conversion.';
END $$;

-- ------------------------------------------------------------------------------
-- 4. ALERTS & NOTIFICATIONS
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS alerts (
  id                VARCHAR(50) PRIMARY KEY,
  asset_id          VARCHAR(50) NOT NULL REFERENCES transformers(id) ON DELETE CASCADE,
  timestamp         TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  severity          VARCHAR(20) NOT NULL,
  parameter         VARCHAR(100) NOT NULL,
  value             NUMERIC(10,3) NOT NULL,
  unit              VARCHAR(20) NOT NULL,
  threshold         NUMERIC(10,3) NOT NULL,
  message           TEXT NOT NULL,
  status            VARCHAR(30) NOT NULL DEFAULT 'ACTIVE',
  acknowledged_by   VARCHAR(100),
  resolved_notes    TEXT,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_alerts_status ON alerts(status);
CREATE INDEX IF NOT EXISTS idx_alerts_asset ON alerts(asset_id);

-- ------------------------------------------------------------------------------
-- 5. WORK ORDERS & PREDICTIVE MAINTENANCE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS work_orders (
  id                VARCHAR(50) PRIMARY KEY,
  asset_id          VARCHAR(50) NOT NULL REFERENCES transformers(id) ON DELETE CASCADE,
  title             VARCHAR(255) NOT NULL,
  description       TEXT NOT NULL,
  priority          VARCHAR(20) NOT NULL DEFAULT 'MEDIUM',
  status            VARCHAR(30) NOT NULL DEFAULT 'PENDING',
  assigned_to       VARCHAR(100) NOT NULL,
  due_date          DATE,
  created_date      DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 6. HEALTH ASSESSMENTS (AI & Rule Engine Output Logs)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS health_assessments (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  asset_id          VARCHAR(50) NOT NULL REFERENCES transformers(id) ON DELETE CASCADE,
  timestamp         TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  health_index      NUMERIC(5,2) NOT NULL,
  winding_score     NUMERIC(5,2) NOT NULL,
  oil_score         NUMERIC(5,2) NOT NULL,
  pq_score          NUMERIC(5,2) NOT NULL,
  mech_score        NUMERIC(5,2) NOT NULL,
  load_score        NUMERIC(5,2) NOT NULL,
  faa               NUMERIC(8,4) NOT NULL,
  rul_years         NUMERIC(5,2) NOT NULL,
  overall_status    VARCHAR(20) NOT NULL,
  anomalies         JSONB NOT NULL DEFAULT '[]',
  faults            JSONB NOT NULL DEFAULT '[]',
  recommendations   JSONB NOT NULL DEFAULT '[]'
);

CREATE INDEX IF NOT EXISTS idx_health_assessments_asset ON health_assessments(asset_id, timestamp DESC);

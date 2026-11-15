-- TransGuard AI – Seed 001: Fleet Assets & Connected Edge Nodes

INSERT INTO transformers (
  id, name, location, capacity_kva, voltage_rating, cooling_type,
  manufacturer, serial_number, installation_date, last_serviced,
  status, health_index, rul_years, edge_device_id
) VALUES
  (
    'TG-TX-101',
    'Substation Alpha – Main Stepdown',
    'Sector 4, North Grid Substation',
    500.0,
    '11 kV / 415 V',
    'ONAN (Oil Natural Air Natural)',
    'ABB Power Grids',
    'ABB-2019-TX9941',
    '2019-04-12',
    '2026-08-10',
    'NORMAL',
    92.0,
    14.8,
    'ESP32-NODE-01'
  ),
  (
    'TG-TX-102',
    'Industrial Feeder – Steel Works',
    'Heavy Industrial Zone, Feeder 3B',
    1000.0,
    '11 kV / 415 V',
    'ONAF (Oil Natural Air Forced)',
    'Siemens Energy',
    'SIE-2016-TX4421',
    '2016-11-20',
    '2026-05-18',
    'WARNING',
    68.0,
    7.2,
    'ESP32-NODE-02'
  ),
  (
    'TG-TX-103',
    'Metro Traction Yard Transformer',
    'Central Rail Depot, Bay 2',
    750.0,
    '22 kV / 415 V',
    'ONAN (Oil Natural Air Natural)',
    'Schneider Electric',
    'SCH-2014-TX1108',
    '2014-02-15',
    '2025-12-05',
    'CRITICAL',
    47.0,
    2.8,
    'ESP32-NODE-03'
  ),
  (
    'TG-ESP32-LOCAL',
    'Benchtop Hardware IoT Unit',
    'R&D Lab 2 – Prototype Testbench',
    5.0,
    '230 V / 12 V',
    'Dry / Natural Air',
    'TransGuard AI Open Hardware',
    'TG-PROTO-ESP32-V1',
    '2026-01-10',
    '2026-11-10',
    'NORMAL',
    88.0,
    12.5,
    'TG-ESP32-USB-01'
  )
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  location = EXCLUDED.location,
  status = EXCLUDED.status,
  health_index = EXCLUDED.health_index,
  rul_years = EXCLUDED.rul_years;

INSERT INTO edge_devices (
  device_id, asset_id, hardware, connection_type,
  ip_address, mac_address, rssi, status,
  firmware_version, uptime_seconds, last_seen, sensors_connected
) VALUES
  (
    'ESP32-NODE-01',
    'TG-TX-101',
    'ESP32-WROOM-32D',
    'Wi-Fi 802.11 b/g/n (WPA2)',
    '192.168.1.101',
    '24:6F:28:AB:11:42',
    -58,
    'ONLINE',
    'v2.4.1-transguard',
    842100,
    NOW(),
    ARRAY['PT100 (MAX31865)', 'Current CT (SCT-013)', 'ZMPT101B Voltage', 'DHT22', 'MPU6050']
  ),
  (
    'ESP32-NODE-02',
    'TG-TX-102',
    'ESP32-S3-WROOM-1',
    '4G LTE / GSM Cellular Gateway',
    '10.42.18.55',
    '30:30:F9:C2:55:18',
    -72,
    'ONLINE',
    'v2.4.1-transguard',
    521400,
    NOW(),
    ARRAY['Dual DS18B20', 'Current CT 500A:5A', 'Voltage Transducer', 'MQ-2 Gas', 'MPU6050']
  ),
  (
    'ESP32-NODE-03',
    'TG-TX-103',
    'STM32F4 + ESP32 Bridge',
    'Industrial RS-485 Modbus + Wi-Fi',
    '192.168.1.103',
    '78:E3:6D:19:90:3A',
    -65,
    'ONLINE',
    'v2.3.8-modbus',
    120480,
    NOW(),
    ARRAY['Multi-channel RTD Pt100', 'Rogowski Coil', 'Vibration Accelerometer', 'MQ-2 Gas']
  ),
  (
    'TG-ESP32-USB-01',
    'TG-ESP32-LOCAL',
    'ESP32 DevKit V1 (USB-C)',
    'USB Web Serial (115200 Baud) / Local HTTP',
    '127.0.0.1 (Local Serial)',
    'A0:B7:65:04:1E:88',
    0,
    'ONLINE',
    'v2.5.0-edge-bench',
    14200,
    NOW(),
    ARRAY['DS18B20 Temp', 'ACS712 5A Current', 'ZMPT101B 250V AC', 'MPU6050 Vib', 'MQ-2 Gas', 'DHT22']
  )
ON CONFLICT (device_id) DO UPDATE SET
  status = EXCLUDED.status,
  rssi = EXCLUDED.rssi,
  last_seen = NOW();

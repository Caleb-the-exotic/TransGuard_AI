-- TransGuard AI – Seed 002: Alerts & Events

INSERT INTO alerts (
  id, asset_id, timestamp, severity, parameter,
  value, unit, threshold, message, status, acknowledged_by
) VALUES
  (
    'ALT-1001',
    'TG-TX-103',
    NOW() - INTERVAL '14 minutes',
    'CRITICAL',
    'Winding Hotspot',
    108.6,
    '°C',
    105.0,
    'Winding hotspot temperature exceeded IEEE critical insulation limit (105°C). Immediate inspection required.',
    'ACTIVE',
    NULL
  ),
  (
    'ALT-1002',
    'TG-TX-103',
    NOW() - INTERVAL '25 minutes',
    'CRITICAL',
    'Combustible Gas',
    512.0,
    'ppm',
    450.0,
    'Combustible gas sensor (MQ-2) reading elevated. NOTE: MQ-2 detects ambient combustible gas; not a DGA substitute.',
    'ACTIVE',
    NULL
  ),
  (
    'ALT-1003',
    'TG-TX-102',
    NOW() - INTERVAL '48 minutes',
    'WARNING',
    'Top Oil Temp',
    76.8,
    '°C',
    75.0,
    'Top-oil temperature approaching upper warning limit; check cooling fan contactor.',
    'ACKNOWLEDGED',
    'Chief Engineer Sharma'
  ),
  (
    'ALT-1004',
    'TG-TX-102',
    NOW() - INTERVAL '75 minutes',
    'WARNING',
    'THD %',
    5.4,
    '%',
    5.0,
    'Harmonic distortion exceeds IEEE 519 5% guideline due to nonlinear steel plant loads.',
    'ACTIVE',
    NULL
  ),
  (
    'ALT-1005',
    'TG-TX-101',
    NOW() - INTERVAL '180 minutes',
    'NORMAL',
    'Primary Load Current',
    142.0,
    'A',
    220.0,
    'Peak load test completed smoothly; all thermal margins normal.',
    'RESOLVED',
    'Operator Unit 1'
  )
ON CONFLICT (id) DO NOTHING;

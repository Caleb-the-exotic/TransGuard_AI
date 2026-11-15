-- TransGuard AI – Seed 003: Maintenance Work Orders

INSERT INTO work_orders (
  id, asset_id, title, description,
  priority, status, assigned_to, due_date, created_date
) VALUES
  (
    'WO-2026-081',
    'TG-TX-103',
    'Emergency Radiator De-clogging & DGA Sampling',
    'Inspect radiator fins, test auxiliary fan relays, and draw oil sample for ASTM D3612 Dissolved Gas Analysis.',
    'HIGH',
    'IN_PROGRESS',
    'Substation Maintenance Team A',
    '2026-11-16',
    '2026-11-15'
  ),
  (
    'WO-2026-079',
    'TG-TX-102',
    'Harmonic Filter Inspection & Bushing Cleaning',
    'Verify 5th harmonic notch filter capacitor banks and perform thermographic sweep on primary bushings.',
    'MEDIUM',
    'PENDING',
    'Power Quality Specialist R. Verma',
    '2026-11-18',
    '2026-11-14'
  ),
  (
    'WO-2026-074',
    'TG-TX-101',
    'Quarterly Silica Gel Breather Replacement',
    'Routine desiccant replacement and dehydrating breather check.',
    'LOW',
    'COMPLETED',
    'Technician K. Patel',
    '2026-11-12',
    '2026-11-08'
  )
ON CONFLICT (id) DO NOTHING;

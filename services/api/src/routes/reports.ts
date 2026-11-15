import type { FastifyInstance } from 'fastify';
import { fleetAssets, alerts, workOrders } from '../repositories/inMemoryStore.js';

export async function reportRoutes(app: FastifyInstance) {
  // GET /api/v1/reports/export.csv
  app.get('/reports/export.csv', async (req, reply) => {
    const headers = [
      'Asset_ID',
      'Asset_Name',
      'Location',
      'Capacity_kVA',
      'Voltage_Rating',
      'Status',
      'Health_Index',
      'RUL_Years',
      'Oil_Temp_C',
      'Winding_Temp_C',
      'Current_A',
      'Voltage_V',
      'Vibration_RMS',
      'THD_Percent',
      'Combustible_Gas_PPM',
      'Last_Serviced'
    ];

    const rows = fleetAssets.map(a => [
      a.id,
      `"${a.name}"`,
      `"${a.location}"`,
      a.capacityKva,
      `"${a.voltageRating}"`,
      a.status,
      a.healthIndex,
      a.rulYears,
      a.telemetry.oilTemp,
      a.telemetry.windingTemp,
      a.telemetry.current,
      a.telemetry.voltage,
      a.telemetry.vib,
      a.telemetry.thd,
      a.telemetry.gas,
      a.lastServiced
    ].join(','));

    const csv = [headers.join(','), ...rows].join('\n');

    reply
      .header('Content-Type', 'text/csv; charset=utf-8')
      .header('Content-Disposition', `attachment; filename="transguard_fleet_report_${new Date().toISOString().split('T')[0]}.csv"`)
      .send(csv);
  });

  // GET /api/v1/reports/alerts.csv
  app.get('/reports/alerts.csv', async (req, reply) => {
    const headers = [
      'Alert_ID',
      'Asset_ID',
      'Timestamp',
      'Severity',
      'Parameter',
      'Value',
      'Unit',
      'Threshold',
      'Status',
      'Acknowledged_By',
      'Message'
    ];

    const rows = alerts.map(a => [
      a.id,
      a.assetId,
      `"${a.timestamp}"`,
      a.severity,
      `"${a.parameter}"`,
      a.value,
      `"${a.unit}"`,
      a.threshold,
      a.status,
      `"${a.acknowledgedBy || 'None'}"`,
      `"${a.message.replace(/"/g, '""')}"`
    ].join(','));

    const csv = [headers.join(','), ...rows].join('\n');

    reply
      .header('Content-Type', 'text/csv; charset=utf-8')
      .header('Content-Disposition', `attachment; filename="transguard_alerts_report_${new Date().toISOString().split('T')[0]}.csv"`)
      .send(csv);
  });
}

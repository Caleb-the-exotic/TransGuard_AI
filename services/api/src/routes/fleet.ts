import type { FastifyInstance } from 'fastify';
import { fleetAssets, alerts, workOrders, edgeDevices } from '../repositories/inMemoryStore.js';
import { isPostgresConnected, query } from '../repositories/db.js';

export async function fleetRoutes(app: FastifyInstance) {
  // GET /api/v1/fleet
  app.get('/fleet', async (req, reply) => {
    try {
      if (isPostgresConnected) {
        const rows = await query('SELECT * FROM transformers ORDER BY id ASC');
        if (rows.length > 0) {
          const totalAssets = rows.length;
          const healthyCount = rows.filter((r: any) => r.status === 'NORMAL').length;
          const warningCount = rows.filter((r: any) => r.status === 'WARNING').length;
          const criticalCount = rows.filter((r: any) => r.status === 'CRITICAL').length;
          const avgHealthIndex = Math.round(
            rows.reduce((sum: number, r: any) => sum + parseFloat(r.health_index || 0), 0) / totalAssets
          );

          return {
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
          };
        }
      }
    } catch {
      // Fallback
    }

    const totalAssets = fleetAssets.length;
    const healthyCount = fleetAssets.filter(a => a.status === 'NORMAL').length;
    const warningCount = fleetAssets.filter(a => a.status === 'WARNING').length;
    const criticalCount = fleetAssets.filter(a => a.status === 'CRITICAL').length;
    const avgHealthIndex = Math.round(
      fleetAssets.reduce((sum, a) => sum + a.healthIndex, 0) / totalAssets
    );

    return {
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
    };
  });

  // GET /api/v1/assets/:id
  app.get('/assets/:id', async (req, reply) => {
    const { id } = req.params as { id: string };
    const asset = fleetAssets.find(a => a.id === id);
    if (!asset) {
      return reply.status(404).send({ error: `Asset '${id}' not found` });
    }

    const assetAlerts = alerts.filter(a => a.assetId === id);
    const assetWorkOrders = workOrders.filter(w => w.assetId === id);
    const device = edgeDevices.find(d => d.assetId === id) || null;

    return {
      ...asset,
      alerts: assetAlerts,
      workOrders: assetWorkOrders,
      device
    };
  });
}

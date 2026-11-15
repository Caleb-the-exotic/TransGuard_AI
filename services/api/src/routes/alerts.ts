import type { FastifyInstance } from 'fastify';
import { alerts } from '../repositories/inMemoryStore.js';
import { wsBroadcast } from '../websocket/handler.js';

export async function alertRoutes(app: FastifyInstance) {
  // GET /api/v1/alerts
  app.get('/alerts', async (req) => {
    const query = req.query as { status?: string; severity?: string; assetId?: string };

    let filtered = [...alerts];
    if (query.status) {
      filtered = filtered.filter(a => a.status === query.status);
    }
    if (query.severity) {
      filtered = filtered.filter(a => a.severity === query.severity);
    }
    if (query.assetId) {
      filtered = filtered.filter(a => a.assetId === query.assetId);
    }

    return {
      total: filtered.length,
      alerts: filtered
    };
  });

  // POST /api/v1/alerts/:id/acknowledge
  app.post('/alerts/:id/acknowledge', async (req, reply) => {
    const { id } = req.params as { id: string };
    const body = (req.body || {}) as { acknowledgedBy?: string };

    const alert = alerts.find(a => a.id === id);
    if (!alert) {
      return reply.status(404).send({ error: `Alert '${id}' not found` });
    }

    alert.status = 'ACKNOWLEDGED';
    alert.acknowledgedBy = body.acknowledgedBy || 'Station Operator';

    wsBroadcast({
      type: 'alert_acknowledged',
      alert
    });

    return { success: true, alert };
  });

  // POST /api/v1/alerts/:id/resolve
  app.post('/alerts/:id/resolve', async (req, reply) => {
    const { id } = req.params as { id: string };
    const body = (req.body || {}) as { resolvedNotes?: string };

    const alert = alerts.find(a => a.id === id);
    if (!alert) {
      return reply.status(404).send({ error: `Alert '${id}' not found` });
    }

    alert.status = 'RESOLVED';
    alert.resolvedNotes = body.resolvedNotes || 'Resolved during shift inspection.';

    wsBroadcast({
      type: 'alert_resolved',
      alert
    });

    return { success: true, alert };
  });
}

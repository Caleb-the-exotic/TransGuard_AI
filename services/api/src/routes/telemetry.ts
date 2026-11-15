import type { FastifyInstance } from 'fastify';
import { fleetAssets, telemetryHistory, appendTelemetry, getLatestTelemetry } from '../repositories/inMemoryStore.js';
import { wsBroadcast } from '../websocket/handler.js';

export async function telemetryRoutes(app: FastifyInstance) {
  // GET /api/v1/telemetry/:assetId
  app.get('/telemetry/:assetId', async (req, reply) => {
    const { assetId } = req.params as { assetId: string };
    const asset = fleetAssets.find(a => a.id === assetId);
    if (!asset) {
      return reply.status(404).send({ error: `Asset '${assetId}' not found` });
    }

    const history = telemetryHistory[assetId] || [];
    const latest = getLatestTelemetry(assetId) || {
      ...asset.telemetry,
      timestamp: new Date().toISOString(),
      source: 'baseline'
    };

    return {
      assetId,
      latest,
      historyCount: history.length,
      history
    };
  });

  // POST /api/v1/telemetry (Ingest from ESP32 / STM32 / Simulator)
  app.post('/telemetry', async (req, reply) => {
    const body = req.body as {
      pod_id?: string;
      assetId?: string;
      oilTemp?: number;
      windingTemp?: number;
      current?: number;
      voltage?: number;
      vib?: number;
      thd?: number;
      gas?: number;
      ambient?: number;
      humidity?: number;
      source?: string;
    };

    const targetId = body.assetId || body.pod_id || 'TG-ESP32-LOCAL';
    const source = body.source || (body.pod_id ? 'hardware' : 'simulator');

    const readings: Record<string, number> = {};
    if (typeof body.oilTemp === 'number') readings.oilTemp = body.oilTemp;
    if (typeof body.windingTemp === 'number') readings.windingTemp = body.windingTemp;
    if (typeof body.current === 'number') readings.current = body.current;
    if (typeof body.voltage === 'number') readings.voltage = body.voltage;
    if (typeof body.vib === 'number') readings.vib = body.vib;
    if (typeof body.thd === 'number') readings.thd = body.thd;
    if (typeof body.gas === 'number') readings.gas = body.gas;
    if (typeof body.ambient === 'number') readings.ambient = body.ambient;
    if (typeof body.humidity === 'number') readings.humidity = body.humidity;

    appendTelemetry(targetId, readings, source);

    wsBroadcast({
      type: 'telemetry_update',
      assetId: targetId,
      telemetry: readings,
      timestamp: new Date().toISOString(),
      source
    }, targetId);

    return {
      success: true,
      assetId: targetId,
      receivedAt: new Date().toISOString(),
      source
    };
  });
}

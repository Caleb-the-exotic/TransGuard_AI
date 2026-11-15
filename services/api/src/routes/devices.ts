import type { FastifyInstance } from 'fastify';
import { edgeDevices } from '../repositories/inMemoryStore.js';

export async function deviceRoutes(app: FastifyInstance) {
  // GET /api/v1/devices
  app.get('/devices', async () => {
    return {
      total: edgeDevices.length,
      onlineCount: edgeDevices.filter(d => d.status === 'ONLINE').length,
      devices: edgeDevices
    };
  });

  // GET /api/v1/devices/:id
  app.get('/devices/:id', async (req, reply) => {
    const { id } = req.params as { id: string };
    const dev = edgeDevices.find(d => d.deviceId === id);
    if (!dev) {
      return reply.status(404).send({ error: `Device '${id}' not found` });
    }
    return dev;
  });
}

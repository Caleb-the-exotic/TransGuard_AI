import Fastify from 'fastify';
import cors from '@fastify/cors';
import websocket from '@fastify/websocket';
import rateLimit from '@fastify/rate-limit';

import { config } from './config/env.js';
import { fleetRoutes } from './routes/fleet.js';
import { telemetryRoutes } from './routes/telemetry.js';
import { alertRoutes } from './routes/alerts.js';
import { maintenanceRoutes } from './routes/maintenance.js';
import { deviceRoutes } from './routes/devices.js';
import { reportRoutes } from './routes/reports.js';
import { healthRoutes } from './routes/health.js';
import { wsRoutes } from './websocket/handler.js';

export async function buildApp() {
  const app = Fastify({
    logger: {
      level: config.logLevel
    }
  });

  // Enable CORS
  await app.register(cors, {
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true
  });

  // Rate Limiting (safe high threshold for industrial dashboard polling)
  await app.register(rateLimit, {
    max: 600,
    timeWindow: '1 minute'
  });

  // WebSocket support
  await app.register(websocket);

  // Register WebSocket routes
  await app.register(wsRoutes);

  // Register REST API routes under /api/v1
  await app.register(fleetRoutes, { prefix: '/api/v1' });
  await app.register(telemetryRoutes, { prefix: '/api/v1' });
  await app.register(alertRoutes, { prefix: '/api/v1' });
  await app.register(maintenanceRoutes, { prefix: '/api/v1' });
  await app.register(deviceRoutes, { prefix: '/api/v1' });
  await app.register(reportRoutes, { prefix: '/api/v1' });
  await app.register(healthRoutes, { prefix: '/api/v1' });

  // Legacy route compatibility for existing hardware / direct consumers
  await app.register(fleetRoutes, { prefix: '/api' });
  await app.register(telemetryRoutes, { prefix: '/api' });
  await app.register(alertRoutes, { prefix: '/api' });
  await app.register(maintenanceRoutes, { prefix: '/api' });
  await app.register(deviceRoutes, { prefix: '/api' });

  // Health check endpoint
  app.get('/health', async () => ({
    status: 'healthy',
    service: 'transguard-api',
    version: '3.0.0',
    timestamp: new Date().toISOString()
  }));

  return app;
}

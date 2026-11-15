import { buildApp } from './app.js';
import { config } from './config/env.js';
import { initDatabase } from './repositories/db.js';
import { initMqtt } from './mqtt/client.js';
import { startTelemetrySimulator } from './services/simulator.js';

async function start() {
  console.log('------------------------------------------------------------');
  console.log('  TransGuard AI – Industrial Telemetry Platform v3.0');
  console.log('------------------------------------------------------------');

  // Initialize Database (attempts PostgreSQL connection with in-memory fallback)
  await initDatabase();

  // Initialize MQTT Client (if broker configured)
  await initMqtt();

  // Start internal Telemetry Simulator (provides continuous live data)
  startTelemetrySimulator();

  // Build and launch Fastify server
  const app = await buildApp();

  try {
    await app.listen({ port: config.port, host: config.host });
    console.log(`\n TransGuard AI Fastify API Server running:`);
    console.log(`  - Local:     http://localhost:${config.port}`);
    console.log(`  - Fleet API: http://localhost:${config.port}/api/v1/fleet`);
    console.log(`  - Telemetry: http://localhost:${config.port}/api/v1/telemetry/TG-TX-101`);
    console.log(`  - WebSocket: ws://localhost:${config.port}/ws/telemetry`);
    console.log(`  - Health:    http://localhost:${config.port}/health\n`);
  } catch (err: any) {
    app.log.error(err);
    process.exit(1);
  }
}

start();

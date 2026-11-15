import type { FastifyInstance } from 'fastify';

interface WSClient {
  socket: any;
  assetFilter: string | null;
}

const connectedClients = new Set<WSClient>();

export function wsBroadcast(data: unknown, targetAssetId?: string) {
  const payload = JSON.stringify(data);
  for (const client of connectedClients) {
    try {
      if (!targetAssetId || !client.assetFilter || client.assetFilter === targetAssetId) {
        if (client.socket.readyState === 1 /* OPEN */) {
          client.socket.send(payload);
        }
      }
    } catch {
      connectedClients.delete(client);
    }
  }
}

export async function wsRoutes(app: FastifyInstance) {
  app.get('/ws/telemetry', { websocket: true }, (socket, req) => {
    const client: WSClient = { socket, assetFilter: null };
    connectedClients.add(client);

    // Send connection greeting with server status
    socket.send(JSON.stringify({
      type: 'connection_ack',
      message: 'TransGuard AI Industrial Telemetry WebSocket Stream connected.',
      timestamp: new Date().toISOString()
    }));

    socket.on('message', (msgBuffer: Buffer) => {
      try {
        const msg = JSON.parse(msgBuffer.toString());
        if (msg.type === 'subscribe_asset' && msg.assetId) {
          client.assetFilter = msg.assetId;
          socket.send(JSON.stringify({
            type: 'subscription_confirmed',
            assetId: msg.assetId
          }));
        } else if (msg.type === 'ping') {
          socket.send(JSON.stringify({
            type: 'pong',
            timestamp: new Date().toISOString()
          }));
        }
      } catch {
        // Ignore unparseable frames
      }
    });

    socket.on('close', () => {
      connectedClients.delete(client);
    });

    socket.on('error', () => {
      connectedClients.delete(client);
    });
  });
}

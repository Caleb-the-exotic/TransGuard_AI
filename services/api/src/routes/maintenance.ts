import type { FastifyInstance } from 'fastify';
import { workOrders, WorkOrder } from '../repositories/inMemoryStore.js';
import { wsBroadcast } from '../websocket/handler.js';

export async function maintenanceRoutes(app: FastifyInstance) {
  // GET /api/v1/maintenance
  app.get('/maintenance', async (req) => {
    const query = req.query as { assetId?: string; status?: string };

    let filtered = [...workOrders];
    if (query.assetId) {
      filtered = filtered.filter(w => w.assetId === query.assetId);
    }
    if (query.status) {
      filtered = filtered.filter(w => w.status === query.status);
    }

    return {
      total: filtered.length,
      workOrders: filtered
    };
  });

  // POST /api/v1/maintenance (Create work order)
  app.post('/maintenance', async (req, reply) => {
    const body = req.body as Partial<WorkOrder>;
    if (!body.assetId || !body.title) {
      return reply.status(400).send({ error: 'assetId and title are required' });
    }

    const newOrder: WorkOrder = {
      id: `WO-${Date.now().toString().slice(-6)}`,
      assetId: body.assetId,
      title: body.title,
      description: body.description || '',
      priority: body.priority || 'MEDIUM',
      status: body.status || 'PENDING',
      assignedTo: body.assignedTo || 'Unassigned',
      dueDate: body.dueDate || new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
      createdDate: new Date().toISOString().split('T')[0]
    };

    workOrders.unshift(newOrder);

    wsBroadcast({
      type: 'work_order_created',
      workOrder: newOrder
    });

    return { success: true, workOrder: newOrder };
  });

  // POST /api/v1/maintenance/:id/status
  app.post('/maintenance/:id/status', async (req, reply) => {
    const { id } = req.params as { id: string };
    const body = req.body as { status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' };

    const order = workOrders.find(w => w.id === id);
    if (!order) {
      return reply.status(404).send({ error: `Work order '${id}' not found` });
    }

    order.status = body.status;

    wsBroadcast({
      type: 'work_order_updated',
      workOrder: order
    });

    return { success: true, workOrder: order };
  });
}

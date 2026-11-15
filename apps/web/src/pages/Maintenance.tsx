import React, { useState } from 'react';
import { useMaintenance, useFleet, useCreateWorkOrder, useUpdateWorkOrderStatus } from '../hooks/useFleet.js';
import { WorkOrderItem } from '../types/index.js';
import {
  Wrench,
  Plus,
  Clock,
  CheckCircle2,
  AlertCircle,
  Calendar,
  User,
  ShieldAlert
} from 'lucide-react';

export const Maintenance: React.FC = () => {
  const { data: maintenanceData } = useMaintenance();
  const { data: fleetData } = useFleet();
  const createMutation = useCreateWorkOrder();
  const updateStatusMutation = useUpdateWorkOrderStatus();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newAssetId, setNewAssetId] = useState('TG-TX-101');
  const [newDescription, setNewDescription] = useState('');
  const [newPriority, setNewPriority] = useState<'HIGH' | 'MEDIUM' | 'LOW'>('MEDIUM');
  const [newAssignedTo, setNewAssignedTo] = useState('Substation Maintenance Crew');

  const workOrders = maintenanceData?.workOrders || [];
  const assets = fleetData?.assets || [];

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createMutation.mutate({
      title: newTitle,
      assetId: newAssetId,
      description: newDescription,
      priority: newPriority,
      assignedTo: newAssignedTo,
      dueDate: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0]
    });
    setIsModalOpen(false);
    setNewTitle('');
    setNewDescription('');
  };

  return (
    <div className="space-y-6">
      {/* ---------------------------------------------------------------------- */}
      {/* Top Banner & Create Button */}
      {/* ---------------------------------------------------------------------- */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-900/80 border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Wrench className="w-5 h-5 text-electric-400" />
            <h1 className="text-base font-bold text-white tracking-tight">Predictive Maintenance Work Orders</h1>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Condition-based field service dispatch, inspection scheduling, and maintenance lifecycle management.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-electric-500 hover:bg-electric-400 text-white text-xs font-semibold shadow-md shadow-electric-500/20 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>New Work Order</span>
        </button>
      </div>

      {/* ---------------------------------------------------------------------- */}
      {/* Work Orders List */}
      {/* ---------------------------------------------------------------------- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {workOrders.map((wo) => {
          let priorityBadge = 'bg-slate-800 text-slate-300';
          if (wo.priority === 'HIGH') priorityBadge = 'bg-red-950/80 text-red-400 border border-red-500/40';
          if (wo.priority === 'MEDIUM') priorityBadge = 'bg-amber-950/80 text-amber-400 border border-amber-500/40';

          return (
            <div
              key={wo.id}
              className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between space-y-4 hover:border-slate-700 transition-all"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-slate-500">{wo.id}</span>
                  <span className={`px-2 py-0.2 rounded text-[9px] font-mono font-bold uppercase ${priorityBadge}`}>
                    {wo.priority} Priority
                  </span>
                </div>

                <h3 className="text-sm font-bold text-white">{wo.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{wo.description}</p>
              </div>

              <div className="space-y-3 pt-3 border-t border-slate-800 text-xs">
                <div className="flex items-center justify-between text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-slate-500" />
                    <span>{wo.assignedTo}</span>
                  </div>
                  <span className="font-mono text-electric-400 font-semibold">{wo.assetId}</span>
                </div>

                <div className="flex items-center justify-between text-slate-500 text-[11px] font-mono">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>Due: {wo.dueDate}</span>
                  </div>

                  <select
                    value={wo.status}
                    onChange={(e) => updateStatusMutation.mutate({ id: wo.id, status: e.target.value })}
                    className="px-2 py-1 rounded bg-slate-950 border border-slate-700 text-[11px] font-mono font-bold text-white focus:outline-none"
                  >
                    <option value="PENDING">PENDING</option>
                    <option value="IN_PROGRESS">IN PROGRESS</option>
                    <option value="COMPLETED">COMPLETED</option>
                  </select>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ---------------------------------------------------------------------- */}
      {/* Create Work Order Modal */}
      {/* ---------------------------------------------------------------------- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-xl bg-slate-900 border border-slate-800 p-6 shadow-2xl space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Plus className="w-4 h-4 text-electric-400" />
              <span>Generate Maintenance Work Order</span>
            </h3>

            <form onSubmit={handleCreateSubmit} className="space-y-4">
              <div>
                <label className="text-[11px] font-mono text-slate-400 block mb-1">Target Transformer Asset:</label>
                <select
                  value={newAssetId}
                  onChange={(e) => setNewAssetId(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs font-mono text-white focus:outline-none"
                >
                  {assets.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.id} – {a.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[11px] font-mono text-slate-400 block mb-1">Work Order Title:</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Radiator Fin De-clogging & Thermographic Inspection"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-mono text-slate-400 block mb-1">Detailed Description:</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Scope of work, required PPE, safety lockout procedures..."
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-mono text-slate-400 block mb-1">Priority:</label>
                  <select
                    value={newPriority}
                    onChange={(e: any) => setNewPriority(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs font-mono text-white focus:outline-none"
                  >
                    <option value="LOW">LOW</option>
                    <option value="MEDIUM">MEDIUM</option>
                    <option value="HIGH">HIGH (Urgent)</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-mono text-slate-400 block mb-1">Assigned Crew / Engineer:</label>
                  <input
                    type="text"
                    required
                    value={newAssignedTo}
                    onChange={(e) => setNewAssignedTo(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-electric-500 hover:bg-electric-400 text-white text-xs font-semibold"
                >
                  Issue Work Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

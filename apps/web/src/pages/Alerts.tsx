import React, { useState } from 'react';
import { useAlerts, useAcknowledgeAlert, useResolveAlert } from '../hooks/useFleet.js';
import { getStatusBadgeClasses } from '../utils/analytics.js';
import { AlertItem } from '../types/index.js';
import {
  Bell,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Filter,
  Check,
  MessageSquare,
  Clock
} from 'lucide-react';

export const Alerts: React.FC = () => {
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [filterSeverity, setFilterSeverity] = useState<string>('ALL');

  const { data: alertsData, isLoading } = useAlerts();
  const ackMutation = useAcknowledgeAlert();
  const resMutation = useResolveAlert();

  const [activeModalAlert, setActiveModalAlert] = useState<{ alert: AlertItem; action: 'ACK' | 'RES' } | null>(null);
  const [inputText, setInputText] = useState('');

  const allAlerts = alertsData?.alerts || [];

  const filteredAlerts = allAlerts.filter(a => {
    if (filterStatus !== 'ALL' && a.status !== filterStatus) return false;
    if (filterSeverity !== 'ALL' && a.severity !== filterSeverity) return false;
    return true;
  });

  const handleActionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeModalAlert) return;

    if (activeModalAlert.action === 'ACK') {
      ackMutation.mutate({
        id: activeModalAlert.alert.id,
        name: inputText || 'Field Operator'
      });
    } else {
      resMutation.mutate({
        id: activeModalAlert.alert.id,
        notes: inputText || 'Inspected and verified within nominal parameters.'
      });
    }

    setActiveModalAlert(null);
    setInputText('');
  };

  return (
    <div className="space-y-6">
      {/* ---------------------------------------------------------------------- */}
      {/* Top Banner & Filter Controls */}
      {/* ---------------------------------------------------------------------- */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-900/80 border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-electric-400" />
            <h1 className="text-base font-bold text-white tracking-tight">Industrial Event & Alert Center</h1>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Active threshold violations, insulation warnings, and operational event history.
          </p>
        </div>

        {/* Filter Toolbar */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs font-mono">
            <span className="text-slate-500 pl-2">STATUS:</span>
            {['ALL', 'ACTIVE', 'ACKNOWLEDGED', 'RESOLVED'].map(st => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`px-2.5 py-1 rounded text-[11px] transition-all ${
                  filterStatus === st
                    ? 'bg-electric-500 text-white font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          <select
            value={filterSeverity}
            onChange={(e) => setFilterSeverity(e.target.value)}
            className="px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-xs font-mono text-white focus:outline-none"
          >
            <option value="ALL">All Severities</option>
            <option value="CRITICAL">Critical Only</option>
            <option value="WARNING">Warning Only</option>
            <option value="NORMAL">Normal / Info</option>
          </select>
        </div>
      </div>

      {/* ---------------------------------------------------------------------- */}
      {/* Alerts Table / List */}
      {/* ---------------------------------------------------------------------- */}
      <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-mono text-[11px]">
                <th className="py-2.5 px-3">Alert ID</th>
                <th className="py-2.5 px-3">Severity</th>
                <th className="py-2.5 px-3">Asset</th>
                <th className="py-2.5 px-3">Parameter / Message</th>
                <th className="py-2.5 px-3">Value / Threshold</th>
                <th className="py-2.5 px-3">Timestamp</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {filteredAlerts.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-500 font-sans">
                    <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-2 opacity-80" />
                    <span>No alerts match the selected status and severity filter.</span>
                  </td>
                </tr>
              ) : (
                filteredAlerts.map((alert) => (
                  <tr key={alert.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-3 px-3 font-bold text-white">{alert.id}</td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${getStatusBadgeClasses(alert.severity)}`}>
                        {alert.severity}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-semibold text-slate-200">{alert.assetId}</td>
                    <td className="py-3 px-3 font-sans max-w-xs">
                      <span className="font-semibold text-white block">{alert.parameter}</span>
                      <span className="text-[11px] text-slate-400 block line-clamp-1">{alert.message}</span>
                    </td>
                    <td className="py-3 px-3 text-slate-300">
                      <span className="font-bold text-white">{alert.value} {alert.unit}</span>
                      <span className="text-slate-500 block text-[10px]">Threshold: {alert.threshold} {alert.unit}</span>
                    </td>
                    <td className="py-3 px-3 text-slate-400 text-[11px] font-sans">
                      {new Date(alert.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        alert.status === 'ACTIVE'
                          ? 'bg-red-950/80 text-red-400 border border-red-500/40'
                          : alert.status === 'ACKNOWLEDGED'
                          ? 'bg-amber-950/80 text-amber-400 border border-amber-500/40'
                          : 'bg-emerald-950/80 text-emerald-400 border border-emerald-500/40'
                      }`}>
                        {alert.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right font-sans">
                      <div className="flex items-center justify-end gap-1.5">
                        {alert.status === 'ACTIVE' && (
                          <button
                            onClick={() => {
                              setActiveModalAlert({ alert, action: 'ACK' });
                              setInputText('Operator Unit 1');
                            }}
                            className="px-2 py-1 rounded text-[11px] font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
                          >
                            Acknowledge
                          </button>
                        )}
                        {alert.status !== 'RESOLVED' && (
                          <button
                            onClick={() => {
                              setActiveModalAlert({ alert, action: 'RES' });
                              setInputText('Cooling inspected; temperatures normalized.');
                            }}
                            className="px-2 py-1 rounded text-[11px] font-medium bg-emerald-950 hover:bg-emerald-900 text-emerald-400 border border-emerald-500/40"
                          >
                            Resolve
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ---------------------------------------------------------------------- */}
      {/* Action Modal (Acknowledge / Resolve) */}
      {/* ---------------------------------------------------------------------- */}
      {activeModalAlert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-xl bg-slate-900 border border-slate-800 p-6 shadow-2xl space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-electric-400" />
              <span>
                {activeModalAlert.action === 'ACK' ? 'Acknowledge Alert' : 'Resolve Alert'} – {activeModalAlert.alert.id}
              </span>
            </h3>

            <p className="text-xs text-slate-400">
              {activeModalAlert.alert.message}
            </p>

            <form onSubmit={handleActionSubmit} className="space-y-4">
              <div>
                <label className="text-[11px] font-mono text-slate-400 block mb-1">
                  {activeModalAlert.action === 'ACK' ? 'Acknowledged By (Engineer Name / Role):' : 'Resolution Log / Field Action Notes:'}
                </label>
                <input
                  type="text"
                  required
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-electric-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setActiveModalAlert(null)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-electric-500 hover:bg-electric-400 text-white text-xs font-semibold"
                >
                  Confirm
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

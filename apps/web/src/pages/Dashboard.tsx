import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFleet, useAlerts, useAcknowledgeAlert } from '../hooks/useFleet.js';
import { FleetDistributionChart } from '../components/charts/FleetDistributionChart.js';
import { getStatusBadgeClasses } from '../utils/analytics.js';
import {
  Shield,
  AlertTriangle,
  CheckCircle2,
  Wrench,
  Radio,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Cpu
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { data: fleetData, isLoading } = useFleet();
  const { data: alertsData } = useAlerts({ status: 'ACTIVE' });
  const ackMutation = useAcknowledgeAlert();

  const kpis = fleetData?.kpis || {
    totalAssets: 4,
    healthyCount: 2,
    warningCount: 1,
    criticalCount: 1,
    avgHealthIndex: 74,
    activeAlerts: 3,
    openWorkOrders: 2,
    connectedDevices: 4
  };

  const assets = fleetData?.assets || [];
  const activeAlerts = alertsData?.alerts || [];

  return (
    <div className="space-y-6">
      {/* Top Banner / Headline */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">Fleet Operational Overview</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time condition monitoring, health indices, and active risk mitigation across distribution fleet.
          </p>
        </div>

        <button
          onClick={() => navigate('/monitoring')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-electric-500 hover:bg-electric-400 text-white text-xs font-semibold shadow-md shadow-electric-500/20 transition-all"
        >
          <span>Open Live Monitor</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* ---------------------------------------------------------------------- */}
      {/* 1. Fleet KPI Summary Cards */}
      {/* ---------------------------------------------------------------------- */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Total Fleet Asset */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Fleet Transformers</span>
            <Cpu className="w-4 h-4 text-electric-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-white">{kpis.totalAssets}</div>
          <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>{kpis.connectedDevices} Edge Nodes Online</span>
          </div>
        </div>

        {/* Average Health Index */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Avg Fleet Health Index</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-white">
            {kpis.avgHealthIndex}
            <span className="text-xs font-normal text-slate-400"> / 100</span>
          </div>
          <div className="text-[11px] text-slate-500 mt-1">IEEE C57.91 Weighted Index</div>
        </div>

        {/* Active Critical & Warnings */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Active Alerts</span>
            <AlertTriangle className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-amber-400">{kpis.activeAlerts}</div>
          <div className="text-[11px] text-slate-500 mt-1">
            <span className="text-red-400 font-semibold">{kpis.criticalCount} Critical</span> •{' '}
            <span className="text-amber-400 font-semibold">{kpis.warningCount} Warning</span>
          </div>
        </div>

        {/* Work Orders */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Open Work Orders</span>
            <Wrench className="w-4 h-4 text-slate-300" />
          </div>
          <div className="text-2xl font-bold font-mono text-white">{kpis.openWorkOrders}</div>
          <div className="text-[11px] text-slate-500 mt-1">Prioritized field actions</div>
        </div>
      </div>

      {/* ---------------------------------------------------------------------- */}
      {/* 2. Middle Row: Fleet Health Distribution & Critical Events */}
      {/* ---------------------------------------------------------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Health Distribution Donut */}
        <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300">Fleet Health Breakdown</h2>
            <span className="text-[10px] font-mono text-slate-500">IEEE Guidelines</span>
          </div>

          <FleetDistributionChart
            healthy={kpis.healthyCount}
            warning={kpis.warningCount}
            critical={kpis.criticalCount}
            height={220}
          />

          <div className="grid grid-cols-3 gap-2 text-center text-xs mt-3 pt-3 border-t border-slate-800">
            <div className="p-1 rounded bg-emerald-950/40 border border-emerald-500/20">
              <span className="text-[10px] text-emerald-400 uppercase font-mono block">Normal</span>
              <span className="font-mono font-bold text-white">{kpis.healthyCount}</span>
            </div>
            <div className="p-1 rounded bg-amber-950/40 border border-amber-500/20">
              <span className="text-[10px] text-amber-400 uppercase font-mono block">Warning</span>
              <span className="font-mono font-bold text-white">{kpis.warningCount}</span>
            </div>
            <div className="p-1 rounded bg-red-950/40 border border-red-500/20">
              <span className="text-[10px] text-red-400 uppercase font-mono block">Critical</span>
              <span className="font-mono font-bold text-white">{kpis.criticalCount}</span>
            </div>
          </div>
        </div>

        {/* Right: Active Critical Alerts list */}
        <div className="lg:col-span-2 p-5 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300">Active High-Priority Alerts</h2>
            </div>
            <button
              onClick={() => navigate('/alerts')}
              className="text-[11px] text-electric-400 hover:text-electric-300 font-mono"
            >
              View All ({activeAlerts.length}) →
            </button>
          </div>

          <div className="space-y-3 flex-1 overflow-y-auto">
            {activeAlerts.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-slate-500 py-10">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mb-2 opacity-80" />
                <span className="text-xs">No active critical or warning alerts detected.</span>
              </div>
            ) : (
              activeAlerts.slice(0, 4).map((alert) => (
                <div
                  key={alert.id}
                  className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 hover:border-slate-700 flex items-start justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.2 rounded text-[9px] font-mono font-bold uppercase ${getStatusBadgeClasses(alert.severity)}`}>
                        {alert.severity}
                      </span>
                      <span className="text-xs font-mono font-semibold text-white">{alert.assetId}</span>
                      <span className="text-[10px] font-mono text-slate-500">• {alert.parameter}</span>
                    </div>
                    <p className="text-xs text-slate-300 line-clamp-1">{alert.message}</p>
                    <div className="text-[10px] font-mono text-slate-500">
                      Value: <span className="text-white font-bold">{alert.value} {alert.unit}</span> (Threshold: {alert.threshold} {alert.unit})
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center gap-2">
                    <button
                      onClick={() => ackMutation.mutate({ id: alert.id, name: 'Lead Engineer' })}
                      className="px-2.5 py-1 rounded text-[11px] font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
                    >
                      Acknowledge
                    </button>
                    <button
                      onClick={() => navigate(`/monitoring?asset=${alert.assetId}`)}
                      className="p-1 rounded hover:bg-slate-800 text-electric-400"
                      title="Inspect Asset"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------------------------- */}
      {/* 3. Fleet Asset Summary Table */}
      {/* ---------------------------------------------------------------------- */}
      <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300">Transformer Assets Status</h2>
            <p className="text-[11px] text-slate-500">Click any row to open full live sensor telemetry and IEEE analytics.</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-mono text-[11px]">
                <th className="py-2.5 px-3">Asset ID</th>
                <th className="py-2.5 px-3">Name / Location</th>
                <th className="py-2.5 px-3">Rating</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3">Health Index</th>
                <th className="py-2.5 px-3">Est. RUL</th>
                <th className="py-2.5 px-3">Top Oil</th>
                <th className="py-2.5 px-3">Winding</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {assets.map((asset) => (
                <tr
                  key={asset.id}
                  onClick={() => navigate(`/monitoring?asset=${asset.id}`)}
                  className="hover:bg-slate-800/40 cursor-pointer transition-colors"
                >
                  <td className="py-3 px-3 font-bold text-white">{asset.id}</td>
                  <td className="py-3 px-3 font-sans">
                    <span className="font-semibold text-slate-200 block">{asset.name}</span>
                    <span className="text-[10px] text-slate-500 block">{asset.location}</span>
                  </td>
                  <td className="py-3 px-3 text-slate-300">{asset.capacityKva} kVA</td>
                  <td className="py-3 px-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${getStatusBadgeClasses(asset.status)}`}>
                      {asset.status}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white">{asset.healthIndex}</span>
                      <div className="w-16 h-1.5 bg-slate-800 rounded-full overflow-hidden hidden sm:block">
                        <div
                          className={`h-full ${
                            asset.healthIndex >= 80 ? 'bg-emerald-500' : asset.healthIndex >= 60 ? 'bg-amber-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${asset.healthIndex}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-3 text-slate-300">{asset.rulYears} yrs</td>
                  <td className="py-3 px-3 text-slate-300">{asset.telemetry?.oilTemp ?? '--'} °C</td>
                  <td className="py-3 px-3 text-slate-300">{asset.telemetry?.windingTemp ?? '--'} °C</td>
                  <td className="py-3 px-3 text-right font-sans">
                    <span className="text-electric-400 hover:text-electric-300 text-xs font-medium">
                      Inspect →
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

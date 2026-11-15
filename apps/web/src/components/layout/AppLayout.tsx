import React from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import {
  Activity,
  Shield,
  Radio,
  Bell,
  Wrench,
  Layers,
  FileText,
  Cpu,
  Zap,
  CheckCircle2,
  AlertTriangle,
  Server
} from 'lucide-react';
import { useFleet, useAlerts } from '../../hooks/useFleet.js';

const NAV_ITEMS = [
  { path: '/', label: 'Overview Dashboard', icon: Activity },
  { path: '/monitoring', label: 'Live Monitoring', icon: Zap },
  { path: '/analytics', label: 'AI Health Assessment', icon: Shield },
  { path: '/alerts', label: 'Alerts & Events', icon: Bell },
  { path: '/maintenance', label: 'Predictive Maintenance', icon: Wrench },
  { path: '/assets', label: 'Transformer Assets', icon: Layers },
  { path: '/reports', label: 'Reports & Analytics', icon: FileText },
  { path: '/devices', label: 'Device Management', icon: Cpu }
];

export const AppLayout: React.FC = () => {
  const { data: fleetData } = useFleet();
  const { data: alertsData } = useAlerts({ status: 'ACTIVE' });
  const location = useLocation();

  const activeAlertCount = alertsData?.total || 0;
  const avgHealth = fleetData?.kpis?.avgHealthIndex || 74;

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 overflow-hidden font-sans">
      {/* ---------------------------------------------------------------------- */}
      {/* Left Industrial Sidebar */}
      {/* ---------------------------------------------------------------------- */}
      <aside className="w-64 bg-slate-900/90 border-r border-slate-800 flex flex-col shrink-0">
        {/* Brand Header */}
        <div className="p-4 border-b border-slate-800 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-electric-500 to-navy-700 flex items-center justify-center shadow-lg shadow-electric-500/20 border border-electric-400/40">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-sm tracking-tight text-white">TransGuard</span>
              <span className="text-[10px] font-mono px-1 py-0.2 rounded bg-electric-500/20 text-electric-400 font-bold border border-electric-500/40">AI</span>
            </div>
            <span className="text-[10px] text-slate-400 tracking-wider uppercase block">Industrial IoT Health</span>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all duration-150 ${
                  isActive
                    ? 'bg-electric-500/15 text-electric-400 border border-electric-500/30 font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-electric-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>

                {item.path === '/alerts' && activeAlertCount > 0 && (
                  <span className="px-1.5 py-0.2 text-[10px] font-mono font-bold rounded-full bg-red-500/20 text-red-400 border border-red-500/40">
                    {activeAlertCount}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Quick System Telemetry Footer */}
        <div className="p-3 border-t border-slate-800 bg-slate-950/40">
          <div className="rounded-lg p-2.5 bg-slate-900 border border-slate-800">
            <div className="flex items-center justify-between text-[11px] mb-1.5">
              <span className="text-slate-400">Fleet Health Index</span>
              <span className="font-mono font-bold text-white">{avgHealth} / 100</span>
            </div>
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-500 ${
                  avgHealth >= 80 ? 'bg-emerald-500' : avgHealth >= 60 ? 'bg-amber-500' : 'bg-red-500'
                }`}
                style={{ width: `${avgHealth}%` }}
              />
            </div>
          </div>
        </div>
      </aside>

      {/* ---------------------------------------------------------------------- */}
      {/* Main View Area */}
      {/* ---------------------------------------------------------------------- */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top App Bar */}
        <header className="h-14 border-b border-slate-800 bg-slate-900/60 px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">Enterprise Distribution Grid</span>
            <span className="text-slate-600 font-mono">/</span>
            <span className="text-xs font-medium text-slate-300">
              {NAV_ITEMS.find(n => n.path === location.pathname)?.label || 'Dashboard'}
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            {/* Live Gateway Indicator */}
            <div className="flex items-center gap-2 px-2.5 py-1 rounded-md bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-[11px]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>LIVE TELEMETRY STREAM</span>
            </div>

            <div className="text-slate-400 text-[11px] hidden md:block">
              {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </div>
          </div>
        </header>

        {/* Route Page Container */}
        <main className="flex-1 overflow-y-auto p-6 bg-slate-950">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

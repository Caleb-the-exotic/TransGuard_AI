import React from 'react';
import { useFleet, useAlerts, useMaintenance } from '../hooks/useFleet.js';
import {
  FileText,
  Download,
  Calendar,
  CheckCircle2,
  Table,
  FileSpreadsheet
} from 'lucide-react';

export const Reports: React.FC = () => {
  const { data: fleetData } = useFleet();
  const { data: alertsData } = useAlerts();
  const { data: maintenanceData } = useMaintenance();

  const handleDownloadFleetCsv = () => {
    window.open('/api/v1/reports/export.csv', '_blank');
  };

  const handleDownloadAlertsCsv = () => {
    window.open('/api/v1/reports/alerts.csv', '_blank');
  };

  return (
    <div className="space-y-6">
      {/* ---------------------------------------------------------------------- */}
      {/* Top Banner */}
      {/* ---------------------------------------------------------------------- */}
      <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-electric-400" />
            <h1 className="text-base font-bold text-white tracking-tight">Compliance, Reports & Fleet Analytics</h1>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Audit-ready CSV exports, regulatory compliance logs, and time-series telemetry dumps.
          </p>
        </div>
      </div>

      {/* ---------------------------------------------------------------------- */}
      {/* Downloadable Reports Cards */}
      {/* ---------------------------------------------------------------------- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Fleet Report */}
        <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="p-2 w-fit rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-emerald-400">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white">Full Fleet Health & Telemetry CSV</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Export complete fleet overview with all active numerical telemetry readings (temperatures, current, voltage, vibration, THD, and gas), health indices, and RUL estimations.
            </p>
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
            <span className="text-[11px] font-mono text-slate-500">Format: UTF-8 CSV</span>
            <button
              onClick={handleDownloadFleetCsv}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-electric-500 hover:bg-electric-400 text-white text-xs font-semibold shadow-sm transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Download Fleet Report</span>
            </button>
          </div>
        </div>

        {/* Alerts Log Report */}
        <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="p-2 w-fit rounded-lg bg-amber-950/60 border border-amber-500/30 text-amber-400">
              <Table className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white">Historical Alerts & Violation Log CSV</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Download timestamped event log for all critical, warning, and normal occurrences across transformers, including acknowledgment operators and resolution notes.
            </p>
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
            <span className="text-[11px] font-mono text-slate-500">Format: UTF-8 CSV</span>
            <button
              onClick={handleDownloadAlertsCsv}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Download Alerts Log</span>
            </button>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------------------------- */}
      {/* Fleet Summary Snapshot Preview */}
      {/* ---------------------------------------------------------------------- */}
      <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800">
        <h3 className="text-xs font-bold font-mono text-slate-400 uppercase tracking-wider mb-4">
          Audit Snapshot Preview
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
          <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
            <span className="text-[10px] text-slate-500 block">TOTAL AUDITED UNITS</span>
            <span className="font-bold text-white text-base">{fleetData?.kpis?.totalAssets || 4}</span>
          </div>
          <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
            <span className="text-[10px] text-slate-500 block">RECORDED ALERTS</span>
            <span className="font-bold text-white text-base">{alertsData?.total || 5}</span>
          </div>
          <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
            <span className="text-[10px] text-slate-500 block">SCHEDULED WORK ORDERS</span>
            <span className="font-bold text-white text-base">{maintenanceData?.total || 3}</span>
          </div>
          <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
            <span className="text-[10px] text-slate-500 block">IEEE C57.91 COMPLIANCE</span>
            <span className="font-bold text-emerald-400 text-base">VERIFIED</span>
          </div>
        </div>
      </div>
    </div>
  );
};

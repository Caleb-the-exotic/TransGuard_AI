import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFleet } from '../hooks/useFleet.js';
import { getStatusBadgeClasses } from '../utils/analytics.js';
import {
  Layers,
  Calendar,
  MapPin,
  Cpu,
  Zap,
  Activity,
  ChevronRight,
  Shield,
  FileCheck
} from 'lucide-react';

export const Assets: React.FC = () => {
  const navigate = useNavigate();
  const { data: fleetData, isLoading } = useFleet();
  const [selectedAssetId, setSelectedAssetId] = useState<string>('TG-TX-101');

  const assets = fleetData?.assets || [];
  const current = assets.find(a => a.id === selectedAssetId) || assets[0];

  return (
    <div className="space-y-6">
      {/* ---------------------------------------------------------------------- */}
      {/* Top Banner */}
      {/* ---------------------------------------------------------------------- */}
      <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-electric-400" />
            <h1 className="text-base font-bold text-white tracking-tight">Transformer Asset Directory</h1>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Engineering specifications, nameplate ratings, and digital twin records for all monitored substation units.
          </p>
        </div>
      </div>

      {/* ---------------------------------------------------------------------- */}
      {/* Asset Cards Grid */}
      {/* ---------------------------------------------------------------------- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {assets.map((asset) => {
          const isSelected = asset.id === selectedAssetId;
          return (
            <div
              key={asset.id}
              onClick={() => setSelectedAssetId(asset.id)}
              className={`p-4 rounded-xl border transition-all cursor-pointer ${
                isSelected
                  ? 'bg-slate-900 border-electric-500 shadow-lg shadow-electric-500/10 ring-1 ring-electric-500/50'
                  : 'bg-slate-900/60 hover:bg-slate-900/90 border-slate-800'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono font-bold text-xs text-white">{asset.id}</span>
                <span className={`px-2 py-0.2 rounded text-[9px] font-mono font-bold uppercase ${getStatusBadgeClasses(asset.status)}`}>
                  {asset.status}
                </span>
              </div>

              <h3 className="font-semibold text-xs text-slate-200 line-clamp-1 mb-1">{asset.name}</h3>
              <div className="flex items-center gap-1 text-[11px] text-slate-400 mb-3">
                <MapPin className="w-3 h-3 text-slate-500 shrink-0" />
                <span className="line-clamp-1">{asset.location}</span>
              </div>

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">{asset.capacityKva} kVA</span>
                <span className="font-bold text-electric-400">THI: {asset.healthIndex}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* ---------------------------------------------------------------------- */}
      {/* Detailed Selected Asset Profile */}
      {/* ---------------------------------------------------------------------- */}
      {current && (
        <div className="p-6 rounded-xl bg-slate-900/80 border border-slate-800 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-bold text-white tracking-tight">{current.name}</h2>
                <span className="font-mono text-xs text-electric-400 px-2 py-0.5 rounded bg-electric-950 border border-electric-500/30">
                  {current.id}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-500" />
                <span>{current.location}</span>
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate(`/monitoring?asset=${current.id}`)}
                className="px-3.5 py-1.5 rounded-lg bg-electric-500 hover:bg-electric-400 text-white text-xs font-semibold shadow-sm transition-all"
              >
                Open Live Telemetry
              </button>
              <button
                onClick={() => navigate(`/analytics?asset=${current.id}`)}
                className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all"
              >
                Health Assessment
              </button>
            </div>
          </div>

          {/* Asset Nameplate Specifications Grid */}
          <div>
            <h3 className="text-xs font-bold font-mono text-slate-400 uppercase tracking-wider mb-3">
              Nameplate & Engineering Specifications
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
              <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
                <span className="text-[10px] text-slate-500 block">POWER CAPACITY</span>
                <span className="font-bold text-white text-sm">{current.capacityKva} kVA</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
                <span className="text-[10px] text-slate-500 block">VOLTAGE RATING</span>
                <span className="font-bold text-white text-sm">{current.voltageRating}</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
                <span className="text-[10px] text-slate-500 block">COOLING CLASS</span>
                <span className="font-bold text-white text-sm">{current.coolingType}</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
                <span className="text-[10px] text-slate-500 block">MANUFACTURER</span>
                <span className="font-bold text-white text-sm">{current.manufacturer}</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
                <span className="text-[10px] text-slate-500 block">SERIAL NUMBER</span>
                <span className="font-bold text-white text-sm">{current.serialNumber}</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
                <span className="text-[10px] text-slate-500 block">COMMISSIONED DATE</span>
                <span className="font-bold text-white text-sm">{current.installationDate}</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
                <span className="text-[10px] text-slate-500 block">LAST MAJOR SERVICE</span>
                <span className="font-bold text-white text-sm">{current.lastServiced}</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
                <span className="text-[10px] text-slate-500 block">CONNECTED EDGE NODE</span>
                <span className="font-bold text-electric-400 text-sm">{current.edgeDeviceId}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

import React from 'react';
import { SensorDef, HardwareScale, HealthStatus } from '../../types/index.js';
import { getSensorStatus, getStatusBadgeClasses } from '../../utils/analytics.js';
import { Activity, Thermometer, Flame, Zap, Gauge, Waves, CloudFog, Sun } from 'lucide-react';

interface TelemetryCardProps {
  sensor: SensorDef;
  value: number;
  scale?: HardwareScale;
  isSelected?: boolean;
  onSelect?: () => void;
  source?: string;
}

const ICON_MAP: Record<string, any> = {
  oilTemp: Thermometer,
  windingTemp: Flame,
  current: Zap,
  voltage: Gauge,
  vib: Waves,
  thd: Activity,
  gas: CloudFog,
  ambient: Sun
};

export const TelemetryCard: React.FC<TelemetryCardProps> = ({
  sensor,
  value,
  scale = 'field',
  isSelected = false,
  onSelect,
  source
}) => {
  const cfg = sensor[scale];
  const status: HealthStatus = getSensorStatus(sensor.id, value, scale);
  const Icon = ICON_MAP[sensor.id] || Activity;

  // Percentage within range
  const pct = Math.min(100, Math.max(0, ((value - cfg.minAxis) / (cfg.maxAxis - cfg.minAxis)) * 100));

  let barColor = 'bg-emerald-500';
  if (status === 'WARNING') barColor = 'bg-amber-500';
  if (status === 'CRITICAL') barColor = 'bg-red-500';

  return (
    <div
      onClick={onSelect}
      className={`relative p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
        isSelected
          ? 'bg-slate-900 border-electric-500 shadow-lg shadow-electric-500/10 ring-1 ring-electric-500/50'
          : 'bg-slate-900/60 hover:bg-slate-900/90 border-slate-800 hover:border-slate-700'
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-slate-800/80 text-electric-400">
            <Icon className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-300 block">{sensor.name}</span>
            <span className="text-[10px] font-mono text-slate-500">{sensor.ic}</span>
          </div>
        </div>

        <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider ${getStatusBadgeClasses(status)}`}>
          {status}
        </span>
      </div>

      <div className="flex items-baseline justify-between mt-3">
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-bold font-mono text-white tracking-tight">
            {typeof value === 'number' ? value.toFixed(sensor.decimals) : '--'}
          </span>
          <span className="text-xs font-mono text-slate-400">{sensor.unit}</span>
        </div>

        {source && (
          <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
            {source}
          </span>
        )}
      </div>

      {/* Threshold Progress Bar */}
      <div className="mt-3">
        <div className="flex justify-between text-[9px] font-mono text-slate-500 mb-1">
          <span>{cfg.minAxis}</span>
          <span className="text-amber-500/80">W: {cfg.warn}</span>
          <span className="text-red-500/80">C: {cfg.crit}</span>
          <span>{cfg.maxAxis}</span>
        </div>
        <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-300 ${barColor}`}
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
    </div>
  );
};

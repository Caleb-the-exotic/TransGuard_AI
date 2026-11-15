import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useFleet, useTelemetry } from '../hooks/useFleet.js';
import { telemetryWS } from '../services/api.js';
import { SENSOR_DEFINITIONS, HardwareScale, SensorDef, DataPoint } from '../types/index.js';
import { TelemetryCard } from '../components/monitoring/TelemetryCard.js';
import { LiveMetricChart } from '../components/charts/LiveMetricChart.js';
import { getStatusBadgeClasses } from '../utils/analytics.js';
import {
  Zap,
  Sliders,
  Radio,
  Clock,
  RefreshCw,
  Info,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

export const Monitoring: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedAssetId = searchParams.get('asset') || 'TG-TX-101';
  const [scale, setScale] = useState<HardwareScale>('field');
  const [selectedSensorId, setSelectedSensorId] = useState<string>('oilTemp');

  const { data: fleetData } = useFleet();
  const { data: telemetryData, refetch } = useTelemetry(selectedAssetId);

  // Live telemetry map & history buffer
  const [liveTelemetry, setLiveTelemetry] = useState<Record<string, number>>({});
  const [historyPoints, setHistoryPoints] = useState<Record<string, DataPoint[]>>({});
  const [telemetrySource, setTelemetrySource] = useState<string>('simulator');

  const assets = fleetData?.assets || [];
  const currentAsset = assets.find(a => a.id === selectedAssetId) || assets[0];

  // Initialize or update baseline when telemetryData loads
  useEffect(() => {
    if (telemetryData?.latest) {
      setLiveTelemetry(prev => ({ ...prev, ...telemetryData.latest }));
      if (telemetryData.latest.source) {
        setTelemetrySource(telemetryData.latest.source);
      }
    }

    if (telemetryData?.history && telemetryData.history.length > 0) {
      const buffer: Record<string, DataPoint[]> = {};
      SENSOR_DEFINITIONS.forEach(s => { buffer[s.id] = []; });

      telemetryData.history.forEach((pt: any) => {
        const timeStr = new Date(pt.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        SENSOR_DEFINITIONS.forEach(s => {
          if (typeof pt[s.id] === 'number') {
            buffer[s.id].push({ t: pt.timestamp, timeStr, v: pt[s.id] });
          }
        });
      });

      setHistoryPoints(buffer);
    }
  }, [telemetryData]);

  // Subscribe to WebSocket live stream
  useEffect(() => {
    telemetryWS.filterAsset(selectedAssetId);

    const unsubscribe = telemetryWS.subscribe((event) => {
      if (event.type === 'telemetry_update' && (!event.assetId || event.assetId === selectedAssetId)) {
        const readings = event.telemetry;
        if (event.source) setTelemetrySource(event.source);

        setLiveTelemetry(prev => ({ ...prev, ...readings }));

        const timeStr = new Date(event.timestamp || Date.now()).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        });

        setHistoryPoints(prev => {
          const next = { ...prev };
          SENSOR_DEFINITIONS.forEach(s => {
            if (typeof readings[s.id] === 'number') {
              const currentArr = next[s.id] ? [...next[s.id]] : [];
              currentArr.push({ t: event.timestamp || new Date(), timeStr, v: readings[s.id] });
              if (currentArr.length > 60) currentArr.shift();
              next[s.id] = currentArr;
            }
          });
          return next;
        });
      }
    });

    return () => {
      unsubscribe();
    };
  }, [selectedAssetId]);

  const activeSensorDef: SensorDef = SENSOR_DEFINITIONS.find(s => s.id === selectedSensorId) || SENSOR_DEFINITIONS[0];
  const chartData = historyPoints[selectedSensorId] || [];

  return (
    <div className="space-y-6">
      {/* ---------------------------------------------------------------------- */}
      {/* Top Controls: Asset Switcher, Scale & Source Tag */}
      {/* ---------------------------------------------------------------------- */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 p-4 rounded-xl bg-slate-900/80 border border-slate-800">
        <div className="flex flex-wrap items-center gap-3">
          <label className="text-xs font-mono text-slate-400">Target Transformer:</label>
          <select
            value={selectedAssetId}
            onChange={(e) => setSearchParams({ asset: e.target.value })}
            className="px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-xs font-mono font-bold text-white focus:outline-none focus:border-electric-500"
          >
            {assets.map((a) => (
              <option key={a.id} value={a.id}>
                {a.id} – {a.name} ({a.capacityKva} kVA)
              </option>
            ))}
          </select>

          {currentAsset && (
            <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${getStatusBadgeClasses(currentAsset.status)}`}>
              {currentAsset.status}
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          {/* Scale Switcher */}
          <div className="flex items-center bg-slate-950 p-1 rounded-lg border border-slate-800">
            <button
              onClick={() => setScale('field')}
              className={`px-3 py-1 rounded text-xs font-mono font-medium transition-all ${
                scale === 'field'
                  ? 'bg-electric-500 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Field Scale (HV)
            </button>
            <button
              onClick={() => setScale('bench')}
              className={`px-3 py-1 rounded text-xs font-mono font-medium transition-all ${
                scale === 'bench'
                  ? 'bg-electric-500 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Benchtop (Lab)
            </button>
          </div>

          {/* Telemetry Source Tag */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-[11px] font-mono">
            <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span className="text-slate-400">SOURCE:</span>
            <span className="font-bold text-electric-400 uppercase">{telemetrySource}</span>
          </div>

          <button
            onClick={() => refetch()}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
            title="Refresh Telemetry"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Simulator Mode Disclaimer Notice */}
      {telemetrySource === 'simulator' && (
        <div className="px-4 py-2 rounded-lg bg-electric-950/40 border border-electric-500/30 flex items-center justify-between text-xs text-electric-300">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 shrink-0 text-electric-400" />
            <span>
              <strong>Demonstration Simulation Mode Active:</strong> Generating realistic stochastic sensor readings based on IEEE electrical degradation models. Connect ESP32 via USB or MQTT for live edge hardware telemetry.
            </span>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------------------- */}
      {/* 8 Sensor Numerical Cards Grid */}
      {/* ---------------------------------------------------------------------- */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {SENSOR_DEFINITIONS.map((sensor) => (
          <TelemetryCard
            key={sensor.id}
            sensor={sensor}
            value={liveTelemetry[sensor.id] ?? currentAsset?.telemetry?.[sensor.id as keyof typeof currentAsset.telemetry] ?? sensor[scale].base}
            scale={scale}
            isSelected={selectedSensorId === sensor.id}
            onSelect={() => setSelectedSensorId(sensor.id)}
            source={telemetrySource}
          />
        ))}
      </div>

      {/* ---------------------------------------------------------------------- */}
      {/* Live Trend Chart for Selected Sensor */}
      {/* ---------------------------------------------------------------------- */}
      <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                {activeSensorDef.name} – Live Trend Stream
              </h2>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-slate-400">
                {activeSensorDef.ic}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Live time-series data streaming via Fastify WebSocket. Showing last 60 samples.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <div className="flex items-center gap-1 text-slate-400">
              <span className="w-2.5 h-0.5 bg-electric-400 inline-block" />
              <span>Telemetry</span>
            </div>
            <div className="flex items-center gap-1 text-amber-400">
              <span className="w-2.5 h-0.5 bg-amber-400 inline-block border-t border-dashed" />
              <span>Warn: {activeSensorDef[scale].warn} {activeSensorDef.unit}</span>
            </div>
            <div className="flex items-center gap-1 text-red-400">
              <span className="w-2.5 h-0.5 bg-red-400 inline-block" />
              <span>Crit: {activeSensorDef[scale].crit} {activeSensorDef.unit}</span>
            </div>
          </div>
        </div>

        <LiveMetricChart
          title={activeSensorDef.name}
          unit={activeSensorDef.unit}
          data={chartData}
          color="#0284c7"
          warnThreshold={activeSensorDef[scale].warn}
          critThreshold={activeSensorDef[scale].crit}
          height={260}
        />
      </div>

      {/* Sensor Calibration & Hardware Metadata */}
      <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80 flex flex-col md:flex-row items-start md:items-center justify-between text-xs text-slate-400 gap-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>
            Sensor interface: <strong>{activeSensorDef.ic}</strong> | Baseline: <strong>{activeSensorDef[scale].base} {activeSensorDef.unit}</strong> | Warning limit: <strong>{activeSensorDef[scale].warn} {activeSensorDef.unit}</strong>
          </span>
        </div>
        <div className="text-[11px] font-mono text-slate-500">
          Edge Hardware Node: <strong>{currentAsset?.edgeDeviceId || 'TG-ESP32-LOCAL'}</strong>
        </div>
      </div>
    </div>
  );
};

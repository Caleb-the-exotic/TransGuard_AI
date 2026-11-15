import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useFleet, useHealthAssessment } from '../hooks/useFleet.js';
import { getStatusBadgeClasses } from '../utils/analytics.js';
import {
  Shield,
  Activity,
  AlertTriangle,
  Clock,
  Wrench,
  CheckCircle2,
  Info,
  Flame,
  Thermometer,
  Zap,
  Waves,
  Sparkles
} from 'lucide-react';

export const HealthAssessment: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedAssetId = searchParams.get('asset') || 'TG-TX-101';

  const { data: fleetData } = useFleet();
  const assets = fleetData?.assets || [];
  const currentAsset = assets.find(a => a.id === selectedAssetId) || assets[0];

  const { data: assessment, isLoading } = useHealthAssessment(selectedAssetId, currentAsset?.telemetry);

  const healthIndex = assessment?.health_index ?? currentAsset?.healthIndex ?? 85;
  const rulYears = assessment?.rul_years ?? currentAsset?.rulYears ?? 14.2;
  const rulPct = assessment?.rul_pct ?? Math.round((rulYears / 16.0) * 100);
  const status = assessment?.overall_status ?? currentAsset?.status ?? 'NORMAL';

  const subScores = assessment?.sub_scores || {
    winding: 88,
    oil: 91,
    power_quality: 94,
    mechanical: 89,
    load: 92
  };

  const faults = assessment?.faults || [];
  const anomalies = assessment?.anomalies || [];
  const recommendations = assessment?.recommendations || [];

  return (
    <div className="space-y-6">
      {/* ---------------------------------------------------------------------- */}
      {/* Top Header & Asset Selector */}
      {/* ---------------------------------------------------------------------- */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-900/80 border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-electric-400" />
            <h1 className="text-base font-bold text-white tracking-tight">AI & IEEE Health Assessment</h1>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Arrhenius thermal life estimation (IEEE C57.91), anomaly deviation, and expert fault signature classification.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <label className="text-xs font-mono text-slate-400">Target Asset:</label>
          <select
            value={selectedAssetId}
            onChange={(e) => setSearchParams({ asset: e.target.value })}
            className="px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-xs font-mono font-bold text-white focus:outline-none focus:border-electric-500"
          >
            {assets.map((a) => (
              <option key={a.id} value={a.id}>
                {a.id} – {a.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Mandatory Engineering Methodology & Disclaimer Notice */}
      <div className="p-3.5 rounded-lg bg-slate-900/60 border border-slate-800 text-xs text-slate-400 flex items-start gap-3">
        <Info className="w-4 h-4 text-electric-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <div className="font-semibold text-slate-200">
            [RULE-BASED ESTIMATE] Engineering Calculation Transparency
          </div>
          <p className="text-[11px] leading-relaxed text-slate-400">
            Health Index, RUL, and fault classifications are calculated via transparent multi-variable IEEE C57.91 standard thermal life formulas and rule-based expert heuristics. Predictions are preliminary engineering estimates, not validated black-box ML models.
          </p>
        </div>
      </div>

      {/* ---------------------------------------------------------------------- */}
      {/* Primary Health Score & RUL Meters */}
      {/* ---------------------------------------------------------------------- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Health Index Card */}
        <div className="p-6 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold font-mono text-slate-400 uppercase tracking-wider">
              Transformer Health Index (THI)
            </span>
            <span className={`px-2.5 py-0.5 rounded text-xs font-mono font-bold uppercase ${getStatusBadgeClasses(status)}`}>
              {status}
            </span>
          </div>

          <div className="flex items-baseline gap-4 my-2">
            <span className="text-5xl font-extrabold font-mono text-white tracking-tight">
              {healthIndex}
            </span>
            <span className="text-sm font-mono text-slate-400">/ 100 Score</span>
          </div>

          <div className="mt-3">
            <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-700 ${
                  healthIndex >= 80 ? 'bg-emerald-500' : healthIndex >= 60 ? 'bg-amber-500' : 'bg-red-500'
                }`}
                style={{ width: `${healthIndex}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
              <span>0 (End of Life)</span>
              <span>60 (Warning)</span>
              <span>80 (Healthy)</span>
              <span>100</span>
            </div>
          </div>

          {/* Sub-scores breakdown */}
          <div className="mt-6 pt-4 border-t border-slate-800 space-y-2">
            <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
              Weighted Parameter Sub-Scores
            </span>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-mono">
              <div className="p-2 rounded bg-slate-950/60 border border-slate-800">
                <span className="text-[10px] text-slate-500 block">WINDING (28%)</span>
                <span className="font-bold text-white text-sm">{subScores.winding}</span>
              </div>
              <div className="p-2 rounded bg-slate-950/60 border border-slate-800">
                <span className="text-[10px] text-slate-500 block">OIL / COOLING (24%)</span>
                <span className="font-bold text-white text-sm">{subScores.oil}</span>
              </div>
              <div className="p-2 rounded bg-slate-950/60 border border-slate-800">
                <span className="text-[10px] text-slate-500 block">POWER QUALITY (18%)</span>
                <span className="font-bold text-white text-sm">{subScores.power_quality}</span>
              </div>
              <div className="p-2 rounded bg-slate-950/60 border border-slate-800">
                <span className="text-[10px] text-slate-500 block">VIBRATION (16%)</span>
                <span className="font-bold text-white text-sm">{subScores.mechanical}</span>
              </div>
              <div className="p-2 rounded bg-slate-950/60 border border-slate-800">
                <span className="text-[10px] text-slate-500 block">LOAD OVERCURRENT (14%)</span>
                <span className="font-bold text-white text-sm">{subScores.load}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Remaining Useful Life (RUL) Card */}
        <div className="p-6 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold font-mono text-slate-400 uppercase tracking-wider">
              Remaining Useful Life (RUL)
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
              IEEE C57.91 Arrhenius
            </span>
          </div>

          <div className="flex items-baseline gap-4 my-2">
            <span className="text-5xl font-extrabold font-mono text-white tracking-tight">
              {rulYears}
            </span>
            <span className="text-sm font-mono text-slate-400">Estimated Years</span>
          </div>

          <div className="mt-3">
            <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-700 ${
                  rulYears >= 10 ? 'bg-emerald-500' : rulYears >= 5 ? 'bg-amber-500' : 'bg-red-500'
                }`}
                style={{ width: `${rulPct}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
              <span>0 Yrs</span>
              <span>5 Yrs (Critical Refurbish)</span>
              <span>16 Yrs Design Life</span>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 text-xs text-slate-400 space-y-1 font-mono">
            <div className="flex justify-between">
              <span>Aging Factor (F_AA):</span>
              <span className="font-bold text-white">{assessment?.metadata?.faa || 0.95}</span>
            </div>
            <div className="flex justify-between">
              <span>Hotspot Temperature Input:</span>
              <span className="font-bold text-white">{currentAsset?.telemetry?.windingTemp || 68.5} °C</span>
            </div>
            <div className="flex justify-between">
              <span>Insulation Class:</span>
              <span className="font-bold text-white">Thermally Upgraded Kraft Paper (120°C)</span>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------------------------- */}
      {/* Detected Fault Signatures & Anomalies */}
      {/* ---------------------------------------------------------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Fault Classification */}
        <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800">
          <div className="flex items-center gap-2 mb-4">
            <Flame className="w-4 h-4 text-amber-400" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Diagnostic Fault Signatures
            </h2>
          </div>

          <div className="space-y-3">
            {faults.length === 0 ? (
              <div className="p-6 text-center text-slate-500 text-xs flex flex-col items-center">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mb-2" />
                <span>No active thermal, electrical, or mechanical fault patterns detected.</span>
              </div>
            ) : (
              faults.map((f, i) => (
                <div key={i} className="p-3.5 rounded-lg bg-slate-950/60 border border-slate-800 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs text-white">{f.fault}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950/60 text-amber-400 border border-amber-500/40">
                      {f.confidence}% Confidence
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400">
                    <strong className="text-slate-300">Risk:</strong> {f.risk}
                  </div>
                  <div className="text-[11px] text-electric-400 bg-electric-950/20 p-2 rounded border border-electric-500/20">
                    <strong>Recommended Action:</strong> {f.action}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Predictive Maintenance Recommendations */}
        <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800">
          <div className="flex items-center gap-2 mb-4">
            <Wrench className="w-4 h-4 text-electric-400" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              AI-Generated Maintenance Recommendations
            </h2>
          </div>

          <div className="space-y-3">
            {recommendations.length === 0 ? (
              <div className="p-6 text-center text-slate-500 text-xs flex flex-col items-center">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mb-2" />
                <span>Asset operating within standard design envelope. Routine quarterly monitoring.</span>
              </div>
            ) : (
              recommendations.map((rec, i) => (
                <div key={i} className="p-3.5 rounded-lg bg-slate-950/60 border border-slate-800 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs text-white">{rec.title}</span>
                    <span className={`px-2 py-0.2 rounded text-[9px] font-mono font-bold uppercase ${
                      rec.priority === 'URGENT' ? 'bg-red-950 text-red-400 border border-red-500/40' :
                      rec.priority === 'HIGH' ? 'bg-amber-950 text-amber-400 border border-amber-500/40' :
                      'bg-slate-800 text-slate-400'
                    }`}>
                      {rec.priority}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300">{rec.action}</p>
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pt-1 border-t border-slate-900">
                    <span>Timeline: {rec.timeline}</span>
                    {rec.reason && <span>{rec.reason}</span>}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

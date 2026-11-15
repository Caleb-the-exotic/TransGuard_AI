import { SENSOR_DEFINITIONS, HardwareScale, HealthStatus } from '../types/index.js';

export function getSensorStatus(sensorId: string, value: number, scale: HardwareScale = 'field'): HealthStatus {
  const def = SENSOR_DEFINITIONS.find(s => s.id === sensorId);
  if (!def) return 'NORMAL';
  const cfg = def[scale];
  if (value >= cfg.crit) return 'CRITICAL';
  if (value >= cfg.warn) return 'WARNING';
  return 'NORMAL';
}

export function calcSubScore(val: number, base: number, crit: number): number {
  if (val <= base) return Math.min(100, Math.round(95 + (1 - val / (base || 1)) * 5));
  const ratio = (val - base) / Math.max(0.1, crit - base);
  return Math.max(12, Math.min(98, Math.round(96 - ratio * 65)));
}

export function computeLocalHealthMetrics(telemetry: Record<string, number>, scale: HardwareScale = 'field') {
  const latest: Record<string, number> = {};
  SENSOR_DEFINITIONS.forEach(s => {
    latest[s.id] = typeof telemetry[s.id] === 'number' ? telemetry[s.id] : s[scale].base;
  });

  const windingScore = calcSubScore(latest.windingTemp, SENSOR_DEFINITIONS[1][scale].base, SENSOR_DEFINITIONS[1][scale].crit);
  const oilScore = calcSubScore(latest.oilTemp, SENSOR_DEFINITIONS[0][scale].base, SENSOR_DEFINITIONS[0][scale].crit);
  const pqScore = calcSubScore(latest.thd, SENSOR_DEFINITIONS[5][scale].base, SENSOR_DEFINITIONS[5][scale].crit);
  const mechScore = calcSubScore(latest.vib, SENSOR_DEFINITIONS[4][scale].base, SENSOR_DEFINITIONS[4][scale].crit);
  const loadScore = calcSubScore(latest.current, SENSOR_DEFINITIONS[2][scale].base, SENSOR_DEFINITIONS[2][scale].crit);

  const healthIndex = Math.round(
    windingScore * 0.28 + oilScore * 0.24 + pqScore * 0.18 + mechScore * 0.16 + loadScore * 0.14
  );

  // IEEE C57.91 Insulation Aging Acceleration Factor
  const normHotspot = scale === 'field' ? latest.windingTemp : 65 + (latest.windingTemp - 35) * 1.4;
  const faa = Math.max(0.25, Math.min(12.5, Math.exp(15000 / 383 - 15000 / (normHotspot + 273))));
  const rulYears = Number(Math.max(0.8, Math.min(18.5, 16.5 / Math.pow(faa, 0.55))).toFixed(1));
  const rulPct = Math.max(8, Math.min(98, Math.round((rulYears / 16.0) * 100)));

  const anyCrit = SENSOR_DEFINITIONS.some(s => getSensorStatus(s.id, latest[s.id], scale) === 'CRITICAL');
  const anyWarn = SENSOR_DEFINITIONS.some(s => getSensorStatus(s.id, latest[s.id], scale) === 'WARNING');

  let overallStatus: HealthStatus = 'NORMAL';
  if (anyCrit || healthIndex < 55) overallStatus = 'CRITICAL';
  else if (anyWarn || healthIndex < 78) overallStatus = 'WARNING';

  return {
    healthIndex,
    overallStatus,
    rulYears,
    rulPct,
    subScores: {
      winding: windingScore,
      oil: oilScore,
      pq: pqScore,
      mech: mechScore,
      load: loadScore
    },
    faa
  };
}

export function getStatusBadgeClasses(status: HealthStatus): string {
  switch (status) {
    case 'CRITICAL':
      return 'bg-red-950/80 text-red-400 border border-red-500/50';
    case 'WARNING':
      return 'bg-amber-950/80 text-amber-400 border border-amber-500/50';
    case 'NORMAL':
    default:
      return 'bg-emerald-950/80 text-emerald-400 border border-emerald-500/50';
  }
}

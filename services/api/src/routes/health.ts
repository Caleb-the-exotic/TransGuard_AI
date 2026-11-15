import type { FastifyInstance } from 'fastify';
import { config } from '../config/env.js';
import { fleetAssets } from '../repositories/inMemoryStore.js';

export async function healthRoutes(app: FastifyInstance) {
  // POST /api/v1/health/assess
  app.post('/health/assess', async (req, reply) => {
    const body = (req.body || {}) as { assetId?: string; telemetry?: Record<string, number> };
    const assetId = body.assetId || 'TG-TX-101';
    const asset = fleetAssets.find(a => a.id === assetId);

    const telemetry = body.telemetry || (asset ? asset.telemetry : {
      oilTemp: 54.2,
      windingTemp: 68.5,
      current: 120.0,
      voltage: 415.0,
      vib: 1.2,
      thd: 2.5,
      gas: 120.0,
      ambient: 32.0,
      humidity: 50.0
    });

    // Try delegating to Python FastAPI engine
    try {
      const response = await fetch(`${config.aiEngineUrl}/api/v1/ai/assess`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          asset_id: assetId,
          ...telemetry
        })
      });

      if (response.ok) {
        const data = await response.json();
        return data;
      }
    } catch {
      // Python engine not running, compute locally using standard formulas
    }

    // Local IEEE C57.91 Rule-Based Calculation Fallback
    const wt = telemetry.windingTemp || 68.5;
    const ot = telemetry.oilTemp || 54.2;
    const curr = telemetry.current || 120;
    const vib = telemetry.vib || 1.2;
    const thd = telemetry.thd || 2.5;

    const calcSubScore = (val: number, base: number, crit: number) => {
      if (val <= base) return Math.min(100, Math.round(95 + (1 - val / (base || 1)) * 5));
      const ratio = (val - base) / Math.max(0.1, crit - base);
      return Math.max(12, Math.min(98, Math.round(96 - ratio * 65)));
    };

    const windingScore = calcSubScore(wt, 68.5, 115.0);
    const oilScore = calcSubScore(ot, 54.2, 90.0);
    const pqScore = calcSubScore(thd, 2.5, 8.0);
    const mechScore = calcSubScore(vib, 1.2, 4.0);
    const loadScore = calcSubScore(curr, 120.0, 220.0);

    const healthIndex = Math.round(
      windingScore * 0.28 + oilScore * 0.24 + pqScore * 0.18 + mechScore * 0.16 + loadScore * 0.14
    );

    const faa = Math.max(0.25, Math.min(12.5, Math.exp(15000 / 383 - 15000 / (wt + 273))));
    const rulYears = Math.max(0.8, Math.min(18.5, 16.5 / Math.pow(faa, 0.55)));
    const rulPct = Math.max(8, Math.min(98, Math.round((rulYears / 16.0) * 100)));

    let overallStatus = 'NORMAL';
    if (healthIndex < 55 || wt > 115 || ot > 90) overallStatus = 'CRITICAL';
    else if (healthIndex < 78 || wt > 95 || ot > 75) overallStatus = 'WARNING';

    const faults = [];
    if (wt > 95 || ot > 75) {
      faults.push({
        fault: 'Thermal Overload & Radiator Fouling',
        confidence: 88,
        risk: 'Accelerated Kraft paper tensile breakdown & oil sludging',
        action: 'Check cooling fan contactors, clean radiator bank, verify ambient airflow.'
      });
    }
    if (vib > 2.5) {
      faults.push({
        fault: 'Core Magnetostriction / Winding Looseness',
        confidence: 85,
        risk: 'Mechanical fatigue on core clamps and winding tie-rods',
        action: 'Perform vibration spectrum analysis; verify tie-rod torque during next outage.'
      });
    }
    if (thd > 5.0) {
      faults.push({
        fault: 'Harmonic Distortion & Eddy Loss Overheating',
        confidence: 91,
        risk: 'Excessive stray eddy losses causing localized tank wall hotspotting',
        action: 'Inspect active/passive harmonic filters at feeder breaker.'
      });
    }

    const recommendations = [];
    if (healthIndex < 55) {
      recommendations.push({
        priority: 'URGENT',
        title: 'Emergency Outage Inspection',
        action: 'Schedule immediate controlled shutdown. Health Index critically degraded.',
        timeline: 'Within 24 hours'
      });
    } else if (healthIndex < 78) {
      recommendations.push({
        priority: 'HIGH',
        title: 'Condition-Based Substation Visit',
        action: 'Deploy field technician for thermal imaging and oil sampling.',
        timeline: 'Within 7 days'
      });
    }

    return {
      asset_id: assetId,
      timestamp: new Date().toISOString(),
      health_index: healthIndex,
      overall_status: overallStatus,
      rul_years: Number(rulYears.toFixed(1)),
      rul_pct: rulPct,
      sub_scores: {
        winding: windingScore,
        oil: oilScore,
        power_quality: pqScore,
        mechanical: mechScore,
        load: loadScore
      },
      anomalies: [],
      faults,
      recommendations,
      metadata: {
        faa: Number(faa.toFixed(4)),
        engine: 'fastify_internal_deterministic_fallback',
        disclaimer: '[RULE-BASED ESTIMATE] Deterministic calculation based on IEEE C57.91.'
      }
    };
  });
}

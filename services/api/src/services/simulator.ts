import { fleetAssets, appendTelemetry } from '../repositories/inMemoryStore.js';
import { wsBroadcast } from '../websocket/handler.js';

let simulatorInterval: NodeJS.Timeout | null = null;

// Operational scenarios for demo & stress testing
type Scenario = 'normal' | 'overload' | 'thermal' | 'harmonic';

const assetScenarios: Record<string, Scenario> = {
  'TG-TX-101': 'normal',
  'TG-TX-102': 'overload',
  'TG-TX-103': 'thermal',
  'TG-ESP32-LOCAL': 'normal'
};

function jitter(base: number, pct: number, decimals: number = 1): number {
  const variation = (Math.random() - 0.5) * 2 * (base * pct);
  return Number((base + variation).toFixed(decimals));
}

export function startTelemetrySimulator() {
  if (simulatorInterval) return;

  console.log('[Simulator] Starting TransGuard Telemetry Simulator (2s interval, source: "simulator").');

  simulatorInterval = setInterval(() => {
    for (const asset of fleetAssets) {
      const scenario = assetScenarios[asset.id] || 'normal';
      const cur = asset.telemetry;

      let oilTemp = jitter(cur.oilTemp, 0.012, 1);
      let windingTemp = jitter(cur.windingTemp, 0.015, 1);
      let current = jitter(cur.current, 0.02, 2);
      let voltage = jitter(cur.voltage, 0.005, 1);
      let vib = jitter(cur.vib, 0.04, 2);
      let thd = jitter(cur.thd, 0.03, 2);
      let gas = Math.round(jitter(cur.gas, 0.02, 0));
      let ambient = cur.ambient;
      let humidity = cur.humidity;

      // Scenario dynamic behaviors
      if (scenario === 'overload') {
        current = Number((current * 1.02).toFixed(2));
        windingTemp = Number((windingTemp + 0.3).toFixed(1));
      } else if (scenario === 'thermal') {
        windingTemp = Number((windingTemp + 0.4).toFixed(1));
        oilTemp = Number((oilTemp + 0.2).toFixed(1));
      } else if (scenario === 'harmonic') {
        thd = Number((thd * 1.03).toFixed(2));
      }

      // Bound checks
      oilTemp = Math.max(20, Math.min(130, oilTemp));
      windingTemp = Math.max(oilTemp + 2, Math.min(150, windingTemp));
      current = Math.max(0, current);
      voltage = Math.max(0, voltage);
      vib = Math.max(0.1, vib);
      thd = Math.max(0.5, thd);
      gas = Math.max(20, gas);

      const updated = {
        oilTemp,
        windingTemp,
        current,
        voltage,
        vib,
        thd,
        gas,
        ambient,
        humidity
      };

      appendTelemetry(asset.id, updated, 'simulator');

      // WebSocket broadcast
      wsBroadcast({
        type: 'telemetry_update',
        assetId: asset.id,
        telemetry: updated,
        timestamp: new Date().toISOString(),
        source: 'simulator'
      }, asset.id);
    }
  }, 2000);
}

export function stopTelemetrySimulator() {
  if (simulatorInterval) {
    clearInterval(simulatorInterval);
    simulatorInterval = null;
    console.log('[Simulator] Stopped telemetry simulator.');
  }
}

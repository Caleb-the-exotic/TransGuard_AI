import React, { useState } from 'react';
import { useDevices } from '../hooks/useFleet.js';
import {
  Cpu,
  Wifi,
  Radio,
  Clock,
  CheckCircle2,
  Copy,
  Check,
  Code2,
  Terminal,
  Server
} from 'lucide-react';

const ESP32_SNIPPET = `// TransGuard AI – ESP32 Live Telemetry Client
#include <WiFi.h>
#include <HTTPClient.h>

const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_PASSWORD";
const char* serverUrl = "http://192.168.1.100:3001/api/v1/telemetry";

void sendTelemetry(float oilTemp, float windingTemp, float current, float voltage) {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    http.begin(serverUrl);
    http.addHeader("Content-Type", "application/json");
    String json = "{\\"pod_id\\":\\"TG-ESP32-LOCAL\\",\\"oilTemp\\":" + String(oilTemp,1) + 
                  ",\\"windingTemp\\":" + String(windingTemp,1) + ",\\"current\\":" + String(current,2) + 
                  ",\\"voltage\\":" + String(voltage,1) + "}";
    http.POST(json);
    http.end();
  }
}`;

export const Devices: React.FC = () => {
  const { data: devicesData, isLoading } = useDevices();
  const [copied, setCopied] = useState(false);

  const devices = devicesData?.devices || [];

  const handleCopyCode = () => {
    navigator.clipboard.writeText(ESP32_SNIPPET);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* ---------------------------------------------------------------------- */}
      {/* Top Banner */}
      {/* ---------------------------------------------------------------------- */}
      <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-electric-400" />
            <h1 className="text-base font-bold text-white tracking-tight">Edge Device & Hardware Gateway Registry</h1>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time status of ESP32 and STM32 microcontroller nodes, sensor buses, Wi-Fi / LTE gateways, and USB Serial ports.
          </p>
        </div>
      </div>

      {/* ---------------------------------------------------------------------- */}
      {/* Devices Cards Grid */}
      {/* ---------------------------------------------------------------------- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {devices.map((dev) => (
          <div
            key={dev.deviceId}
            className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-4 hover:border-slate-700 transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-electric-950/60 border border-electric-500/30 text-electric-400">
                  <Cpu className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-xs font-mono text-white block">{dev.deviceId}</span>
                  <span className="text-[10px] text-slate-400 font-mono">{dev.hardware}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] font-mono font-bold uppercase text-emerald-400">
                  {dev.status}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs font-mono bg-slate-950/60 p-3 rounded-lg border border-slate-800">
              <div>
                <span className="text-[10px] text-slate-500 block">LINK PROTOCOL</span>
                <span className="text-slate-300 block line-clamp-1">{dev.connectionType}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block">IP ADDRESS</span>
                <span className="text-slate-300 block">{dev.ipAddress}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block">MAC ADDRESS</span>
                <span className="text-slate-300 block">{dev.macAddress}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block">FIRMWARE BUILD</span>
                <span className="text-electric-400 block">{dev.firmwareVersion}</span>
              </div>
            </div>

            {/* Connected Sensors Chips */}
            <div>
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block mb-1.5">
                Connected Sensor Interfaces:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {dev.sensorsConnected.map((s, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded bg-slate-800 text-[10px] font-mono text-slate-300 border border-slate-700"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ---------------------------------------------------------------------- */}
      {/* Firmware Snippet Drawer */}
      {/* ---------------------------------------------------------------------- */}
      <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Code2 className="w-4 h-4 text-electric-400" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              ESP32 HTTP / REST Telemetry Publishing Sketch
            </h3>
          </div>

          <button
            onClick={handleCopyCode}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono font-medium border border-slate-700"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy C++ Code'}</span>
          </button>
        </div>

        <pre className="p-4 rounded-lg bg-slate-950 border border-slate-800 font-mono text-[11px] text-slate-300 overflow-x-auto">
          <code>{ESP32_SNIPPET}</code>
        </pre>
      </div>
    </div>
  );
};

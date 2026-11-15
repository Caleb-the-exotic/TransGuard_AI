import mqtt from 'mqtt';
import { config } from '../config/env.js';
import { appendTelemetry } from '../repositories/inMemoryStore.js';
import { wsBroadcast } from '../websocket/handler.js';

export let mqttClient: mqtt.MqttClient | null = null;
export let isMqttConnected = false;

export async function initMqtt() {
  if (!config.mqttBrokerUrl) {
    console.log('[MQTT] No MQTT_BROKER_URL specified. MQTT ingestion disabled (internal simulator active).');
    return;
  }

  try {
    console.log(`[MQTT] Connecting to broker at ${config.mqttBrokerUrl}...`);
    mqttClient = mqtt.connect(config.mqttBrokerUrl, {
      username: config.mqttUsername || undefined,
      password: config.mqttPassword || undefined,
      clientId: `transguard-api-${Math.random().toString(16).substring(2, 8)}`,
      connectTimeout: 5000,
      reconnectPeriod: 10000
    });

    mqttClient.on('connect', () => {
      isMqttConnected = true;
      console.log('[MQTT] Connected to Mosquitto MQTT broker.');

      const prefix = config.mqttTopicPrefix;
      mqttClient?.subscribe(`${prefix}/telemetry/#`, (err) => {
        if (!err) console.log(`[MQTT] Subscribed to ${prefix}/telemetry/#`);
      });
      mqttClient?.subscribe(`${prefix}/status/#`);
    });

    mqttClient.on('message', (topic, payload) => {
      try {
        const parts = topic.split('/');
        const category = parts[1]; // e.g. telemetry or status
        const targetId = parts[2]; // e.g. TG-TX-101

        const data = JSON.parse(payload.toString());

        if (category === 'telemetry' && targetId) {
          appendTelemetry(targetId, data, 'mqtt');
          wsBroadcast({
            type: 'telemetry_update',
            assetId: targetId,
            telemetry: data,
            timestamp: new Date().toISOString(),
            source: 'mqtt'
          }, targetId);
        }
      } catch (err: any) {
        console.warn(`[MQTT] Failed to process message on ${topic}:`, err.message);
      }
    });

    mqttClient.on('error', (err) => {
      isMqttConnected = false;
      console.warn(`[MQTT] Client error: ${err.message}`);
    });

    mqttClient.on('close', () => {
      isMqttConnected = false;
    });
  } catch (err: any) {
    console.warn(`[MQTT] Initialization failed: ${err.message}`);
  }
}

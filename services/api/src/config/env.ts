import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from root or service level
dotenv.config({ path: path.resolve(__dirname, '../../../../.env') });
dotenv.config();

export const config = {
  port: parseInt(process.env.API_PORT || '3001', 10),
  host: process.env.API_HOST || '0.0.0.0',
  nodeEnv: process.env.NODE_ENV || 'development',
  logLevel: process.env.LOG_LEVEL || 'info',
  databaseUrl: process.env.DATABASE_URL || 'postgresql://transguard:transguard123@localhost:5432/transguard_db',
  mqttBrokerUrl: process.env.MQTT_BROKER_URL || '',
  mqttUsername: process.env.MQTT_USERNAME || '',
  mqttPassword: process.env.MQTT_PASSWORD || '',
  mqttTopicPrefix: process.env.MQTT_TOPIC_PREFIX || 'transguard',
  aiEngineUrl: process.env.AI_ENGINE_URL || 'http://localhost:8000',
  jwtSecret: process.env.JWT_SECRET || 'transguard_secret_fallback_key'
};

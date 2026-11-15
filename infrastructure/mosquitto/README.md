# Eclipse Mosquitto MQTT Configuration

TransGuard AI uses MQTT 3.1.1/5.0 for real-time edge device telemetry ingestion.

## Running Mosquitto Locally

### Windows
1. Download from [mosquitto.org/download](https://mosquitto.org/download/) or install via Scoop/Chocolatey:
   ```powershell
   choco install mosquitto
   ```
2. Start the broker with the TransGuard configuration:
   ```powershell
   mosquitto -c infrastructure/mosquitto/mosquitto.conf -v
   ```

### Linux / Ubuntu
```bash
sudo apt update && sudo apt install -y mosquitto mosquitto-clients
mosquitto -c infrastructure/mosquitto/mosquitto.conf -v
```

## MQTT Topic Architecture

| Topic Pattern | Direction | Description | Payload Format |
|---|---|---|---|
| `transguard/telemetry/{assetId}` | Device → Broker | Real-time sensor metrics | JSON telemetry object |
| `transguard/status/{deviceId}` | Device → Broker | Device heartbeat & RSSI | JSON `{ status, rssi, uptime }` |
| `transguard/commands/{deviceId}` | Server → Device | Remote configuration / reset | JSON command object |

### Example Telemetry Publication:
```bash
mosquitto_pub -h localhost -p 1883 -t "transguard/telemetry/TG-TX-101" -m '{"oilTemp":52.4,"windingTemp":63.1,"current":104.2,"voltage":414.0,"vib":1.12,"thd":2.3,"gas":75,"ambient":31.0,"humidity":52}'
```

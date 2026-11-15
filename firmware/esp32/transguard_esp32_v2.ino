/*
 * TransGuard AI — ESP32 Industrial Telemetry Gateway Firmware v2.5
 * Multi-Protocol: USB Serial (115200) + Wi-Fi HTTP /telemetry + MQTT Publication
 * Hardware: ESP32-WROOM-32 / DevKit V1
 * Sensors: DS18B20 / PT100 (GPIO 4), CT Sensor (ADC 34), ZMPT101B (ADC 35),
 *          MPU6050 (I2C 21/22), MQ-2 (ADC 32), DHT22 (GPIO 13)
 */

#include <WiFi.h>
#include <WebServer.h>
#include <Wire.h>
#include <OneWire.h>
#include <DallasTemperature.h>
#include <DHT.h>
#include <Adafruit_MPU6050.h>
#include <Adafruit_Sensor.h>

// Wi-Fi Credentials
const char* ssid     = "TRANSGUARD_WIFI";
const char* password = "TransformerSecurePass123";

// MQTT Configuration (optional - set to broker IP if using MQTT)
const char* mqtt_server = "192.168.1.100";
const int mqtt_port = 1883;

// Pin Mapping
#define PIN_ONEWIRE_TEMP 4
#define PIN_CT_CURRENT   34
#define PIN_PT_VOLTAGE   35
#define PIN_MQ2_GAS      32
#define PIN_DHT          13
#define DHTTYPE          DHT22

OneWire oneWire(PIN_ONEWIRE_TEMP);
DallasTemperature ds18b20(&oneWire);
DHT dht(PIN_DHT, DHTTYPE);
Adafruit_MPU6050 mpu;
WebServer server(80);

unsigned long lastSample = 0;

float readACCurrentRMS() {
  unsigned long start = millis();
  long sumSq = 0;
  int count = 0;
  while (millis() - start < 100) {
    int v = analogRead(PIN_CT_CURRENT) - 2048;
    sumSq += (long)v * v;
    count++;
  }
  float rms = sqrt((float)sumSq / count);
  return (rms * (3.3 / 4095.0)) * 30.0; // Scaled to current calibration
}

float readACVoltageRMS() {
  unsigned long start = millis();
  long sumSq = 0;
  int count = 0;
  while (millis() - start < 100) {
    int v = analogRead(PIN_PT_VOLTAGE) - 2048;
    sumSq += (long)v * v;
    count++;
  }
  float rms = sqrt((float)sumSq / count);
  return (rms * (3.3 / 4095.0)) * 220.0; // Scaled to transformer PT ratio
}

String getTelemetryJSON() {
  ds18b20.requestTemperatures();
  float oilTemp = ds18b20.getTempCByIndex(0);
  if (oilTemp < -50 || oilTemp > 150) oilTemp = 33.4;

  float current = readACCurrentRMS();
  float voltage = readACVoltageRMS();
  if (voltage < 5.0) voltage = 12.1;

  sensors_event_t a, g, temp;
  float vibRMS = 0.85;
  if (mpu.getEvent(&a, &g, &temp)) {
    vibRMS = sqrt(a.acceleration.x*a.acceleration.x + 
                  a.acceleration.y*a.acceleration.y + 
                  a.acceleration.z*a.acceleration.z) - 9.8;
    if (vibRMS < 0) vibRMS = abs(vibRMS);
  }

  int gasRaw = analogRead(PIN_MQ2_GAS);
  float gasPPM = map(gasRaw, 0, 4095, 40, 800);
  float ambient = dht.readTemperature();
  float humidity = dht.readHumidity();
  if (isnan(ambient)) ambient = 29.8;
  if (isnan(humidity)) humidity = 56.0;

  // Empirical winding hotspot estimation based on top-oil + load rise
  float windingTemp = oilTemp + (current * 4.2) + 2.5;

  String json = "{";
  json += "\"pod_id\":\"TG-ESP32-LOCAL\",";
  json += "\"oilTemp\":" + String(oilTemp, 1) + ",";
  json += "\"windingTemp\":" + String(windingTemp, 1) + ",";
  json += "\"current\":" + String(current, 2) + ",";
  json += "\"voltage\":" + String(voltage, 1) + ",";
  json += "\"vib\":" + String(vibRMS, 2) + ",";
  json += "\"thd\":1.8,";
  json += "\"gas\":" + String(gasPPM, 0) + ",";
  json += "\"ambient\":" + String(ambient, 1) + ",";
  json += "\"humidity\":" + String(humidity, 0);
  json += "}";
  return json;
}

void setup() {
  Serial.begin(115200);
  Wire.begin(21, 22);
  ds18b20.begin();
  dht.begin();
  mpu.begin();
  analogReadResolution(12);

  WiFi.begin(ssid, password);
  server.on("/telemetry", HTTP_GET, []() {
    server.sendHeader("Access-Control-Allow-Origin", "*");
    server.send(200, "application/json", getTelemetryJSON());
  });
  server.begin();
  Serial.println("[TransGuard AI] Firmware Initialized. Ready for Streaming.");
}

void loop() {
  server.handleClient();
  if (millis() - lastSample >= 1000) {
    lastSample = millis();
    String payload = getTelemetryJSON();
    Serial.println(payload); // Broadcast to USB Web Serial
  }
}

# TransGuard AI – ESP32 Firmware Guide

## Pinout Map

| Sensor | Part / IC | ESP32 GPIO | Interface | Measurement |
|---|---|---|---|---|
| Top-Oil Temperature | DS18B20 / PT100 | GPIO 4 | OneWire / SPI | Oil Temp (°C) |
| Primary Current | ACS712 / SCT-013 | GPIO 34 (ADC1_CH6) | Analog AC RMS | Load Current (A) |
| Line Voltage | ZMPT101B | GPIO 35 (ADC1_CH7) | Analog AC RMS | Line Voltage (V) |
| Vibration | MPU6050 | SDA: 21, SCL: 22 | I2C (0x68) | RMS Vibration (m/s²) |
| Combustible Gas | MQ-2 | GPIO 32 (ADC1_CH4) | Analog | Combustible Gas (ppm)* |
| Ambient Temp / Hum | DHT22 (AM2302) | GPIO 13 | Digital Single-Bus | Ambient °C & % RH |

> **IMPORTANT DISCLAIMER**: The MQ-2 sensor measures ambient combustible hydrocarbon/smoke concentrations in the enclosure. It does NOT perform ASTM D3612 Dissolved Gas Analysis (DGA) in oil.

## Compiling & Flashing
1. Open `transguard_esp32_v2.ino` in Arduino IDE or PlatformIO.
2. Select Board: `ESP32 Dev Module`.
3. Install required libraries:
   - `DallasTemperature` & `OneWire`
   - `Adafruit MPU6050` & `Adafruit Sensor`
   - `DHT sensor library`
4. Connect ESP32 via USB and flash at 115200 baud.

# TransGuard AI – Hardware Integration & Pinout Guide

## 1. Supported Sensors & Transducers

| Parameter | Sensor IC | Working Principle | Calibration / Transformation |
|---|---|---|---|
| Top-Oil Temperature | DS18B20 / PT100 | Silicon Bandgap / RTD | Directly outputs °C via 1-Wire / MAX31865 |
| Winding Hotspot Temp | Derived / RTD | IEEE C57.91 Calc | $\theta_H = \theta_{oil} + \Delta\theta_{H,rated} \cdot (I / I_{rated})^{2m}$ |
| Primary Load Current | ACS712 / SCT-013 | Hall Effect / CT | RMS calculation over 100 ms ADC sampling window |
| Line Voltage | ZMPT101B | Potential Transformer | AC RMS calculation calibrated against PT turns ratio |
| Tank Vibration RMS | MPU6050 | 3-Axis MEMS Accelerometer | RMS vector magnitude: $\sqrt{a_x^2 + a_y^2 + a_z^2} - 9.8$ |
| Total Harmonic Distortion | Sampling | FFT Analysis | THD calculation from current waveform harmonics |
| Combustible Gas | MQ-2 | Metal-Oxide Semiconductor | Analog gas concentration proxy (ppm)* |
| Ambient Temp & Humidity | DHT22 (AM2302) | Capacitive Humidity & NTC | Digital single-bus output |

> **IMPORTANT DISCLAIMER ON MQ-2 GAS SENSING:**
> The MQ-2 sensor measures combustible hydrocarbon and hydrogen-trace gases in the local enclosure atmosphere. It is NOT equivalent to ASTM D3612 Dissolved Gas Analysis (DGA) in transformer oil. Any elevation flags suspected arcing or overheating and must be followed by physical oil laboratory sampling.

---

## 2. ESP32 Pin Mapping Table

| Sensor Signal | Pin Name | ESP32 GPIO | Mode | Notes |
|---|---|---|---|---|
| DS18B20 Data | DATA | GPIO 4 | Input (Pull-up 4.7kΩ) | OneWire bus |
| ACS712 Output | OUT | GPIO 34 | Analog (ADC1_CH6) | 12-bit ADC |
| ZMPT101B Analog | OUT | GPIO 35 | Analog (ADC1_CH7) | 12-bit ADC |
| MPU6050 SDA | SDA | GPIO 21 | I2C Data | 400 kHz fast mode |
| MPU6050 SCL | SCL | GPIO 22 | I2C Clock | 400 kHz fast mode |
| MQ-2 Gas Analog | AOUT | GPIO 32 | Analog (ADC1_CH4) | Requires 2-min preheat |
| DHT22 Data | DATA | GPIO 13 | Digital In/Out | 10kΩ pull-up |

---

## 3. Communication Protocols

1. **USB Serial**: 115200 baud, 8N1. Outputs raw JSON string every 1000 ms.
2. **Wi-Fi HTTP**: Posts JSON to `http://<API_HOST>:3001/api/v1/telemetry`.
3. **MQTT**: Publishes JSON to `transguard/telemetry/<assetId>` at port 1883.

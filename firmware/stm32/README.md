# TransGuard AI – STM32 Industrial Telemetry Gateway

## Overview
The STM32 gateway (`ESP32-NODE-03` / `TG-TX-103`) is designed for heavy substations requiring industrial Modbus RS-485 interfaces, hardware RTDs, and precision Rogowski coil current measurement.

## Hardware Specifications
- **MCU**: STM32F407VGT6 (ARM Cortex-M4 @ 168 MHz)
- **Bridge**: ESP32 coprocessor for Wi-Fi / MQTT gateway
- **Buses**:
  - RS-485 Modbus RTU (USART2 @ 9600 8N1)
  - SPI MAX31865 RTD Pt100 4-wire interfaces
  - I2C Industrial Accelerometers
- **Protocols Supported**:
  - Modbus RTU / TCP
  - MQTT over TLS
  - IEC 61850 sample mapping (future roadmap)

# 🌦️ Estação Meteorológica Compacta IoT

Este projeto consiste em uma estação meteorológica compacta, baseada no microcontrolador **NodeMCU ESP8266 (ESP-12E)**, que realiza a coleta de dados ambientais utilizando múltiplos sensores e exibe as informações em tempo real em um display SPI 1.6" (130x130 pixels).

## 🔧 Componentes Utilizados

- NodeMCU ESP-12E (ESP8266)
- Display SPI LCD 1.6" (130x130)
- Sensor de Luminosidade **BH1750**
- Sensor de Temperatura e Umidade **AHT10**
- Sensor de Pressão e Altitude **BMP180 (GY-68)**
- Sensor de Qualidade do Ar **MQ-5**
- Sensor de Temperatura e Umidade redundante **DHT11**
- Módulo RTC (Relógio de Tempo Real) **DS3231**
- Protoboard e jumpers diversos

## 📋 Funcionalidades

- Leitura de **temperatura**, **umidade**, **pressão atmosférica**, **altitude**, **luminosidade** e **qualidade do ar**
- Registro de **data e hora** com precisão por meio do módulo RTC
- Exibição em tempo real no display LCD colorido
- Arquitetura modular para futura integração com serviços em nuvem via Wi-Fi (ex: ThingSpeak, MQTT, Supabase etc.)

## ⚙️ Pinagem (NodeMCU ↔ Módulos)

| Função             | Pino ESP8266 | Módulo           |
|--------------------|--------------|------------------|
| SDA (I²C)          | D1 (GPIO5)   | BH1750, AHT10, BMP180, DS3231 |
| SCL (I²C)          | D2 (GPIO4)   | BH1750, AHT10, BMP180, DS3231 |
| DHT11 (digital)    | D6 (GPIO12)  | DHT11            |
| MQ-5 (analógico)   | A0           | MQ-5 (via divisor de tensão) |
| SPI CLK            | D5 (GPIO14)  | Display LCD      |
| SPI MOSI           | D7 (GPIO13)  | Display LCD      |
| SPI CS             | D8 (GPIO15)  | Display LCD      |
| SPI DC             | D3 (GPIO0)   | Display LCD      |
| SPI RST            | D4 (GPIO2)   | Display LCD      |

## 🧪 Estado atual

✅ Montagem no protoboard  
✅ Teste individual de sensores  
✅ Exibição de dados no display  
🔜 Integração com servidor web ou banco de dados

## 👨‍💻 Autor

**copy@2025 ArkhosAggelos**
**Claudio Roberto da Silva**  
Projeto didático para fins educacionais, experimentação com IoT e monitoramento ambiental.

---


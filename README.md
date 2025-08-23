# 🌦️ Estação Meteorológica Compacta IoT

Este projeto consiste em uma estação meteorológica compacta, baseada no microcontrolador **NodeMCU ESP8266 (ESP-12E)**, que realiza a coleta de dados ambientais utilizando múltiplos sensores e exibe as informações em tempo real em uma página na Internet e/ou em um display SPI 1.6" (130x130 pixels) de um módulo de verificação.

## 🔧 Componentes Utilizados

- NodeMCU ESP-12E (ESP8266)
- Sensor de Luminosidade **BH1750**
- Sensor de Temperatura e Umidade **AHT10**
- Sensor de Pressão e Altitude **BMP180 (GY-68)**

## Futuras Integrações
- Display SPI LCD 1.6" (130x130)
- Sensor de Qualidade do Ar **MQ-5**
- Sensor de Temperatura e Umidade redundante **DHT11**
- Módulo RTC (Relógio de Tempo Real) **DS3231**

## 📋 Funcionalidades

- Leitura de **temperatura**, **umidade**, **pressão atmosférica**, **altitude** e **luminosidade**
- Registro de **data e hora** com precisão UTC
- Acesso dos registros em página web, <a href="https://miniestacaometeorologica.vercel.app/">clique aqui</a>.

## ⚙️ Pinagem na Estação (NodeMCU ↔ Módulos)

| Função             | Pino ESP8266 | Módulo           |
|--------------------|--------------|------------------|
| SDA (I²C)          | D1 (GPIO5)   | BH1750, AHT10, BMP180, DS3231 |
| SCL (I²C)          | D2 (GPIO4)   | BH1750, AHT10, BMP180, DS3231 |


## 👨‍💻 Autor

**&copy;2025 ArkhosAggelos**<br>
**Claudio Roberto da Silva**  
Projeto didático para fins educacionais, experimentação com IoT e monitoramento ambiental.

---


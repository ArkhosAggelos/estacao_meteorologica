import mqtt from "mqtt";
import pkg from "pg";
import dotenv from "dotenv";
dotenv.config();

const { Client } = pkg;

export default async function handler(req, res) {
  const db = new Client({
    connectionString: process.env.PG_URL,
    ssl: { rejectUnauthorized: false }
  });

  await db.connect();

  await new Promise((resolve, reject) => {
    const mqttClient = mqtt.connect({
      host: process.env.MQTT_BROKER,
      port: parseInt(process.env.MQTT_PORT),
      protocol: "mqtts",
      username: process.env.MQTT_USERNAME,
      password: process.env.MQTT_PASSWORD
    });

    mqttClient.on("connect", () => {
      mqttClient.subscribe("estacao/externo");
    });

    mqttClient.on("message", async (_, message) => {
      try {
        const { id, temperatura, umidade, pressao, lux, previsao } = JSON.parse(message.toString());

        await db.query(
          `INSERT INTO leituras (id, temperatura, umidade, pressao, lux, previsao)
           VALUES ($1, $2, $3, $4, $5, $6)
           ON CONFLICT (id) DO NOTHING`,
          [id, temperatura, umidade, pressao, lux, previsao]
        );

        mqttClient.end();
        await db.end();
        resolve();  // encerra a função após o sucesso
      } catch (err) {
        reject(err);
      }
    });

    mqttClient.on("error", (err) => {
      reject(err);
    });
  });

  res.status(200).send("Listener executado com sucesso");
}

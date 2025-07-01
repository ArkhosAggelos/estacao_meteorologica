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

  const client = mqtt.connect({
    host: process.env.MQTT_BROKER,
    port: parseInt(process.env.MQTT_PORT),
    protocol: "mqtts",
    username: process.env.MQTT_USERNAME,
    password: process.env.MQTT_PASSWORD
  });

  client.on("connect", () => {
    client.subscribe("estacao/externo");
  });

  client.on("message", async (topic, message) => {
    const { id, temperatura, umidade, pressao, lux, previsao } = JSON.parse(message.toString());

    await db.query(
      `INSERT INTO leituras (id, temperatura, umidade, pressao, lux, previsao)
       VALUES ($1, $2, $3, $4, $5, $6) ON CONFLICT (id) DO NOTHING`,
      [id, temperatura, umidade, pressao, lux, previsao]
    );
    client.end();
    db.end();
    res.status(200).send("Dados salvos com sucesso!");
  });
}


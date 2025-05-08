import { Client } from "pg";

export default async function handler(req, res) {
  const client = new Client({
    connectionString: process.env.PG_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    const result = await client.query('SELECT * FROM leituras ORDER BY id DESC LIMIT 1');
    await client.end();
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
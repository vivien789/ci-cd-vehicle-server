// import pg from 'pg';
//
// const { Pool } = pg;
// const { Pool } = require('pg');
import { Pool } from 'pg';

const createSchemaStatement = `
CREATE SCHEMA IF NOT EXISTS vehicle_server;
CREATE TABLE IF NOT EXISTS vehicle_server.vehicles (
    id SERIAL PRIMARY KEY,
    shortcode TEXT NOT NULL,
    battery SMALLINT,
    longitude DECIMAL(10, 8) NOT NULL,
    latitude DECIMAL(11, 8) NOT NULL
);
`;

const deleteSchemaStatement = `
DROP TABLE IF EXISTS vehicle_server.vehicles;
DROP SCHEMA IF EXISTS vehicle_server;
`;

interface DBConfig {
  user: string;
  host: string;
  database: string;
  password: string;
  port: number;
}

export function dbConfigFromEnv(): DBConfig {
  return {
    user: (process.env.DB_USER ?? 'vehicle').trim(),
    host: (process.env.DB_HOST ?? 'localhost').trim(),
    database: (process.env.DB_DATABASE ?? 'vehicle').trim(),
    password: (process.env.DB_PASSWORD ?? 'vehicle').trim(),
    port: parseInt(process.env.DB_PORT ?? '5433', 10),
  };
}

export async function connectDb(cfg: DBConfig): Promise<Pool> {
  const pool = new Pool({
    ...cfg,
    ssl: {
      rejectUnauthorized: false
    }
  });

  try {
    const client = await pool.connect();
    console.log("✅ Connexion à PostgreSQL réussie");
    client.release();

    // On essaie de créer le schéma
    await createSchema(pool);
    console.log("✅ Schéma vehicle_server prêt");

    return pool;
  } catch (err: any) {
    console.error("❌ ÉCHEC DE CONNEXION DB");
    console.error(`Détail: ${err.message}`);

    // Si c'est une erreur de permission sur l'extension
    if (err.message.includes("permission denied to create extension")) {
       console.warn("💡 Note: L'extension PostGIS est déjà gérée par Docker.");
    }

    await pool.end();
    throw err;
  }
}

export async function createSchema(pool: Pool): Promise<void> {
  await pool.query(createSchemaStatement);
}

export async function dropSchema(pool: Pool): Promise<void> {
  await pool.query(deleteSchemaStatement);
}
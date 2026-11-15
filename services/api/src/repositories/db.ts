import pg from 'pg';
import { config } from '../config/env.js';

const { Pool } = pg;

export let dbPool: pg.Pool | null = null;
export let isPostgresConnected = false;

export async function initDatabase() {
  if (!config.databaseUrl) {
    console.log('[Database] No DATABASE_URL configured. Running with in-memory persistence store.');
    return;
  }

  try {
    dbPool = new Pool({
      connectionString: config.databaseUrl,
      connectionTimeoutMillis: 3000,
      idleTimeoutMillis: 10000
    });

    const client = await dbPool.connect();
    const res = await client.query('SELECT NOW() as now');
    client.release();

    isPostgresConnected = true;
    console.log(`[Database] PostgreSQL connected successfully at ${res.rows[0].now}`);
  } catch (err: any) {
    console.warn(`[Database] PostgreSQL connection failed: ${err.message}. Seamlessly falling back to in-memory store.`);
    isPostgresConnected = false;
    dbPool = null;
  }
}

export async function query<T = any>(sql: string, params: any[] = []): Promise<T[]> {
  if (!dbPool || !isPostgresConnected) {
    throw new Error('PostgreSQL not connected');
  }
  const res = await dbPool.query(sql, params);
  return res.rows;
}

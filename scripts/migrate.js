import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const connectionString = process.env.DATABASE_URL || 'postgresql://transguard:transguard123@localhost:5432/transguard_db';

console.log('Connecting to PostgreSQL database at:', connectionString);

const client = new pg.Client({ connectionString });

async function run() {
  try {
    await client.connect();
    console.log('Connected to PostgreSQL successfully.');

    // 1. Run core schema
    const schemaSql = fs.readFileSync(path.join(rootDir, 'database', 'schema.sql'), 'utf8');
    console.log('Applying database schema...');
    await client.query(schemaSql);
    console.log('Schema applied successfully.');

    // 2. Run seeds
    const seeds = ['001_seed_fleet.sql', '002_seed_alerts.sql', '003_seed_workorders.sql'];
    for (const seed of seeds) {
      const seedPath = path.join(rootDir, 'database', 'seeds', seed);
      if (fs.existsSync(seedPath)) {
        console.log(`Running seed: ${seed}...`);
        const seedSql = fs.readFileSync(seedPath, 'utf8');
        await client.query(seedSql);
        console.log(`Seed ${seed} applied.`);
      }
    }

    console.log('\nAll migrations and seeds completed successfully!');
  } catch (err) {
    console.error('Migration failed:', err.message);
    console.log('TransGuard AI will continue in in-memory simulation mode if PostgreSQL is unavailable.');
  } finally {
    await client.end();
  }
}

run();

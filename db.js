// db.js
import pg from 'pg'; // or const { Pool } = require('pg');
const { Pool } = pg;

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL env var not set');
}

const pool = new Pool({
  connectionString,
  ssl: { rejectUnauthorized: false }, // often needed on hosted Postgres
});

// optional: basic health logging
pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

// helper for queries
export async function query(text, params) {
  const res = await pool.query(text, params);
  return res;
}
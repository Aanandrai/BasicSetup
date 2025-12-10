import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

const { Pool } = pg;

let pool;

if (process.env.NODE_ENV === "production" && process.env.DATABASE_URL) {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }, // required for most online DBs
  });
} else {
  pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });
}

export default pool;

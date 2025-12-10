// createDb.js
import pkg from "pg";
import dotenv from "dotenv";
dotenv.config();

const { Client } = pkg;

const createDbIfNotExist = async () => {
  const dbName = process.env.DB_NAME;

  // Connect to default 'postgres' database
  const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: "postgres", // must connect to a database that exists
  });

  try {
    await client.connect();

    const res = await client.query(
      `SELECT 1 FROM pg_database WHERE datname='${dbName}'`
    );

    if (res.rowCount === 0) {
      console.log(`Database "${dbName}" does not exist. Creating...`);
      await client.query(`CREATE DATABASE "${dbName}"`);
      console.log(`Database "${dbName}" created successfully!`);
    } else {
      console.log(`Database "${dbName}" already exists.`);
    }
  } catch (err) {
    console.error("Error creating database:", err);
  } finally {
    await client.end();
  }
};

export default createDbIfNotExist;

import pg from "pg";
import { pool_options } from "../../config/database.config.js";
const { Pool } = pg;
const pool = new Pool(pool_options);
const client = await pool.connect();

const createUsersTable = async () => {
  try {
    await client.query(
      `CREATE TABLE IF NOT EXISTS users(
        id UUID PRIMARY KEY,
        name VARCHAR(36) NOT NULL,
        password VARCHAR(64) NOT NULL,
        refresh_token VARCHAR(512) UNIQUE,
        gender VARCHAR(2),
        email VARCHAR(256) UNIQUE NOT NULL,
        address VARCHAR(256),
        phone VARCHAR(12),
        photo VARCHAR(256)
      )`
    );
    console.log("Users table created successfully.");
  } catch (error) {
    console.error("Failed to create users table:", error.message);
    throw new Error(error.message);
  } finally {
    client.release();
  }
};

export default createUsersTable;

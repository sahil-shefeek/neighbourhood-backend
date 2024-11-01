import pg from "pg";
import { pool_options } from "../config/database.config.js";
/**
 * Executes an SQL query with optional parameters and returns the results.
 *
 * @param {string} sql - The SQL query string.
 * @param {Array} params - The parameters to be passed into the query (optional).
 * @returns {Promise<Array>} - A promise that resolves to the result of the query, or an empty array if no results.
 * @throws {Error} - Throws an error if the query fails.
 */

const { Pool } = pg;
const pool = new Pool(pool_options);
const client = await pool.connect();

export async function query(sql, params) {
  const client = await pool.connect();
  try {
    const results = await client.query(sql, params);

    if (results.rows.length > 0) {
      return results.rows;
    } else {
      return [];
    }
  } catch (error) {
    console.error("db.js: Database query error:", error);
    throw new Error("Database query failed: " + error.message);
  } finally {
    client.release();
  }
}

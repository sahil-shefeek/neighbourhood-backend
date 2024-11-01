import pg from 'pg'; 
import { pool_options } from '../../config/database.config.js';
const { Pool } = pg; 
const pool = new Pool(pool_options);
const client = await pool.connect()

const createServiceTypesTable = async() => {
    try {
        await client.query(
            `CREATE TABLE IF NOT EXISTS service_types(
            type_id  UUID PRIMARY KEY,
            type_name VARCHAR(32) NOT NULL
            )`
        );
        console.log("service_types table created");
    }catch(error) {
        console.error("failed to create service_types table :",error.message);
        throw new Error(error.message);
    }finally{
        client.release()
      }
};

export default createServiceTypesTable;
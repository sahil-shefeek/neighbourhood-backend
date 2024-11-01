import pg from 'pg'; 
import { pool_options } from '../../config/database.config.js';
const { Pool } = pg; 
const pool = new Pool(pool_options);
const client = await pool.connect()

const createServicesTable = async() => {
    try {
        await client.query(
            `CREATE TABLE IF NOT EXISTS services(
            id  UUID PRIMARY KEY,
            name VARCHAR(32) NOT NULL,
            type_id UUID ,
            offered_by UUID,
            is_available BOOLEAN NOT NULL,
            price FLOAT NOT NULL DEFAULT 0,
            FOREIGN KEY (type_id) REFERENCES service_types(type_id),
            FOREIGN KEY (offered_by) REFERENCES users(id) 
            )`
        );
        console.log("services table created");
    }catch(error) {
        console.error("failed to create services table :",error.message);
        throw new Error(error.message);
    }finally{
        client.release()
      }
};

export default createServicesTable;
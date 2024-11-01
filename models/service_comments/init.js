import pg from 'pg'; 
import { pool_options } from '../../config/database.config.js';
const { Pool } = pg; 
const pool = new Pool(pool_options);
const client = await pool.connect()

const createServiceCommentsTable = async() => {
    try {
        await client.query(
            `CREATE TABLE IF NOT EXISTS service_comments(
            comment_id  UUID PRIMARY KEY,
            posted_by UUID ,
            service_id UUID ,
            rating INT,
            comment TEXT,
            FOREIGN KEY (service_id) REFERENCES services(id),
            FOREIGN KEY (posted_by) REFERENCES users(id)
            )`
        );
        console.log("service_comments table created");
    }catch(error) {
        console.error("failed to create service_comments table :",error.message);
        throw new Error(error.message);
    }finally{
        client.release()
      }
};

export default createServiceCommentsTable;
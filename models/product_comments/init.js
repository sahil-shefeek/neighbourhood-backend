import pg from 'pg'; 
import { pool_options } from '../../config/database.config.js';
const { Pool } = pg; 
const pool = new Pool(pool_options);
const client = await pool.connect()

const createProductCommentsTable = async() => {
    try {
        await client.query(
            `CREATE TABLE IF NOT EXISTS product_comments(
            comment_id  UUID PRIMARY KEY,
            posted_by UUID ,
            product_id UUID ,
            rating INT,
            comment TEXT,
            FOREIGN KEY (product_id) REFERENCES products(id),
            FOREIGN KEY (posted_by) REFERENCES users(id)
            )`
        );
        console.log("product_comments table created");
    }catch(error) {
        console.error("failed to create product_comments table :",error.message);
        throw new Error(error.message);
    }finally{
        client.release()
      }
};

export default createProductCommentsTable;
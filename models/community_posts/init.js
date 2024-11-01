import pg from 'pg'; 
import { pool_options } from '../../config/database.config.js';
const { Pool } = pg; 
const pool = new Pool(pool_options);
const client = await pool.connect()

const createCommunityPostsTable = async() => {
    try {
        await client.query(
            `CREATE TABLE IF NOT EXISTS community_posts(
            post_id  UUID PRIMARY KEY,
            posted_by UUID,
            title INT,
            content TEXT,
            is_fulfilled BOOLEAN NOT NULL DEFAULT FALSE,
            FOREIGN KEY (posted_by) REFERENCES users(id)
            )`
        );
        console.log("community_posts table created");
    }catch(error) {
        console.error("failed to create community_posts table :",error.message);
        throw new Error(error.message);
    }finally{
        client.release()
      }
};

export default createCommunityPostsTable;
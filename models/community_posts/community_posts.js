import {query} from "../../services/db.js";
import {v4 as uuid} from "uuid";

const getAll = async() => {
    return await query("SELECT * FROM community_posts");
};

const get = async({post_id=null,posted_by=null}) => {
    if(post_id) { 
        const res = await query("SELECT * FROM community_posts WHERE post_id = $1",[post_id]);
        if(res.length < 1){
            throw{status: 404 ,message:"Post not found"};
        }
        return res[0];
    }
    if(posted_by) {
        const res= await query("SELECT * FROM community_posts WHERE posted_by = $1",[posted_by]);
        if(res.length < 1) {
            throw{ status:404,message:"Post not found"};
        }
        return res;
    }
}



const add = async(postDetails) => {
    const{posted_by,title,content,is_fulfilled}=postDetails;
    const post_id = uuid();
    try{
        const fields =["post_id","posted_by","title","content","is_fulfilled"];
        const values = [post_id,posted_by,title,content,is_fulfilled];
        const placeholders =fields.map((_, index) => `$${index + 1}`).join(", ");
        const sql = 
                `INSERT INTO community_posts(${fields.join(", ")})
                VALUES(${placeholders})`;
        await query(sql,values);
        const createProduct = await get({id});
        return{
            success:true,
            createProduct,
        };
    }catch(error){
        console.error(error);
        throw new Error(`Error creating post: ${error.message}`);
    }
    
};

const update = async(post_id,postDetails)=>{
    try{
        const{post_id,posted_by,title,content,is_fulfilled}=postDetails;  
        
        const sql=`
        UPDATE community_posts 
        SET is_fulfilled = $1 
        WHERE post_id= $2`;

        const res = await query(sql,[is_fulfilled]);
        if(res.rowCount === 0){
            throw{status:404,message:"Post not found"};
        }
        return res;
    }catch(error){
        console.error(error);
        throw error;
    }
    
};

const remove = async(id) => {
    const res= await query("DELETE FROM community_posts WHERE post_id=$1",[post_id])
    if(res.rowCount === 0){
        throw{status:404,message:"Post not found"}
    }
};

export default{getAll,get,add,update,remove};
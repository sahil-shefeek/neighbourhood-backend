import {query} from "../../services/db.js";
import {v4 as uuid} from "uuid";


const get = async({comment_id=null,posted_by=null,service_id=null}) => {
    if(comment_id) { 
        const res = await query("SELECT comment FROM service_comments WHERE comment_id = $1",[comment_id]);
        if(res.length < 1){
            throw{status: 404 ,message:"Comment not found"};
        }
        return res[0];
    }
    if(posted_by) {
        const res= await query("SELECT comment FROM service_comments WHERE posted_by = $1",[posted_by]);
        if(res.length < 1) {
            throw{ status:404,message:"Comment not found"};
        }
        return res;
    }
    if(service_id) {
        const res= await query("SELECT comment FROM service_comments WHERE service_id = $1",[service_id]);
        if(res.length < 1) {
            throw{ status:404,message:"Comment not found"};
        }
        return res;
    }
}


const add = async(commentDetails) => {
    const{posted_by,service_id,rating,comment}=commentDetails;
    const comment_id = uuid();
    try{
        const fields =["comment_id","posted_by","service_id"];
        const values = [comment_id,posted_by,service_id];
        const placeholders =fields.map((_, index) => `$${index + 1}`).join(", ");
        if(rating){
            fields.push("rating");
            values.push(rating);
            placeholders.push("$"+values.length+1)
        }
        if(comment){
            fields.push("comment");
            values.push(comment);
            placeholders.push("$"+values.length+1)
        }
        if(rating==null && comment==null ) {
            throw{status:400,message:"comment and rating not present"};
        }
        
        values.push(comment_id)
        const sql = 
                `INSERT INTO service_comments(${fields.join(", ")})
                VALUES(${placeholders.join(", ")})`;
        await query(sql,values);
        const createComment = await get({comment_id});
        return{
            success:true,
            createComment,
        };

    }catch(error){
        console.error(error);
        throw new Error(`Error creating comment: ${error.message}`);
    }
    
};

const remove = async(comment_id) => {
    const res= await query("DELETE FROM service_comments WHERE comment_id=$1",[comment_id])
    if(res.rowCount === 0){
        throw{status:404,message:"Comment not found"}
    }
};

export default{get,add,remove};
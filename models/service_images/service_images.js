import {query} from "../../services/db.js";
import {v4 as uuid} from "uuid";


const get = async({image_id=null,service_id=null}) => {
    if(image_id) { 
        const res = await query("SELECT * FROM service_images WHERE image_id = $1",[image_id]);
        if(res.length < 1){
            throw{status: 404 ,message:"Image not found"};
        }
        return res[0];
    }
    if(service_id) {
        const res= await query("SELECT * FROM service_images WHERE service_id = $1",[service_id]);
        if(res.length < 1) {
            throw{ status:404,message:"Image not found"};
        }
        return res;
    }
}



const add = async(imageDetails) => {
    const{service_id,path}=imageDetails;
    const image_id = uuid();
    try{
        const fields =["image_id","service_id","path",];
        const values = [image_id,service_id,path];
        const placeholders =fields.map((_, index) => `$${index + 1}`).join(", ");
        const sql = 
                `INSERT INTO service_images(${fields.join(", ")})
                VALUES(${placeholders})`;
        await query(sql,values);
        const createImage = await get({image_id});
        return{
            success:true,
            createImage,
        };
    }catch(error){
        console.error(error);
        throw new Error(`Error creating image: ${error.message}`);
    }
    
};const update = async(image_id,imageDetails)=>{
    try{
        const{service_id,path}=imageDetails;  
        const fields = [];
        const values =[];

        if(service_id){
            fields.push("service_id = $"+ (values.length + 1));
            values.push(service_id);
        }
        if(path){
            fields.push("path = $"+ (values.length + 1));
            values.push(path);
        }
       

        values.push(image_id);
        
        const sql=`
        UPDATE service_images
        SET ${fields.join(",")} 
        WHERE image_id= $${values.length}`;

        const res = await query(sql,values);
        if(res.rowCount === 0){
            throw{status:404,message:"Image not found"};
        }
        return res;
    }catch(error){
        console.error(error);
        throw error;
    }
    
};


const remove = async(image_id) => {
    const res= await query("DELETE FROM service_images WHERE image_id=$1",[image_id])
    if(res.rowCount === 0){
        throw{status:404,message:"Image not found"}
    }
};

export default{get,add,remove,update};
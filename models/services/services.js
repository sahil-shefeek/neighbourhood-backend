import {query} from "../../services/db.js";
import {v4 as uuid} from "uuid";

 const getAll = async() => {
    return await query("SELECT * FROM services");
};

 const get = async(id=null,name=null) =>{
    if(id){
        const res = await query("SELECT * FROM services WHERE id = $1",[id]);
        if(res.length < 1){
            throw{status: 404 ,message:"Service not found"};
        }
        return res[0];
    }
    if(name){
        const res = await query("SELECT * FROM services WHERE name = $1",[name]);
        if(res.length < 1){
            throw{status: 404 ,message:"Service not found"};
        }
        return res;
    }    
};

const getbyType = async(type_name) => {
    const res = await query("SELECT * FROM services WHERE type_id in (SELECT type_id FROM service_types WHERE type_name=$1)" , [type_name]);
    if(res.length < 1){
        throw{ status:404,message:"Service not found"};
    }
    return res; 
       
}
 const add = async(serviceDetails) => {
    const{name,type_id,offered_by,is_available,price}=serviceDetails;
    const id = uuid();
    try{
        const fields = ["id","name","type_id","offered_by","is_available","price"];
        const values=[id,name,type_id,offered_by,is_available,price];
        const placcholders = fields.map((_,index) => `$${index+1}`.join(", "));
        const sql =`
        INSERT INTO services(${fields.join(", ")})
        VALUES (${placcholders})`;
        await query(sql,values);
        const createService = await get(id);
        return{
            success: true,
            createService,
        };
    }catch(error){
        console.error(error);
        throw new Error(`Error creating service:${error.message}`);
    }
};

 const update = async(id,serviceDetails)=>{
    try{
        const{name,type_id,offered_by,is_available,price}=serviceDetails;  
        const fields = [];
        const values =[];

        if(name){
            fields.push("name = $"+ (values.length + 1));
            values.push(name);
        }
        if(type_id){
            fields.push("type_id = $"+ (values.length + 1));
            values.push(type_id);
        }
        if(offered_by){
            fields.push("offered_by = $"+ (values.length + 1));
            values.push(offered_by);
        }
        if(is_available!== undefined){
            fields.push("is_available = $"+ (values.length + 1));
            values.push(is_available);
        }
        if(price){
            fields.push("price = $"+ (values.length + 1));
            values.push(price);
        }

        if(fields.length == 0) {
            throw{status:400,message:"No fields provided for update"};
        }

        values.push(id);
        
        const sql=`
        UPDATE services 
        SET ${fields.join(",")} 
        WHERE id= $${values.length}`;

        const res = await query(sql,values);
        if(res.rowCount === 0){
            throw{status:404,message:"Services not found"};
        }
        return res;
    }catch(error){
        console.error(error);
        throw error;
    }
    
};

 const replace = async(id,serviceDetails) =>{
    try{
        const{name,type_id,offered_by,is_available,price} = serviceDetails;
         
        const sql=`
        UPDATE services 
        SET name=$1,type_id=$2,offered_by=$3,is_available=$4,price=$5 
        WHERE id=$6 `;

        const res = await query(sql,[name,type_id,offered_by,is_available,price,id]);
        if(res.rowCount === 0){
            throw{status:404,message:"Service not found"}
        }
        return res;
    }catch(error) {
        console.error(error);
        throw error;
    }

};

 const remove = async(id) => {
    const res= await query("DELETE FROM services WHERE id=$1",[id])
    if(res.rowCount === 0){
        throw{status:404,message:"Service not found"}
    }
};

export default{getAll,get,getbyType,add,update,replace,remove};
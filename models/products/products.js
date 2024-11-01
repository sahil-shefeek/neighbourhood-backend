import {query} from "../../services/db.js";
import {v4 as uuid} from "uuid";

const getAll = async() => {
    return await query("SELECT * FROM products");
};

const get = async({id=null,name=null}) => {
    if(id) { 
        const res = await query("SELECT * FROM products WHERE id = $1",[id]);
        if(res.length < 1){
            throw{status: 404 ,message:"Product not found"};
        }
        return res[0];
    }
    if(name) {
        const res= await query("SELECT * FROM products WHERE name = $1",[name]);
        if(res.length < 1) {
            throw{ status:404,message:"Product not found"};
        }
        return res;
    }
}

const getbyType = async({type_name=null}) => {
    const res = await query("SELECT * FROM products WHERE type_id in (SELECT type_id FROM product_types WHERE type_name=$1)" , [type_name]);
    if(res.length < 1){
       throw{ status:404,message:"Product not found"};
    }
    return res;
        
}

const add = async(productDetails) => {
    const{name,type_id,offering_type,offered_by,is_available,price}=productDetails;
    const id = uuid();
    try{
        const fields =["id","name","type_id","offering_type","offered_by","is_available","price"];
        const values = [id,name,type_id,offering_type,offered_by,is_available,price];
        const placeholders =fields.map((_, index) => `$${index + 1}`).join(", ");
        const sql = 
                `INSERT INTO products(${fields.join(", ")})
                VALUES(${placeholders})`;
        await query(sql,values);
        const createProduct = await get({id});
        return{
            success:true,
            createProduct,
        };
    }catch(error){
        console.error(error);
        throw new Error(`Error creating products: ${error.message}`);
    }
    
};

const update = async(id,productDetails)=>{
    try{
        const{name,type_id,offering_type,offered_by,is_available,price}=productDetails;  
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
        if(offering_type){
            fields.push("offering_type = $"+ (values.length + 1));
            values.push(offering_type);
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
        UPDATE products 
        SET ${fields.join(",")} 
        WHERE id= $${values.length}`;

        const res = await query(sql,values);
        if(res.rowCount === 0){
            throw{status:404,message:"Product not found"};
        }
        return res;
    }catch(error){
        console.error(error);
        throw error;
    }
    
};

const replace = async(id,productDetails) =>{
    try{
        const{name,type_id,offering_type,offered_by,is_available,price} = productDetails;
         
        const sql=`
        UPDATE products 
        SET name=$1,type_id=$2,offering_type=$3,offered_by=$4,is_available=$5,"price=$6"
        WHERE id=$7 `;

        const res = await query(sql,[name,type_id,offering_type,offered_by,is_available,price,id]);
        if(res.rowCount === 0){
            throw{status:404,message:"Product not found"}
        }
        return res;
    }catch(error) {
        console.error(error);
        throw error;
    }

};

const remove = async(id) => {
    const res= await query("DELETE FROM products WHERE id=$1",[id])
    if(res.rowCount === 0){
        throw{status:404,message:"Product not found"}
    }
};

export default{getAll,get,getbyType,add,update,replace,remove};
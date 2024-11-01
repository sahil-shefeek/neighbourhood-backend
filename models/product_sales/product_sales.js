import {query} from "../../services/db.js";
import {v4 as uuid} from "uuid";

const getAll = async() => {
    return await query("SELECT * FROM product_sales");
};

const get = async({sale_id=null,sold_by=null,sold_to=null,product_id=null}) => {
    if(sale_id) { 
        const res = await query("SELECT * FROM product_sales WHERE sale_id = $1",[sale_id]);
        if(res.length < 1){
            throw{status: 404 ,message:"Sale not found"};
        }
        return res[0];
    }
    if(sold_by) {
        const res= await query("SELECT * FROM product_sales WHERE sold_by = $1",[sold_by]);
        if(res.length < 1) {
            throw{ status:404,message:"Sale not found"};
        }
        return res;
    }
    if(sold_to) {
        const res= await query("SELECT * FROM product_sales WHERE sold_to = $1",[sold_to]);
        if(res.length < 1) {
            throw{ status:404,message:"Sale not found"};
        }
        return res;
    }
    
    if(product_id) {
        const res= await query("SELECT * FROM product_sales WHERE product_id = $1",[product_id]);
        if(res.length < 1) {
            throw{ status:404,message:"Sale not found"};
        }
        return res;
    }
}


const add = async(saleDetails) => {
    const{sold_by,sold_to,product_id,price,sale_date}=saleDetails;
    const sale_id = uuid();
    try{
        const fields =["sale_id","sold_by","sold_to","product_id","price","sale_date"];
        const values = [sale_id,sold_by,sold_to,product_id,price,sale_date];
        const placeholders =fields.map((_, index) => `$${index + 1}`).join(", ");
        const sql = 
                `INSERT INTO product_sales(${fields.join(", ")})
                VALUES(${placeholders})`;
        await query(sql,values);
        const createSale = await get({sale_id});
        return{
            success:true,
            createSale,
        };
    }catch(error){
        console.error(error);
        throw new Error(`Error creating sale: ${error.message}`);
    }
    
};





export default{getAll,get,add,};
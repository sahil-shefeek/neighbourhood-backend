import {query} from "../../services/db.js"

const getAll = async() => {
    return await query("SELECT type_name FROM product_types");

};

const get = async({type_name=null}) => {
    if(type_name) { 
        const res = await query("SELECT type_id FROM product_types WHERE type_name = $1",[type_name]);
        if(res.length < 1){
            throw{status: 404 ,message:"type not found"};
        }
        return res[0];
    }
}

export default {getAll,get};

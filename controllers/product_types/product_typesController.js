import product_types from "../../models/product_types/product_types.js";

export const getAllTypes = async(req,res)=>{
    try{
        const typesList = await product_types.getAll();
        res.json(typesList);
    }catch(error) {
        res.status(500).json({error:"Error retrieving types"});
    }
}
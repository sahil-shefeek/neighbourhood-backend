import service_types from "../../models/service_types/service_types.js";

export const getAllTypes = async(req,res)=>{
    try{
        const typesList = await service_types.getAll();
        res.json(typesList);
    }catch(error) {
        res.status(500).json({error:"Error retrieving types"});
    }
}

export const getType= async(req,res) => {
    try{
            const type = await service_types.get({
            type_name: req.params?.type_name,
            });
            res.json(type);
    }catch(error){
        if(error.status===404){
            res.status(404).json({error: error.message});
        }else{
            res.status(500).json({error:"Error retrieving type"});
        }
    }
};
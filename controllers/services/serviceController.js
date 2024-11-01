import services from "../../models/services/services.js";

export const getAllServices = async(req,res) => {
    try{
        const servicesList = await services.getAll();
        res.json(servicesList);
    }catch(error){
        res.status(500).json({error:"Error retrieving services"});
    }
};

export const getService = async(req,res) => {
    try{
            const service = await services.get({
            id: req.params?.id,
            name: req.params?.name,
            });
            res.json(service);
    }catch(error){
        if(error.status===404){
            res.status(404).json({error: error.message});
        }else{
            res.status(500).json({error:"Error retrieving service"});
        }
    }
};

export const getServicebyType = async(req,res) => {
    try{
            const service = await services.getbyType({
            type_name: req.params?.type_name,
            });
            res.json(service);
    }catch(error){
        if(error.status===404){
            res.status(404).json({error: error.message});
        }else{
            res.status(500).json({error:"Error retrieving service"});
        }
    }
};

export const addService = async(req,res) => {
    try{
        const result = await services.add(req.body);
        if(!result.success){
            return res.status(400).json({message: result.message});
        }

        const{id,name,type_id,offered_by,is_available,price}=result.createService
        res.status(201).json({id,name,type_id,offered_by,is_available,price})
    }catch(error){
        res.status(500).json({message: error.message});
    }
};

export const updateService = async(req,res) => {
    const {id} = req.params
    try{
            await services.update(id,req.body);
            const updatedService = await services.get({id});
            res.json({updatedService});
    }catch(error){
        if(error.status === 404) {
            res.status(404).json({error: error.message});
        }else{
            res.status(500).json({error: "Error updating service"});
        }
    }
};

export const replaceService = async(req,res) =>{
    const {id} = req.params
    try{
        await services.replace(id,req.body);
        const replacedService = await services.get({id});
        res.json({replacedService});
    }catch(error){
        if(error.status === 404){
           res.status(404).json({error: error.message}); 
        }else if(error.status === 400) {
            res.status(400).json({error: error.message});
        }else{
            res.status(500).json({error: "Error replacing service"});
        }
    }
};

export const deleteService = async(req,res) => {
    try{
        await services.remove(req.params.id);
        res.status(204).end();
    }catch (error) {
        if(error.status === 404) {
            res.status(404).json({error: error.message});
        }else{
            res.status(500).json({error: "Error deleting service"});
        }       
    }
};
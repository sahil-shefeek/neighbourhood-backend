import services from "../../models/services/services.js";
import service_types from "../../models/service_types/service_types.js";

const DEFAULT_OFFERED_BY = "8b32c88c-1d27-45d6-910d-af983a3c6f3e";

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
        const { type_name, ...otherserviceData } = req.body;

        
        const typeResult = await service_types.get({ type_name });
        
        if (!typeResult) {
            return res.status(404).json({ message: "Type not found" });
        }

        const type_id = typeResult.type_id;

        
        const serviceData = {
            ...otherserviceData,
            type_id,
            offered_by: DEFAULT_OFFERED_BY,
        };

        const result = await services.add(serviceData);
        if(!result.success){
            return res.status(400).json({message: result.message});
        }

        const{id,name,offered_by,is_available,price}=result.createService
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
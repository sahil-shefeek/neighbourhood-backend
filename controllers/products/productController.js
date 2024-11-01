import products from "../../models/products/products.js";

export const getAllProducts = async(req,res) => {
    try{
        const productsList = await products.getAll();
        res.json(productsList);
    }catch(error){
        res.status(500).json({error:"Error retrieving products"});
    }
};

export const getProduct = async(req,res) => {
    try{
            const product = await products.get({
            id: req.params?.id,
            name: req.params?.name,
            });
            res.json(product);
    }catch(error){
        if(error.status===404){
            res.status(404).json({error: error.message});
        }else{
            res.status(500).json({error:"Error retrieving product"});
        }
    }
};

export const getProductbyType = async(req,res) => {
    try{
            const product = await products.getbyType({
            type_name: req.params?.type_name,
            });
            res.json(product);
    }catch(error){
        if(error.status===404){
            res.status(404).json({error: error.message});
        }else{
            res.status(500).json({error:"Error retrieving product"});
        }
    }
};

export const addProduct = async(req,res) => {
    try{
        const result = await products.add(req.body);
        if(!result.success){
            return res.status(400).json({message: result.message});
        }

        const{id,name,type_id,offering_type,offered_by,is_available,price}=result.createProduct
        res.status(201).json({id,name,type_id,offering_type,offered_by,is_available,price})
    }catch(error){
        res.status(500).json({message: error.message});
    }
};

export const updateProduct = async(req,res) => {
    const {id} = req.params
    try{
            await products.update(id,req.body);
            const updatedProduct = await products.get({id});
            res.json({updatedProduct});
    }catch(error){
        if(error.status === 404) {
            res.status(404).json({error: error.message});
        }else{
            res.status(500).json({error: "Error updating product"});
        }
    }
};

export const replaceProduct = async(req,res) =>{
    const {id} = req.params
    try{
        await products.replace(id,req.body);
        const replacedProduct = await products.get({id});
        res.json({replacedProduct});
    }catch(error){
        if(error.status === 404){
           res.status(404).json({error: error.message}); 
        }else if(error.status === 400) {
            res.status(400).json({error: error.message});
        }else{
            res.status(500).json({error: "Error replacing product"});
        }
    }
};

export const deleteProduct = async(req,res) => {
    try{
        await products.remove(req.params.id);
        res.status(204).end();
    }catch (error) {
        if(error.status === 404) {
            res.status(404).json({error: error.message});
        }else{
            res.status(500).json({error: "Error deleting product"});
        }       
    }
};
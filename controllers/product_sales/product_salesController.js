import product_sales from "../../models/product_sales/product_sales.js";

export const getAllSales = async(req,res) => {
    try{
        const salesList = await product_sales.getAll();
        res.json(salesList);
    }catch(error){
        res.status(500).json({error:"Error retrieving sales"});
    }
};

export const getSale = async(req,res) => {
    try{
            const sale = await product_sales.get({
            sale_id: req.params?.sale_id,
            sold_by: req.params?.sold_by,
            sold_to: req.params?.sold_to,
            product_id: req.params?.product_id
            });
            res.json(sale);
    }catch(error){
        if(error.status===404){
            res.status(404).json({error: error.message});
        }else{
            res.status(500).json({error:"Error retrieving sale"});
        }
    }
};


export const addSale = async(req,res) => {
    try{
        const result = await product_sales.add(req.body);
        if(!result.success){
            return res.status(400).json({message: result.message});
        }

        const{sale_id,sold_by,sold_to,product_id,price,sale_date}=result.createSale
        res.status(201).json({sale_id,sold_by,sold_to,product_id,price,sale_date})
    }catch(error){
        res.status(500).json({message: error.message});
    }
};


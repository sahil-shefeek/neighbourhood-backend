import product_comments from "../../models/product_comments/product_comments.js";


export const getComment = async(req,res) => {
    try{
            const comment = await products.get({
            comment_id: req.params?.comment_id,
            posted_by: req.params?.posted_by,
            product_id: req.params?.product_id,
            });
            res.json(comment);
    }catch(error){
        if(error.status===404){
            res.status(404).json({error: error.message});
        }else{
            res.status(500).json({error:"Error retrieving comment"});
        }
    }
};



export const addComment = async(req,res) => {
    try{
        const result = await product_comments.add(req.body);
        if(!result.success){
            return res.status(400).json({message: result.message});
        }

        const{comment_id,posted_by,product_id,rating,comment}=result.createComment
        res.status(201).json({comment_id,posted_by,product_id,rating,comment})
    }catch(error){
        res.status(500).json({message: error.message});
    }
};

export const deleteComment = async(req,res) => {
    try{
        await product_comments.remove(req.params.id);
        res.status(204).end();
    }catch (error) {
        if(error.status === 404) {
            res.status(404).json({error: error.message});
        }else{
            res.status(500).json({error: "Error deleting comment"});
        }       
    }
};
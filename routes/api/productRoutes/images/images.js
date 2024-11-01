import express from "express";
import {
    getImage,
    addImage,
    deleteImage
} from "../../../../controllers/product_images/product_imageController.js";


const imageRouter = express.Router();

imageRouter
    .route("/")
    .post(addImage);
imageRouter
    .route("/image_id/:image_id")
    .get(getImage)
    .delete(deleteImage)
    
imageRouter
    .route("/product_id/:product_id")
    .get(getImage);


export default imageRouter;
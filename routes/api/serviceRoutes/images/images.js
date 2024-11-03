import express from "express";
import {
    getImage,
    addImage,
    deleteImage
} from "../../../../controllers/service_images/service_imagesController.js";


const imageRouter = express.Router();

imageRouter
    .route("/")
    .post(addImage);
imageRouter
    .route("/image_id/:image_id")
    .get(getImage)
    .delete(deleteImage)
    
imageRouter
    .route("/service_id/:service_id")
    .get(getImage);


export default imageRouter;
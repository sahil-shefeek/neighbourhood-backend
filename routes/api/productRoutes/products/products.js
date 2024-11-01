import express from "express";
import {
    getAllProducts,
    getProduct,
    addProduct,
    updateProduct,
    replaceProduct,
    deleteProduct,
    getProductbyType,
} from "../../../../controllers/products/productController.js";
import typesRouter  from "../types/types.js";
import imageRouter from "../images/images.js";
import commentsRouter from "../comments/comments.js";
import saleRouter from "../sales/sales.js";

const productRouter = express.Router();

productRouter.use("/type",typesRouter);
productRouter.use("/image",imageRouter);
productRouter.use("/comment",commentsRouter);
productRouter.use("/sales",saleRouter);

productRouter
    .route("/")
    .get(getAllProducts)
    .post(addProduct);
productRouter
    .route("/id/:id")
    .get(getProduct)
    .delete(deleteProduct)
    .put(replaceProduct)
    .patch(updateProduct)
    
productRouter
    .route("/name/:name")
    .get(getProduct);
productRouter
    .route("/type/:type_name")
    .get(getProductbyType);


export default productRouter;
import express from "express";
import {
    getAllTypes,
    getType,
} from "../../../../controllers/product_types/product_typesController.js";

const typesRouter = express.Router();

typesRouter
    .route("/")
    .get(getAllTypes);
typesRouter
    .route("/type_name/:type_name")
    .get(getType);

export default typesRouter;

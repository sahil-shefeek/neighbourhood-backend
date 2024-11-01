import express from "express";
import {
    getAllTypes
} from "../../../../controllers/product_types/product_typesController.js";

const typesRouter = express.Router();

typesRouter
    .route("/")
    .get(getAllTypes);

export default typesRouter;

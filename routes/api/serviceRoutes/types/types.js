import express from "express";
import {
    getAllTypes,
    getType
} from "../../../../controllers/service_types/service_typesController.js";

const typesRouter = express.Router();

typesRouter
    .route("/")
    .get(getAllTypes);
typesRouter
    .route("type_name/:type_name")
    .get(getType);

export default typesRouter;

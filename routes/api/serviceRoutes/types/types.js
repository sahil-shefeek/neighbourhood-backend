import express from "express";
import {
    getAllTypes
} from "../../../../controllers/service_types/service_typesController.js";

const typesRouter = express.Router();

typesRouter
    .route("/")
    .get(getAllTypes);

export default typesRouter;

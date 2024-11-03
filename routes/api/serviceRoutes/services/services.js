import express from "express";
import {
    getAllServices,
    getService,
    addService,
    updateService,
    replaceService,
    deleteService,
    getServicebyType,
} from "../../../../controllers/services/serviceController.js";
import typesRouter  from "../types/types.js";
import imageRouter from "../images/images.js";
import commentsRouter from "../comments/comments.js";
import saleRouter from "../sales/sales.js";

const serviceRouter = express.Router();

serviceRouter.use("/type",typesRouter);
serviceRouter.use("/image",imageRouter);
serviceRouter.use("/comment",commentsRouter);
serviceRouter.use("/sales",saleRouter);

serviceRouter
    .route("/")
    .get(getAllServices)
    .post(addService);
serviceRouter
    .route("/id/:id")
    .get(getService)
    .delete(deleteService)
    .put(replaceService)
    .patch(updateService)
    
serviceRouter
    .route("/name/:name")
    .get(getService);
serviceRouter
    .route("/type/:type")
    .get(getServicebyType);

export default serviceRouter;
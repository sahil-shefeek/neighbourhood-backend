import express from "express";
import userRouter from "./users/users.js";
import authRouter from "./auth/auth.js";
import verifyJWT from "../../middleware/auth/verifyJWT.js";
import productRouter from "./productRoutes/products/products.js";
import serviceRouter from "./serviceRoutes/services/services.js";

export const apiRouter = express.Router();

apiRouter.use("/auth", authRouter);
apiRouter.use("/users", userRouter);
apiRouter.use(verifyJWT);
apiRouter.use("/products",productRouter);
apiRouter.use("/services",serviceRouter);
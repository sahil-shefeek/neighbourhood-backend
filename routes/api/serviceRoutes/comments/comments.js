import express from "express";
import {
    getComment,
    addComment,
    deleteComment,
} from "../../../../controllers/product_comments/product_commentsController.js";

const commentsRouter = express.Router();

commentsRouter
    .route("/")
    .post(addComment);
commentsRouter
    .route("/comment_id/:comment_id")
    .get(getComment)
    .delete(deleteComment)
    
commentsRouter
    .route("/product_id/:product_id")
    .get(getComment);
commentsRouter
    .route("/posted_by/:posted_by")
    .get(getComment);


export default commentsRouter;
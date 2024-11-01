import express from "express";
import {
    getComment,
    addComment,
    deleteComment,
} from "../../../../controllers/service_comments/service_commentsController.js";

const commentsRouter = express.Router();

commentsRouter
    .route("/")
    .post(addComment);
commentsRouter
    .route("/comment_id/:comment_id")
    .get(getComment)
    .delete(deleteComment)
    
commentsRouter
    .route("/service_id/:service_id")
    .get(getComment);
commentsRouter
    .route("/posted_by/:posted_by")
    .get(getComment);


export default commentsRouter;
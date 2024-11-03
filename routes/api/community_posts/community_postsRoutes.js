import express from "express";
import {
    getAllPosts,
    getPost,
    addPost,
    updatePost,
    deletePost
} from "../../../controllers/community_posts/community_postsController.js";

const postsRouter = express.Router();

postsRouter
    .route("/")
    .get(getAllPosts)
    .post(addPost)
postsRouter
    .route("/post_id/:post_id")
    .get(getPost)
    .delete(deletePost)
    .patch(updatePost)

postsRouter
    .route("/posted_by/:posted_by")
    .get(getPost);


export default postsRouter;
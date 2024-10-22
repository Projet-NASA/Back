import { Router } from "express";
import rateLimit from "express-rate-limit";

import {
  createPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
} from "../Controller/postController";
import { getPostById } from "../middleware/postMiddleWare";

const routerPost = Router();

// Set up rate limiter: maximum of 100 requests per 15 minutes
const createPostLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

routerPost.post("/createPost", createPostLimiter, createPost);
routerPost.get("/Post", getPosts);
routerPost.get("/OnePost/:id", getPost);
routerPost.get("/PostById/:id", getPostById);
routerPost.delete("/Post/:id", deletePost);
routerPost.put("/Post/:id", updatePost);

export default routerPost;

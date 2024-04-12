import { Router } from "express";

import {
  createPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
} from "../Controller/postController";
import { getPostById } from "../middleware/postMiddleWare";

const routerPost = Router();

routerPost.post("/createPost", createPost);
routerPost.get("/Post", getPosts);
routerPost.get("/OnePost/:id", getPost);
routerPost.get("/PostById/:id", getPostById);
routerPost.delete("/Post/:id", deletePost);
routerPost.put("/Post/:id", updatePost);

export default routerPost;

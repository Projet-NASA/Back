import { Router } from "express";

import {
  createComment,
  deleteComment,
  getComment,
  getComments,
  getCommentsByPost,
  getCommentsByUser,
  updateComment,
} from "../Controller/commentController";

const routerComment = Router();

routerComment.post("/createComment", createComment);
routerComment.get("/Comment", getComments);
routerComment.get("/OneComment/:id", getComment);
routerComment.put("/Comment/:id", updateComment);
routerComment.delete("/Comment/:id", deleteComment);
routerComment.get("/CommentByPostId/:id", getCommentsByPost);
routerComment.get("/CommentByUser/:id", getCommentsByUser);

export default routerComment;

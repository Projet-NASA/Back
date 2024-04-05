import { Router } from "express";

import {
  createLike,
  deleteLike,
  findLikeByPostAndUserId,
  getLike,
  getLikeByPostId,
  getLikes,
  getLikesByUser,
} from "../Controller/likeController";

const routerLike = Router();

routerLike.post("/createLike", createLike);
routerLike.get("/Like", getLikes);
routerLike.get("/OneLike/:id", getLike);
routerLike.get("/LikeByPostId/:id", getLikeByPostId);
routerLike.delete("/Like/:id", deleteLike);
routerLike.get("/LikeByUser/:id", getLikesByUser);
routerLike.get(
  "/findLikeByPostAndUserId/:postId/:userId",
  findLikeByPostAndUserId,
);

export default routerLike;

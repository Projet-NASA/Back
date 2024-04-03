import { Router } from "express";

import {
  createLike,
  deleteLike,
  getLike,
  getLikeByPostId,
  getLikes,
  getLikesByUser,
  updateLike,
} from "../Controller/likeController";

const routerLike = Router();

routerLike.post("/createLike", createLike);
routerLike.get("/Like", getLikes);
routerLike.get("/OneLike/:id", getLike);
routerLike.put("/Like/:id", updateLike);
routerLike.get("/LikeByPostId/:id", getLikeByPostId);
routerLike.delete("/Like/:id", deleteLike);
routerLike.get("/LikeByUser/:id", getLikesByUser);

export default routerLike;

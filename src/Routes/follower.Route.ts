import { Router } from "express";

import {
  createFollower,
  deleteFollower,
  getFollower,
  getFollowers,
  updateFollower,
} from "../Controller/followerController";

const routerFollower = Router();

routerFollower.post("/createFollower", createFollower);
routerFollower.get("/Follower", getFollowers);
routerFollower.get("/OneFollower/:id", getFollower);
routerFollower.put("/Follower/:id", updateFollower);
routerFollower.delete("/Follower/:following/:follower", deleteFollower);

export default routerFollower;

import { Router } from "express";
import {
  createUser,
  deleteUser,
  forgotPassword,
  getUser,
  getUsers,
  loginUser,
  logoutUser,
  newGetUserSessions,
  resetPassword,
  updateUser,
} from "../Controller/userController";
import { getUserIdFromSession } from "../middleware/userMiddleWare";

const routerUser = Router();

routerUser.post("/User", createUser);
routerUser.get("/User", getUsers);
routerUser.get("/OneUser/:id", getUser);
routerUser.put("/User/:id", updateUser);
routerUser.delete("/User/:id", deleteUser);
routerUser.post("/loginUser", loginUser);
routerUser.get("/Session", newGetUserSessions);
routerUser.post("/logoutUser", logoutUser);
routerUser.post("/forgotPassword", forgotPassword);
routerUser.put("/resetPassword", resetPassword);
routerUser.get("/getUserIdFromSession/:sessionId", getUserIdFromSession);

export default routerUser;

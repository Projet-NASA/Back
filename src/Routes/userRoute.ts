import { Router } from "express";
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
  forgotPassword,
  resetPassword,
  logoutUser,
  loginUser,
  newGetUserSessions,
} from "../Controller/userController";


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
routerUser.post("/resetPassword", resetPassword);

export default routerUser;

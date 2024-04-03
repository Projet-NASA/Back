import { Router } from "express";
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../Controller/userController";

import {
  getUserSessions,
  loginUser,
  logoutUser,
} from "../middleware/userMiddleWare";

const routerUser = Router();

routerUser.post("/User", createUser);
routerUser.get("/User", getUsers);
routerUser.get("/OneUser/:id", getUser);
routerUser.put("/User/:id", updateUser);
routerUser.delete("/User/:id", deleteUser);
routerUser.post("/loginUser", loginUser);
routerUser.get("/User/:id/sessions", getUserSessions);
routerUser.post("/logoutUser", logoutUser);

export default routerUser;

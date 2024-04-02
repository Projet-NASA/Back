import { Router } from "express";
import {
  deleteUser,
  getSessionUser,
  getUser,
  getUsers,
  updateUser,
} from "../Controller/userController";

import { loginUser } from "../middleware/userMiddleWare";

const routerUser = Router();

routerUser.get("/User", getUsers);
routerUser.get("/OneUser/:id", getUser);
routerUser.put("/User/:id", updateUser);
routerUser.delete("/User/:id", deleteUser);
routerUser.post("/loginUser", loginUser);
routerUser.get("/sessionUser", getSessionUser);

export default routerUser;

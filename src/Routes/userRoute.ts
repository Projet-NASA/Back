import { Router } from "express";
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../Controller/userController";
import { loginUser } from "../middleware/userMiddleWare";

const routerUser = Router();

routerUser.post("/createUser", createUser);
routerUser.get("/User", getUsers);
routerUser.get("/OneUser/:id", getUser);
routerUser.put("/User/:id", updateUser);
routerUser.delete("/User/:id", deleteUser);
routerUser.post("/loginUser", loginUser);

export default routerUser;

import { Router } from "express";
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../Controller/userController";

const routerUser = Router();

routerUser.post("/User", createUser);
routerUser.get("/User", getUsers);
routerUser.get("/OneUser/:id", getUser);
routerUser.put("/User/:id", updateUser);
routerUser.delete("/User/:id", deleteUser);

export default routerUser;

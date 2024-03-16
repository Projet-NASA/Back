import { Router } from "express";
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../Controller/userController";

const routerUser = Router();

routerUser.post("/createUser", createUser);
routerUser.get("/getUsers", getUsers);
routerUser.get("/getUser/:id", getUser);
routerUser.put("/updateUser/:id", updateUser);
routerUser.delete("/deleteUser/:id", deleteUser);

export default routerUser;

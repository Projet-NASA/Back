import { Router } from "express";
import rateLimit from "express-rate-limit";
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

const loginRateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 5, // limit each IP to 5 requests per windowMs
  message: "Too many login attempts from this IP, please try again after a minute"
});

routerUser.post("/User", createUser);
routerUser.get("/User", getUsers);
routerUser.get("/OneUser/:id", getUser);
routerUser.put("/User/:id", updateUser);
routerUser.delete("/User/:id", deleteUser);
routerUser.post("/loginUser", loginRateLimiter, loginUser);
routerUser.get("/Session", newGetUserSessions);
routerUser.post("/logoutUser", logoutUser);
routerUser.post("/forgotPassword", forgotPassword);
routerUser.put("/resetPassword", resetPassword);
routerUser.get("/getUserIdFromSession/:sessionId", getUserIdFromSession);

export default routerUser;

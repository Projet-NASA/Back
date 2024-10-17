import { Request, Response } from "express";
import {
  createUser as createUserFromMiddleware,
  deleteUser as deleteUserFromMiddleware,
  forgotPassword as forgotPasswordFromMiddleware,
  newGetUserSessions as getSessionUserFromMiddlewarre,
  getUser as getUserFromMiddleware,
  getUserIdFromSession as getUserIdFromSessionFromMiddleware,
  getUsers as getUsersFromMiddleware,
  loginUser as loginUserFromMiddleware,
  logoutUser as logoutUserFromMiddleware,
  newGetUserSessions as newGetUserSessionsFromMiddleware,
  resetPassword as resetPasswordFromMiddleware,
  updateUser as updateUserFromMiddleware,
} from "../middleware/userMiddleWare";

export const createUser = async (req: Request, res: Response) => {
  await createUserFromMiddleware(req, res);
};

export const getUsers = async (req: Request, res: Response) => {
  await getUsersFromMiddleware(req, res);
};

export const getUser = async (req: Request, res: Response) => {
  await getUserFromMiddleware(req, res);
};

export const updateUser = async (req: Request, res: Response) => {
  await updateUserFromMiddleware(req, res);
};

export const deleteUser = async (req: Request, res: Response) => {
  await deleteUserFromMiddleware(req, res);
};

export const getUserSessionsController = async (
  req: Request,
  res: Response,
) => {
  await getSessionUserFromMiddlewarre(req, res);
};

export const logoutUser = async (req: Request, res: Response) => {
  await logoutUserFromMiddleware(req, res);
};

export const forgotPassword = async (req: Request, res: Response) => {
  await forgotPasswordFromMiddleware(req, res);
};

export const resetPassword = async (req: Request, res: Response) => {
  await resetPasswordFromMiddleware(req, res);
};

export const loginUser = async (req: Request, res: Response) => {
  await loginUserFromMiddleware(req, res);
};

export const newGetUserSessions = async (req: Request, res: Response) => {
  await newGetUserSessionsFromMiddleware(req, res);
};

export const getUserIdFromSession = async (req: Request, res: Response) => {
  await getUserIdFromSessionFromMiddleware(req, res);
};

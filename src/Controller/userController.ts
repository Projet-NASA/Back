import { Request, Response } from "express";
import {
  createUser as createUserFromMiddleware,
  deleteUser as deleteUserFromMiddleware,
  newGetUserSessions as getSessionUserFromMiddlewarre,
  getUser as getUserFromMiddleware,
  getUsers as getUsersFromMiddleware,
  logoutUser as logoutUserFromMiddleware,
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

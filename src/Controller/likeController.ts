import { Request, Response } from "express";

import {
  createLike as createLikeFromMiddleware,
  deleteLike as deleteLikeFromMiddleware,
  getLike as getLikeFromMiddleware,
  getLikesByUser as getLikesByUserFromMiddleware,
  getLikes as getLikesFromMiddleware,
  updateLike as updateLikeFromMiddleware,
} from "../middleware/likeMiddleWare";

export const createLike = async (req: Request, res: Response) => {
  await createLikeFromMiddleware(req, res);
};

export const getLikes = async (req: Request, res: Response) => {
  await getLikesFromMiddleware(req, res);
};

export const getLike = async (req: Request, res: Response) => {
  await getLikeFromMiddleware(req, res);
};

export const updateLike = async (req: Request, res: Response) => {
  await updateLikeFromMiddleware(req, res);
};

export const deleteLike = async (req: Request, res: Response) => {
  await deleteLikeFromMiddleware(req, res);
};

export const getLikesByUser = async (req: Request, res: Response) => {
  await getLikesByUserFromMiddleware(req, res);
};

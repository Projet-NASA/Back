import { Request, Response } from "express";

import {
  createFollower as createFollowerFromMiddleware,
  deleteFollower as deleteFollowerFromMiddleware,
  getFollower as getFollowerFromMiddleware,
  getFollowers as getFollowersFromMiddleware,
  updateFollower as updateFollowerFromMiddleware,
} from "../middleware/followerMiddleWare";

export const createFollower = async (req: Request, res: Response) => {
  await createFollowerFromMiddleware(req, res);
};

export const getFollowers = async (req: Request, res: Response) => {
  await getFollowersFromMiddleware(req, res);
};

export const getFollower = async (req: Request, res: Response) => {
  await getFollowerFromMiddleware(req, res);
};

export const updateFollower = async (req: Request, res: Response) => {
  await updateFollowerFromMiddleware(req, res);
};

export const deleteFollower = async (req: Request, res: Response) => {
  await deleteFollowerFromMiddleware(req, res);
};


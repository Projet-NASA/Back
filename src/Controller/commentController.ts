import { Request, Response } from "express";

import {
  createComment as createCommentFromMiddleware,
  deleteComment as deleteCommentFromMiddleware,
  getComment as getCommentFromMiddleware,
  getComments as getCommentsFromMiddleware,
  updateComment as updateCommentFromMiddleware,
} from "../middleware/commentMiddleWare";


export const createComment = async (req: Request, res: Response) => {
  await createCommentFromMiddleware(req, res);
};

export const getComments = async (req: Request, res: Response) => {
  await getCommentsFromMiddleware(req, res);
};

export const getComment = async (req: Request, res: Response) => {
  await getCommentFromMiddleware(req, res);
};

export const updateComment = async (req: Request, res: Response) => {
  await updateCommentFromMiddleware(req, res);
};

export const deleteComment = async (req: Request, res: Response) => {
  await deleteCommentFromMiddleware(req, res);
};


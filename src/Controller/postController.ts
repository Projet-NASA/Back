import { Request, Response } from "express";

import {
  createPost as createPostFromMiddleware,
  deletePost as deletePostFromMiddleware,
  getPost as getPostFromMiddleware,
  getPosts as getPostsFromMiddleware,
  updatePost as updatePostFromMiddleware,
} from "../middleware/postMiddleWare";

export const createPost = async (req: Request, res: Response) => {
  await createPostFromMiddleware(req, res);
};

export const getPosts = async (req: Request, res: Response) => {
  await getPostsFromMiddleware(req, res);
};

export const getPost = async (req: Request, res: Response) => {
  await getPostFromMiddleware(req, res);
};

export const updatePost = async (req: Request, res: Response) => {
  await updatePostFromMiddleware(req, res);
};

export const deletePost = async (req: Request, res: Response) => {
  await deletePostFromMiddleware(req, res);
};

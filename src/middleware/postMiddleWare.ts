import { Request, Response } from "express";
import prisma from "../prisma";

export const createPost = async (req: Request, res: Response) => {
  const { title, message, userId } = req.body;
  try {
    const post = await prisma.post.create({
      data: {
        title,
        message,
        userId,
      },
    });
    res.status(200).json({ message: "Post added successfully", post });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await prisma.post.findMany({
      include: {
        user: true,
        comments: true,
        userliked: true,
      },
    });
    for (const post of posts) {
      const likesCount = await prisma.like.count({
        where: { postId: post.id },
      });
      await prisma.post.update({
        where: { id: post.id },
        data: { like: likesCount },
      });
    }
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const getPost = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        user: true,
        comments: {
          include: {
            user: true,
          },
        },
        userliked: true,
      },
    });

    if (post) {
      const likesCount = await prisma.like.count({
        where: { postId: id },
      });
      await prisma.post.update({
        where: { id },
        data: { like: likesCount },
      });

      res.status(200).json(post);
    } else {
      res.status(404).json({ error: "Post not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const updatePost = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, message } = req.body;
  try {
    const updatedPost = await prisma.post.update({
      where: {
        id: id,
      },
      data: {
        title,
        message,
      },
    });
    res.status(200).json({ message: "Post updated successfully", updatedPost });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.post.delete({
      where: {
        id: id,
      },
    });
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

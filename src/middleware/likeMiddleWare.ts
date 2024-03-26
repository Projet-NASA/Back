import { Request, Response } from "express";
import prisma from "../prisma";

export const createLike = async (req: Request, res: Response) => {
  const { postId, userId } = req.body;

  try {
    await prisma.like.create({
      data: {
        postId,
        userId,
      },
    });
    const likesCount = await prisma.like.count({
      where: { postId },
    });
    await prisma.post.update({
      where: { id: postId },
      data: { like: likesCount },
    });
    res.status(200).json({ message: "Like added successfully" });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const getLikes = async (req: Request, res: Response) => {
  try {
    const likes = await prisma.like.findMany();
    res.status(200).json(likes);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const getLike = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const like = await prisma.like.findUnique({
      where: {
        id: id,
      },
    });
    res.status(200).json(like);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const updateLike = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { userId, postId } = req.body;
  try {
    const updatedLike = await prisma.like.update({
      where: {
        id: id,
      },
      data: {
        userId,
        postId,
      },
    });
    res.status(200).json({ message: "Like updated successfully", updatedLike });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const deleteLike = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.like.delete({
      where: {
        id: id,
      },
    });
    res.status(200).json({ message: "Like deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const getLikesByUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const likes = await prisma.like.findMany({
      where: {
        userId: userId,
      },
    });
    res.status(200).json(likes);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

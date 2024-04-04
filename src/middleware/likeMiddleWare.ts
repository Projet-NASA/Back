import { Request, Response } from "express";
import prisma from "../prisma";

export const createLike = async (req: Request, res: Response): Promise<void> => {
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
    console.error("Error creating like:", error);
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


export const getLikeByPostId = async (req: Request, res: Response) => {
  const { postId } = req.params;
  try {
    const like = await prisma.like.findFirst({
      where: {
        postId: postId,
      },
    });
    res.status(200).json(like);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const deleteLike = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const like = await prisma.like.findUnique({
      where: { id },
      select: { postId: true }     
    });

    if (!like) {
      res.status(404).json({ message: "Like not found" });
      return;
    }

    await prisma.post.update({
      where: { id: like.postId },
      data: { like: { decrement: 1 } },
    });

    await prisma.like.delete({
      where: { id },
    });

    res.status(200).json({ message: "Like deleted successfully" });
  } catch (error) {
    console.error("Error deleting like:", error);
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

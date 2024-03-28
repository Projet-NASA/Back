import { Request, Response } from "express";
import prisma from "../prisma";

export const createFollower = async (req: Request, res: Response) => {
  const { followingId, followerId } = req.body;

  try {
    const follower = await prisma.follower.create({
      data: {
        followingId,
        followerId,
      },
    });
    res.status(200).json({ message: "Follower added successfully", follower });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const getFollowers = async (req: Request, res: Response) => {
  try {
    const followers = await prisma.follower.findMany();
    res.status(200).json(followers);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const getFollower = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const follower = await prisma.follower.findUnique({
      where: {
        id: id,
      },
    });
    res.status(200).json(follower);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const updateFollower = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { followingId, followerId } = req.body;
  try {
    const updatedFollower = await prisma.follower.update({
      where: {
        id: id,
      },
      data: {
        followingId,
        followerId,
      },
    });
    res
      .status(200)
      .json({ message: "Follower updated successfully", updatedFollower });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const deleteFollower = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.follower.delete({
      where: {
        id: id,
      },
    });
    res.status(200).json({ message: "Follower deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

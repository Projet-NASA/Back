import { Request, Response } from "express";
import prisma from "../prisma";
const fs = require("fs");
const path = require("path");

export const createComment = async (req: Request, res: Response) => {
  const { message, userId, postId } = req.body;
  const bannedWordsFilePath = path.join(__dirname, "../Data/wordsBlacklist.csv");
  const bannedWords = fs
    .readFileSync(bannedWordsFilePath, "utf-8")
    .split(",")
    .map((word: string) => word.trim().toLowerCase())
    .filter((word: any) => word);
  const containsBannedWord = bannedWords.some((word: any) => {
    const wordIsInMessage = message.toLowerCase().includes(word);
    console.log(`Checking word "${word}". Is in message: ${wordIsInMessage}`);
    return wordIsInMessage;
  });
  try {
    if (containsBannedWord) {
      return res
        .status(400)
        .json({ error: "Your message contains inappropriate words" });
    }
    const comment = await prisma.comment.create({
      data: {
        message,
        userId,
        postId,
      },
    });
    res.status(200).json({ message: "Comment added successfully", comment });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const getComments = async (req: Request, res: Response) => {
  try {
    const comments = await prisma.comment.findMany();
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const getComment = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const comment = await prisma.comment.findUnique({
      where: {
        id: id,
      },
    });
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const updateComment = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { message } = req.body;
  try {
    const updatedComment = await prisma.comment.update({
      where: {
        id: id,
      },
      data: {
        message,
      },
    });
    res
      .status(200)
      .json({ message: "Comment updated successfully", updatedComment });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const deleteComment = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.comment.delete({
      where: {
        id: id,
      },
    });
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const getCommentsByUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const comments = await prisma.comment.findMany({
      where: {
        userId: userId,
      },
    });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const getCommentsByPost = async (req: Request, res: Response) => {
  const { postId } = req.params;
  try {
    const comments = await prisma.comment.findMany({
      where: {
        postId: postId,
      },
      include: {
        user: true,
      }
    });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

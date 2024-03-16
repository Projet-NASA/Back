import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { userTestMiddleWare } from "../middleware/testMiddleWare";

export const getHello = (req: Request, res: Response) => {
  res.status(200).json({ message: "Hello World!" });
};
const prisma = new PrismaClient();

export const userTest = async (req: Request, res: Response) => {
  await userTestMiddleWare(req, res);
};

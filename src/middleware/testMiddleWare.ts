import { Request, Response } from "express";
import prisma from "../prisma";

export const userTestMiddleWare = async (req: Request, res: Response) => {
  const { firstName, email } = req.body;
  try {
    const user = await prisma.user.create({
      data: {
        firstName,
        email,
      },
    });
    res.status(200).json({ message: "User added successfully" });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

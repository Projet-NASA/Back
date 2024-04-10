import { Request, Response } from "express";
import prisma from "../prisma";

export const createExperience = async (req: Request, res: Response) => {
  let { title, company, location, from, to, type, description, userId } =
    req.body;

  from = from ? new Date(from).toISOString() : from;
  to = to ? new Date(to).toISOString() : to;

  try {
    const experience = await prisma.experience.create({
      data: {
        title,
        company,
        location,
        from,
        to,
        type,
        description,
        userId,
      },
    });
    res
      .status(200)
      .json({ message: "Experience added successfully", experience });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const getExperiences = async (req: Request, res: Response) => {
  try {
    const sessionId = Array.isArray(req.headers.sessionId)
      ? req.headers.sessionId[0]
      : req.headers.sessionId;
    if (!sessionId) {
      res
        .status(400)
        .json({ error: "No session ID provided experience middlewar" });
      return;
    }

    const session = await prisma.session.findUnique({
      where: { id: sessionId },
    });

    if (!session) {
      res.status(404).json({ error: "Session not found" });
      return;
    }

    const experiences = await prisma.experience.findMany({
      where: { userId: session.userId },
    });

    res.status(200).json(experiences);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const getExperience = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const experience = await prisma.experience.findUnique({
      where: {
        id: id,
      },
    });
    res.status(200).json(experience);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const updateExperience = async (req: Request, res: Response) => {
  const { id } = req.params;
  let { title, company, location, type, from, to, description } = req.body;
  from = from ? new Date(from).toISOString() : from;
  to = to ? new Date(to).toISOString() : to;
  try {
    const updatedExperience = await prisma.experience.update({
      where: {
        id: id,
      },
      data: {
        title,
        company,
        location,
        type,
        from,
        to,
        description,
      },
    });
    res
      .status(200)
      .json({ message: "Experience updated successfully", updatedExperience });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const deleteExperience = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.experience.delete({
      where: {
        id: id,
      },
    });
    res.status(200).json({ message: "Experience deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const getAllexperiencesByUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const experiences = await prisma.experience.findMany({
      where: {
        userId: userId,
      },
    });
    res.status(200).json(experiences);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

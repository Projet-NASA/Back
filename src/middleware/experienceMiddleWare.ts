import { Request, Response } from "express";
import prisma from "../prisma";

export const createExperience = async (req: Request, res: Response) => {
  const {
    title,
    company,
    location,
    from,
    to,
    current,
    type,
    description,
    userId,
  } = req.body;

  try {
    const experience = await prisma.experience.create({
      data: {
        title,
        company,
        location,
        from,
        to,
        current,
        type,
        description,
        userId,
      },
    });
    res
      .status(200)
      .json({ message: "Experience added successfully", experience });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const getExperiences = async (req: Request, res: Response) => {
  try {
    const experiences = await prisma.experience.findMany();
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
  const { title, company, location, type, from, to, description, current } =
    req.body;
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
        current,
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

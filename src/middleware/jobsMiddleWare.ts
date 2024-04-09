import { Request, Response } from "express";
import prisma from "../prisma";

export const createJob = async (req: Request, res: Response) => {
  let { title, company, location, type, from, description, userId } = req.body;
  from = from ? new Date(from).toISOString() : from;
  try {
    const job = await prisma.jobs.create({
      data: {
        title,
        company,
        location,
        type,
        from,
        description,
        userId,
      },
    });
    res.status(200).json({ message: "Job added successfully", job });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const getJobs = async (req: Request, res: Response) => {
  try {
    const jobs = await prisma.jobs.findMany();
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const getJob = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const job = await prisma.jobs.findUnique({
      where: {
        id: id,
      },
    });
    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const updateJob = async (req: Request, res: Response) => {
  const { id } = req.params;
  let { title, company, location, type, from, description } = req.body;
  from = from ? new Date(from).toISOString() : from;
  try {
    const updatedJob = await prisma.jobs.update({
      where: {
        id: id,
      },
      data: {
        title,
        company,
        location,
        type,
        from,
        description,
      },
    });
    res.status(200).json({ message: "Job updated successfully", updatedJob });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const deleteJob = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.jobs.delete({
      where: {
        id: id,
      },
    });
    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const getAllJobsByUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const jobs = await prisma.jobs.findMany({
      where: {
        userId: userId,
      },
    });
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

import { Request, Response } from "express";

import {
  createExperience as createExperienceFromMiddleware,
  deleteExperience as deleteExperienceFromMiddleware,
  getAllexperiencesByUser as getAllexperiencesByUserFromMiddleware,
  getExperience as getExperienceFromMiddleware,
  getExperiences as getExperiencesFromMiddleware,
  updateExperience as updateExperienceFromMiddleware,
} from "../middleware/experienceMiddleWare";

export const createExperience = async (req: Request, res: Response) => {
  await createExperienceFromMiddleware(req, res);
};

export const getExperiences = async (req: Request, res: Response) => {
  await getExperiencesFromMiddleware(req, res);
};

export const getExperience = async (req: Request, res: Response) => {
  await getExperienceFromMiddleware(req, res);
};

export const updateExperience = async (req: Request, res: Response) => {
  await updateExperienceFromMiddleware(req, res);
};

export const deleteExperience = async (req: Request, res: Response) => {
  await deleteExperienceFromMiddleware(req, res);
};

export const getAllexperiencesByUser = async (req: Request, res: Response) => {
  await getAllexperiencesByUserFromMiddleware(req, res);
};

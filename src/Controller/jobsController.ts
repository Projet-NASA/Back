import {Request, Response} from "express";

import {
  createJob as createJobFromMiddleware,
  deleteJob as deleteJobFromMiddleware,
  getJob as getJobFromMiddleware,
  getJobs as getJobsFromMiddleware,
  updateJob as updateJobFromMiddleware,
} from "../middleware/jobsMiddleWare";


export const createJob = async (req: Request, res: Response) => {
  await createJobFromMiddleware(req, res);
};

export const getJobs = async (req: Request, res: Response) => {
  await getJobsFromMiddleware(req, res);
};

export const getJob = async (req: Request, res: Response) => {
  await getJobFromMiddleware(req, res);
};

export const updateJob = async (req: Request, res: Response) => {
  await updateJobFromMiddleware(req, res);
};

export const deleteJob = async (req: Request, res: Response) => {
  await deleteJobFromMiddleware(req, res);
};

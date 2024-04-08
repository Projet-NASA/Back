import { Router } from "express";

import {
  createJob,
  deleteJob,
  getJob,
  getJobs,
  updateJob,
  getAllJobsByUser
} from "../Controller/jobsController";

const routerJob = Router();

routerJob.post("/createJob", createJob);
routerJob.get("/Job", getJobs);
routerJob.get("/OneJob/:id", getJob);
routerJob.put("/Job/:id", updateJob);
routerJob.delete("/Job/:id", deleteJob);
routerJob.get("/AllJobsByUser/:id", getAllJobsByUser);

export default routerJob;

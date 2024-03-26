import { Router } from "express";

import {
  createExperience,
  deleteExperience,
  getExperience,
  getExperiences,
  updateExperience,
} from "../Controller/experienceController";

const routerExperience = Router();

routerExperience.post("/createExperience", createExperience);
routerExperience.get("/Experience", getExperiences);
routerExperience.get("/OneExperience/:id", getExperience);
routerExperience.put("/Experience/:id", updateExperience);
routerExperience.delete("/Experience/:id", deleteExperience);

export default routerExperience;

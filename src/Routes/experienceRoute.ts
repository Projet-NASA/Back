import { Router } from "express";

import {
  createExperience,
  deleteExperience,
  getAllexperiencesByUser,
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
routerExperience.get("/ExperienceByUser/:id", getAllexperiencesByUser);

export default routerExperience;

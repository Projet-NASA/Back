import { Session } from "@prisma/client";
import "express";

declare module "express" {
  export interface Request {
    session?: Session;
  }
}

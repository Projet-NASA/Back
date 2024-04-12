import { NextFunction, Request, Response } from "express";
import prisma from "../prisma";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const sessionId = Array.isArray(req.headers["x-session-id"])
    ? req.headers["x-session-id"][0]
    : req.headers["x-session-id"];

  if (!sessionId) {
    return res.status(401).json({ error: "authentification requise" });
  }

  if (!sessionId) {
    return res.status(401).json({ error: "authentification requise" });
  }

  const session = await prisma.session.findUnique({
    where: {
      id: sessionId,
    },
  });

  if (!session) {
    return res.status(401).json({ error: "session non valide" });
  }

  req.session = session;

  next();
};

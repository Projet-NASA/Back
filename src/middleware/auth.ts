import { NextFunction, Request, Response } from "express";

export function redirectIfAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (req.cookies.token) {
    res.redirect("/dashboard");
  } else {
    next();
  }
}

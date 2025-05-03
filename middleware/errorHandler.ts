import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error("Error:", error.message);

  if (error.name === "SequelizeValidationError") {
    res.status(400).json({ error: error.message });
    return;
  }

  if (error.name === "SequelizeUniqueConstraintError") {
    res.status(400).json({ error: "Resource already exists" });
    return;
  }

  res.status(500).json({ error: "Something went wrong" });
  return;
};

import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { config } from "dotenv";
import { Session } from "../models/session";
import { User } from "../models/user";

config();

export interface AuthenticatedRequest extends Request {
  user?: string | JwtPayload;
}

export const authenticateRequests = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res
      .status(401)
      .json({ message: "Missing or malformed Authorization header" });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: number;
    };

    // Check if session exists and user is not disabled
    const session = await Session.findOne({
      where: { token },
      include: {
        model: User,
        attributes: ["disabled"],
      },
    });

    if (!session || session.user?.disabled) {
      res.status(401).json({ message: "Session expired or user disabled" });
      return;
    }

    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token" });
    return;
  }
};

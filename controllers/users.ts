import { Request, Response } from "express";
import { User } from "../models/user";

interface AuthenticatedRequest extends Request {
  user?: { id: number };
}

export const getUsers = async (req: Request, res: Response) => {
  const users = await User.findAll();
  res.json(users);
};

export const getUserById = async (req: AuthenticatedRequest, res: Response) => {
  const user = await User.findByPk(req.params.id);

  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  res.json(user);
};

export const updateName = async (req: AuthenticatedRequest, res: Response) => {
  const user = await User.findByPk(req.params.id);

  if (!user) {
    res.status(404).json("User not found");
    return;
  }

  if (user.id !== req.user?.id) {
    res.status(403).json("Unauthorized");
    return;
  }

  const { name } = req.body;

  if (!name) {
    res.status(400).json({ message: "Name is required" });
    return;
  }

  user.name = name;
  await user.save();
  res.json(user);
};

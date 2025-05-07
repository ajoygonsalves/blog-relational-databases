import { Request, Response } from "express";
import { User } from "../models/user";
import { Blog } from "../models/blog";
import { sequelize } from "../utils/db";

interface AuthenticatedRequest extends Request {
  user?: { id: number };
}

export const getUsers = async (req: Request, res: Response) => {
  // also show total number of blogs per user
  const users = await User.findAll({
    include: {
      model: Blog,
      as: "blogs",
    },
  });
  res.json(users);
};

export const getUserById = async (req: AuthenticatedRequest, res: Response) => {
  const user = await User.findByPk(req.params.id, {
    attributes: ["name", "email"],
    include: [
      {
        model: Blog,
        through: { attributes: [] }, // Exclude junction table attributes
        attributes: ["id", "url", "title", "author", "likes"],
      },
    ],
  });

  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  // Transform the response to match the required format
  const response = {
    name: user.name,
    username: user.email,
    readings: user.get("Blogs"),
  };

  res.json(response);
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

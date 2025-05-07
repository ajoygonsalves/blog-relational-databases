import { Request, Response } from "express";
import { ReadingList } from "../models/readingList";
import { User } from "../models/user";
import { Blog } from "../models/blog";

export const addToReadingList = async (req: Request, res: Response) => {
  const { userId, blogId } = req.body;

  if (!userId || !blogId) {
    res.status(400).json({ error: "userId and blogId are required" });
    return;
  }

  // Verify both user and blog exist
  const user = await User.findByPk(userId);
  const blog = await Blog.findByPk(blogId);

  if (!user || !blog) {
    res.status(404).json({ error: "User or blog not found" });
    return;
  }

  const readingList = await ReadingList.create({
    userId,
    blogId,
  });

  res.json(readingList);
};

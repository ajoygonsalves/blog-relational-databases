import { Request, Response } from "express";
import { ReadingList } from "../models/readingList";
import { User } from "../models/user";
import { Blog } from "../models/blog";

interface AuthenticatedRequest extends Request {
  user?: { id: number };
}

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

export const updateReadStatus = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  const { read } = req.body;
  const readingListId = req.params.id;

  if (typeof read !== "boolean") {
    res.status(400).json({ error: "read status must be a boolean" });
    return;
  }

  const readingList = await ReadingList.findByPk(readingListId);

  if (!readingList) {
    res.status(404).json({ error: "Reading list entry not found" });
    return;
  }

  // Check if the reading list entry belongs to the authenticated user
  if (readingList.userId !== req.user?.id) {
    res
      .status(403)
      .json({ error: "Unauthorized - can only update your own reading list" });
    return;
  }

  readingList.read = read;
  await readingList.save();

  res.json(readingList);
};

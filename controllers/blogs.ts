// controllers/blogs.ts

import { Blog } from "../models/blog";
import { Request, Response } from "express";
import { User } from "../models/user";
interface RequestWithBlog extends Request {
  blog?: Blog;
  user?: User;
}

export const getBlogs = async (req: Request, res: Response) => {
  const blogs = await Blog.findAll({
    include: {
      model: User,
      as: "user",
      attributes: ["name"],
    },
  });
  res.json(blogs);
};

export const getBlogById = async (req: RequestWithBlog, res: Response) => {
  const blog = req.blog;
  if (!blog) {
    res.status(404).json({ message: "Blog not found" });
    return;
  }
  res.json(blog);
};

export const createBlog = async (req: RequestWithBlog, res: Response) => {
  if (!req.body.author || !req.body.url || !req.body.title) {
    res.status(400).json({ message: "Author, url, and title are required" });
    return;
  }
  const user = req.user;
  if (!user) {
    res.status(401).json({ message: "User not found" });
    return;
  }
  const blog = await Blog.create({
    ...req.body,
    likes: 0,
    userId: user.id,
  });
  res.json(blog);
};

export const deleteBlog = async (req: RequestWithBlog, res: Response) => {
  const blog = req.blog;
  if (!blog) {
    res.status(404).json({ message: "Blog not found" });
    return;
  }

  const user = req.user;
  if (!user) {
    res.status(401).json({ message: "User not found" });
    return;
  }

  if (blog.dataValues.userId !== user.id) {
    res.status(403).json({ message: "Unauthorized" });
    return;
  }

  await Blog.destroy({ where: { id: blog.dataValues.id } });
  res.json({ message: "Blog deleted" });
};

export const updateBlogLikes = async (req: RequestWithBlog, res: Response) => {
  const blog = req.blog;
  if (!blog) {
    res.status(404).json({ message: "Blog not found" });
    return;
  }
  await blog.update({ likes: req.body.likes });
  res.json(blog);
};

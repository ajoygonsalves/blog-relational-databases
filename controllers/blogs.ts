// controllers/blogs.ts

import { Blog } from "../models/blog";
import { Request, Response } from "express";

interface RequestWithBlog extends Request {
  blog?: Blog;
}

export const getBlogs = async (req: Request, res: Response) => {
  const blogs = await Blog.findAll();
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

export const createBlog = async (req: Request, res: Response) => {
  const blog = await Blog.create(req.body);
  res.json(blog);
};

export const deleteBlog = async (req: RequestWithBlog, res: Response) => {
  const blog = req.blog;
  if (!blog) {
    res.status(404).json({ message: "Blog not found" });
    return;
  }
  await blog.destroy();
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

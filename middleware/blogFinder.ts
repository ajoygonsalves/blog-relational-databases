import { Request, Response, NextFunction } from "express";
import { Blog } from "../models/blog";

interface RequestWithBlog extends Request {
  blog?: Blog;
}

const blogFinder = async (
  req: RequestWithBlog,
  res: Response,
  next: NextFunction,
) => {
  req.blog = (await Blog.findByPk(req.params.id)) ?? undefined;
  next();
};

export default blogFinder;

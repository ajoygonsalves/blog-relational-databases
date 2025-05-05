import { Router } from "express";
import {
  getBlogs,
  getBlogById,
  createBlog,
  deleteBlog,
  updateBlogLikes,
} from "../controllers/blogs";
import blogFinder from "../middleware/blogFinder";

const blogRouter = Router();

blogRouter.get("/", getBlogs);
blogRouter.get("/:id", blogFinder, getBlogById);
blogRouter.post("/", createBlog);
blogRouter.delete("/:id", blogFinder, deleteBlog);
blogRouter.put("/:id/likes", blogFinder, updateBlogLikes);

export default blogRouter;

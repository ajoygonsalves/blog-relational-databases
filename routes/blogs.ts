import { Router } from "express";
import {
  getBlogs,
  getBlogById,
  createBlog,
  deleteBlog,
  updateBlogLikes,
} from "../controllers/blogs";
import blogFinder from "../middleware/blogFinder";
import { authenticateRequests } from "../middleware/authenticateRequests";

const blogRouter = Router();

blogRouter.get("/", getBlogs);
blogRouter.get("/:id", blogFinder, getBlogById);
blogRouter.post("/", authenticateRequests, createBlog);
blogRouter.delete("/:id", authenticateRequests, blogFinder, deleteBlog);
blogRouter.put("/:id/likes", authenticateRequests, blogFinder, updateBlogLikes);

export default blogRouter;

import { Router } from "express";
import {
  getBlogs,
  getBlogById,
  createBlog,
  deleteBlog,
  updateBlogLikes,
} from "../controllers/blogs";
import blogFinder from "../middleware/blogFinder";

const router = Router();

router.get("/", getBlogs);
router.get("/:id", blogFinder, getBlogById);
router.post("/", createBlog);
router.delete("/:id", blogFinder, deleteBlog);
router.put("/:id/likes", blogFinder, updateBlogLikes);

export default router;

import express, { Request, Response } from "express";
import { sequelize } from "./utils/db";
import { Blog } from "./models/blog";

const app = express();
app.use(express.json());

app.get("/api/blogs", async (req, res) => {
  const blogs = await Blog.findAll();
  res.json(blogs);
});

app.post("/api/blogs", async (req, res) => {
  console.log(req.body);
  const blog = await Blog.create(req.body);
  res.json(blog);
});

app.delete("/api/blogs/:id", async (req, res): Promise<any> => {
  const blog = await Blog.findByPk(req.params.id);
  if (!blog) {
    return res.status(404).json({ message: "Blog not found" });
  }
  await blog.destroy();
  res.json({ message: "Blog deleted" });
});

app.listen(3100, () => {
  console.log("Server is running on port 3100");
});

import express from "express";
import blogsRouter from "./routes/blogs";
import { PORT } from "./utils/config";
import { errorHandler } from "./middleware/errorHandler";

const app = express();
app.use(express.json());

app.use("/api/blogs", blogsRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

import express from "express";
import blogsRouter from "./routes/blogs";
import authRouter from "./routes/auth";
import { PORT } from "./utils/config";
import { errorHandler } from "./middleware/errorHandler";
import usersRouter from "./routes/users";

const app = express();
app.use(express.json());

app.use("/api/blogs", blogsRouter);
app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

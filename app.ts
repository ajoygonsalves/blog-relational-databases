import express from "express";
import blogsRouter from "./routes/blogs";
import authRouter from "./routes/auth";
import { PORT } from "./utils/config";
import { errorHandler } from "./middleware/errorHandler";
import usersRouter from "./routes/users";
import { sequelize } from "./utils/db";

const app = express();
app.use(express.json());

app.use("/api/blogs", blogsRouter);
app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);

app.use(errorHandler);
// Async startup block
const start = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection established ✅");

    await sequelize.sync(); // Call only once, after associations
    console.log("Models synchronized with the database ✅");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to start server:", error);
    process.exit(1); // Exit with failure
  }
};

start();

import dotenv from "dotenv";
import { QueryTypes } from "sequelize";
import { sequelize } from "./utils/db";
dotenv.config();

async function main() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    const blogs = await sequelize.query("SELECT * FROM blogs", {
      type: QueryTypes.SELECT,
    });

    // Print each blog
    blogs.forEach((blog: any) => {
      console.log(`${blog.author}: '${blog.title}', ${blog.likes} likes`);
    });

    sequelize.close();
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

main();

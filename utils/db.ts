import { Sequelize } from "sequelize";
import { DATABASE_URL } from "./config";

export const sequelize = new Sequelize(DATABASE_URL, {
  dialectOptions:
    process.env.NODE_ENV === "production"
      ? {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        }
      : {},
});

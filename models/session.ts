import { Model, DataTypes } from "sequelize";
import { sequelize } from "../utils/db";
import { User } from "./user";

export class Session extends Model {
  declare id: number;
  declare userId: number;
  declare token: string;
  declare createdAt: Date;
  declare user?: User;
}

Session.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "users", key: "id" },
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    updatedAt: false,
    modelName: "session",
  },
);

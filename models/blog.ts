import { DataTypes, Model } from "sequelize";
import { sequelize } from "../utils/db";

export class Blog extends Model {
  id!: number;
  author!: string;
  url!: string;
  title!: string;
  likes!: number;
  userId!: number;
}

Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    author: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "users", key: "id" },
    },
  },
  {
    sequelize,
    underscored: true,
    tableName: "blogs",
    modelName: "Blog",
    timestamps: false,
    defaultScope: {
      attributes: {
        exclude: ["userId", "id"],
      },
    },
  },
);

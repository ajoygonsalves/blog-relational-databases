import { DataTypes, Model } from "sequelize";
import { sequelize } from "../utils/db";

class User extends Model {
  declare id: number;
  declare email: string;
  declare name: string | null;
  declare passwordHash: string;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    underscored: true,
    tableName: "users",
    modelName: "User",
    timestamps: true,
    defaultScope: {
      attributes: {
        exclude: ["passwordHash", "createdAt", "updatedAt", "id"],
      },
    },
  },
);

export { User };

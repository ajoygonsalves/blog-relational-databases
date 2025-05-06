import { Request, Response } from "express";
import { sequelize } from "../utils/db";
import { QueryTypes } from "sequelize";

export const getAuthorStats = async (_req: Request, res: Response) => {
  const authors = await sequelize.query(
    `
    SELECT 
      author,
      COUNT(*) as articles,
      COALESCE(SUM(likes), 0) as likes
    FROM blogs
    GROUP BY author
    ORDER BY likes DESC
    `,
    {
      type: QueryTypes.SELECT,
    },
  );

  res.json(authors);
};

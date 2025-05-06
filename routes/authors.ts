import { Router } from "express";
import { getAuthorStats } from "../controllers/authors";

const authorsRouter = Router();

authorsRouter.get("/", getAuthorStats);

export default authorsRouter;

import { Router } from "express";
import { logIn, signUp } from "../controllers/auth";

const authRouter = Router();

authRouter.post("/sign-up", signUp);
authRouter.post("/login", logIn);

export default authRouter;

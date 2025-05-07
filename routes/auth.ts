import { Router } from "express";
import { logIn, signUp, logOut } from "../controllers/auth";
import { authenticateRequests } from "../middleware/authenticateRequests";

const authRouter = Router();

authRouter.post("/sign-up", signUp);
authRouter.post("/login", logIn);
authRouter.delete("/logout", authenticateRequests, logOut);

export default authRouter;

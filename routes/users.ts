import { Router } from "express";
import { getUsers, getUserById, updateName } from "../controllers/users";
import { authenticateRequests } from "../middleware/authenticateRequests";

const usersRouter = Router();

usersRouter.get("/", authenticateRequests, getUsers);
usersRouter.get("/id/:id", authenticateRequests, getUserById);
usersRouter.put("/id/:id", authenticateRequests, updateName);

export default usersRouter;

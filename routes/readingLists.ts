import { Router } from "express";
import { addToReadingList } from "../controllers/readingLists";
import { authenticateRequests } from "../middleware/authenticateRequests";

const readingListRouter = Router();

readingListRouter.post("/", authenticateRequests, addToReadingList);

export default readingListRouter;

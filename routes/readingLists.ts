import { Router } from "express";
import {
  addToReadingList,
  updateReadStatus,
} from "../controllers/readingLists";
import { authenticateRequests } from "../middleware/authenticateRequests";

const readingListRouter = Router();

readingListRouter.post("/", authenticateRequests, addToReadingList);
readingListRouter.put("/:id", authenticateRequests, updateReadStatus);

export default readingListRouter;

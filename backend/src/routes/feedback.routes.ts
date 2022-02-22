import * as express from "express";
import {getFeedbackList, deleteFeedback, getFeedbackCount, addFeedback} from "../controllers/feedback.controller";

export const feedbackRouter = express.Router();

feedbackRouter.get("/list/", getFeedbackList);
feedbackRouter.get("/count/", getFeedbackCount);
feedbackRouter.delete("/delete/:id", deleteFeedback);
feedbackRouter.post("/add/", addFeedback);
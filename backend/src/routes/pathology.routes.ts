import express from "express";
import {getPathologyList} from "../controllers";

export const pathologyRouter = express.Router();

pathologyRouter.get('/pathology/', getPathologyList);
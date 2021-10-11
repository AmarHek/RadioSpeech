import {verifyToken, isAdmin, isModerator} from "../middleware";
import {userBoard, moderatorBoard, adminBoard, allAccess} from "../controllers/user.controller";
import express from "express";

export const router = express.Router();

router.get("/test/all", allAccess);

router.get("/test/user", [verifyToken], userBoard);

router.get(
    "/test/mod",
    [verifyToken, isModerator],
    moderatorBoard
);

router.get(
    "/test/admin",
    [verifyToken, isAdmin],
    adminBoard
);


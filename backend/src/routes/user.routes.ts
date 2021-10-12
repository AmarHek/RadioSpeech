import {verifyToken, isAdmin, isModerator} from "../middleware";
import {userBoard, moderatorBoard, adminBoard, allAccess} from "../controllers/user.controller";
import express from "express";

export const router = express.Router();

router.get("/all", allAccess);

router.get("/user", [verifyToken], userBoard);

router.get(
    "/mod",
    [
        verifyToken,
        isModerator],
    moderatorBoard
);

router.get(
    "/admin",
    [
        verifyToken,
        isAdmin],
    adminBoard
);


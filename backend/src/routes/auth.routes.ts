import express from "express";
import {checkDuplicateUsername, checkRoleExists, isAdmin, verifyToken} from "../middleware";
import {signIn, signUp} from "../controllers/auth.controller";

export const router = express.Router();

router.post(
    "/signUp",
    [
        verifyToken,
        isAdmin,
        checkDuplicateUsername,
        checkRoleExists
    ],
    signUp
);

router.post("/signIn", signIn);

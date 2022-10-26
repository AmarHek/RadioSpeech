import express from "express";
import {verifyDuplicateUsername, verifyRoleExists, isAdmin, verifyToken} from "../middleware";
import {signIn, signUp} from "../controllers";

export const authRouter = express.Router();

authRouter.post(
    "/signUp",
    [
        verifyToken,
        isAdmin,
        verifyDuplicateUsername,
        verifyRoleExists
    ],
    signUp
);

authRouter.post("/signIn", signIn);

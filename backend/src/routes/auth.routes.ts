import express from "express";
import {checkDuplicateUsername, checkRoleExists, isAdmin, verifyToken} from "../middleware";
import {signIn, signUp} from "../controllers";

export const authRouter = express.Router();

authRouter.post(
    "/signUp",
    [
        verifyToken,
        isAdmin,
        checkDuplicateUsername,
        checkRoleExists
    ],
    signUp
);

authRouter.post("/signIn", signIn);

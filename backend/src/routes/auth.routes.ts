import express from "express";
import {checkDuplicateUsername, checkRoleExists} from "../middleware";
import {signIn, signUp} from "../controllers/auth.controller";

export const router = express.Router();

router.post(
    "/signUp",
    [
        checkDuplicateUsername,
        checkRoleExists
    ],
    signUp
);

router.post("/signIn", signIn);

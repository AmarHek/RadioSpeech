import {verifyToken, isAdmin, isModerator, checkDuplicateUsername, verifyPassword,} from "../middleware";
import {getUserById, deleteUserById, changeUsername, changePassword, getUsers} from "../controllers/user.controller";
import express from "express";

export const router = express.Router();

router.get(
    "",
    [
        verifyToken,
        isAdmin
    ],
    getUsers
)

router.get(
    "/:id",
    [
        verifyToken,
        isAdmin
    ],
    getUserById
)

router.delete(
    "/:id",
    [
        verifyToken,
        isAdmin
    ],
    deleteUserById
)

router.post(
    "/changeUsername/:id",
    [
        verifyToken,
        verifyPassword,
        checkDuplicateUsername
    ],
    changeUsername
)

router.post(
    "/changePassword/:id",
    [
        verifyToken,
        verifyPassword
    ],
    changePassword
)


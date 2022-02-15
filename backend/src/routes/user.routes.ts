import {verifyToken, isAdmin, checkDuplicateUsername, verifyPassword} from "../middleware";
import {getUserById, deleteUserById, changeUsername, changePassword, getUsers} from "../controllers";
import express from "express";

export const userRouter = express.Router();

userRouter.get(
    "/users",
    [
        verifyToken,
        isAdmin
    ],
    getUsers
)

userRouter.get(
    "/users/:id",
    [
        verifyToken,
        isAdmin
    ],
    getUserById
)

userRouter.delete(
    "/users/:id",
    [
        verifyToken,
        isAdmin
    ],
    deleteUserById
)

userRouter.post(
    "/users/changeUsername/:id",
    [
        verifyToken,
        verifyPassword,
        checkDuplicateUsername
    ],
    changeUsername
)

userRouter.post(
    "/users/changePassword/:id",
    [
        verifyToken,
        verifyPassword
    ],
    changePassword
)


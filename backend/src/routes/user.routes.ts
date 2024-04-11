import {verifyToken, isAdmin, verifyDuplicateUsername, verifyPassword, verifyRoleExists} from "../middleware";
import {getUserById, deleteUserById, changeUsername, changePassword, getUsers, changeRole} from "../controllers";
import express from "express";

export const userRouter = express.Router();

userRouter.get(
    "/users",
    [
        // verifyToken,
        // isAdmin
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
        verifyDuplicateUsername
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

userRouter.post(
    "/users/changeRole/:id",
    [
        verifyToken,
        verifyRoleExists,
    ],
    changeRole
)


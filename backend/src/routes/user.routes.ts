import {verifyToken, isAdmin, checkDuplicateUsername, verifyPassword} from "../middleware";
import {getUserById, deleteUserById, changeUsername, changePassword, getUsers} from "../controllers/user.controller";
import express from "express";

export const router = express.Router();

router.get(
    "/users",
    [
        verifyToken,
        isAdmin
    ],
    getUsers
)

router.get(
    "/users/:id",
    [
        verifyToken,
        isAdmin
    ],
    getUserById
)

router.delete(
    "/users/:id",
    [
        verifyToken,
        isAdmin
    ],
    deleteUserById
)

router.post(
    "/users/changeUsername/:id",
    [
        verifyToken,
        verifyPassword,
        checkDuplicateUsername
    ],
    changeUsername
)

router.post(
    "/users/changePassword/:id",
    [
        verifyToken,
        verifyPassword
    ],
    changePassword
)


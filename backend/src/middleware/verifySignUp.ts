import {Role, User} from "../models";
import { Request, Response, NextFunction} from "express";
import * as bcrypt from "bcrypt";

export function checkDuplicateUsername(req: Request, res: Response, next: NextFunction): void {
    User.findOne({
        username: req.body.username
    }).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (user) {
            res.status(400).send({ message: "Nutzername ist bereits vergeben." });
            return;
        }

        next();
    })
}

export function checkRoleExists(req: Request, res: Response, next: NextFunction): void {
    if (req.body.role) {
        if (Object.values(Role).includes(req.body.role) === false) {
            res.status(400).send({
                message: `Fehler! Die Rolle ${req.body.role} existiert nicht!`
            });
            return;
        }
    }
    next();
}

export const verifyPassword = (req: any, res: Response, next: NextFunction) => {
    User.findById(req.params.id).exec((err, user) => {
        if (err) {
            res.status(500).send({message: err });
            return;
        }
        if (user !== null) {
            const passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );
            if (!passwordIsValid) {
                return res.status(401).send({
                    message: "Falsches Passwort"
                })
            } else {
                next();
            }
        }
    })
}


import * as bcrypt from "bcrypt";
import {NextFunction, Request, Response} from "express";
import {Role, UserDB} from "../models";

export const verifyPassword = (req: any, res: Response, next: NextFunction) => {
    UserDB.findById(req.params.id).exec((err, user) => {
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
                return res.status(400).send({
                    message: "Falsches Passwort"
                })
            } else {
                next();
            }
        }
    })
}

export function verifyRoleExists(req: Request, res: Response, next: NextFunction): void {
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

export function verifyDuplicateUsername(req: Request, res: Response, next: NextFunction): void {
    UserDB.findOne({
        username: req.body.username
    }).exec((err, user) => {
        if (err) {
            res.status(500).send({message: err});
            return;
        }
        if (user) {
            res.status(400).send({message: "Nutzername ist bereits vergeben."});
            return;
        }

        next();
    })
}
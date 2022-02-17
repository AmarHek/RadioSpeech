import {NextFunction, Response} from "express";
import {UserDB} from "../models";
import * as bcrypt from "bcrypt";

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

export function checkSameUsername() {
    return;
}

export function checkSamePassword() {
    return;
}

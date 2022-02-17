import {Request, Response} from "express";
import {UserDB} from "../models";
import * as bcrypt from "bcrypt";

export const getUsers = (req: Request, res: Response) => {
    try {
        UserDB.find().then(users => {
            const result = users.map((user) => {
                return {
                    id: user._id,
                    username: user.username,
                    role: user.role
                }
            })
            res.status(200).send(result);
        });
    } catch (error) {
        res.status(404);
    }
}

export const getUserById = (req: Request, res: Response) => {
       UserDB.find(
            {_id: req.params.id}
        ).exec((err, users) => {
            if (err) {
                res.status(500).send({message: err});
            } else {
                const user = users[0];
                res.status(200).send({
                    id: user._id,
                    username: user.username,
                    role: user.role
                });
            }
        });
}

export const deleteUserById = (req: Request, res: Response) => {
    UserDB.deleteOne({
        _id: req.params.id
    }).exec((err) => {
        if (err) {
            res.status(500).send({message: err.message});
            return;
        } else {
            res.status(200).send({message: "User erfolgreich gelöscht."});
        }
    })
}

export const changeUsername = (req: Request, res: Response) => {
    UserDB.updateOne({
        _id: req.params.id
    }, {
        username: req.body.newUsername
    }).exec((err) => {
       if (err) {
           res.status(500).send({message: err});
       } else {
           res.status(200).send({message: "Username erfolgreich geändert."});
       }
    });
}

export const changePassword = (req: Request, res: Response) => {
    const newPassword = bcrypt.hashSync(req.body.newPassword, 8);
    UserDB.updateOne({
        _id: req.params.id
    }, {
        password: newPassword
    }).exec((err) => {
        if (err) {
            res.status(500).send({message: err});
        } else {
            res.status(200).send({message: "Passwort erfolgreich geändert."});
        }
    });
}

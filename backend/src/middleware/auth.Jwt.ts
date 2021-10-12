import * as jwt from "jsonwebtoken";
import { authConfig } from "../config/auth.config";
import { User, Role } from "../models";
import { Response, NextFunction} from "express";

export const verifyToken = (req: any, res: Response, next: NextFunction) => {
    const token = req.headers["x-access-token"] as string;

    if (!token) {
        return res.status(403).send({ message: "Kein Token gefunden!" });
    }

    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: "Nicht autorisiert!" });
        }
        if(decoded !== undefined) {
            req.userId = decoded.id;
        }
        next();
    });
};

export const isAdmin = (req: any, res: Response, next: NextFunction) => {
    User.findById(req.userId).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if(user !== null) {
            if (user.role === Role.Admin) {
                next();
                return;
            } else {
                res.status(403).send({message: "Admin-Berechtigungen erforderlich!"});
            }
        }
    })
}

export const isModerator = (req: any, res: Response, next: NextFunction) => {
    User.findById(req.userId).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (user !== null) {
            if (user.role === Role.Moderator || user.role === Role.Admin) {
                next();
                return;
            } else {
                res.status(403).send({message: "Mod-Berechtigungen erforderlich!"});
            }
        }
    })
}



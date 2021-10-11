import * as jwt from "jsonwebtoken";
import { authConfig } from "../config/auth.config";
import { User, Role } from "../models";
import { Request, Response, NextFunction} from "express";

interface UserRequest extends Request {
    userId: string;
}

export const verifyToken = (req: UserRequest, res: Response, next: NextFunction) => {
    const token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({ message: "Kein Token gefunden!" });
    }

    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: "Nicht authorisiert!" });
        }
        req.userId = decoded.id;
        next();
    });
};

export const isAdmin = (req: UserRequest, res: Response, next: NextFunction) => {
    User.findById(req.userId).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (user.role === Role.Admin) {
            next();
            return;
        }
        else {
            res.status(403).send({ message: "Admin-Berechtigungen erforderlich!"});
        }
    })
}

export const isModerator = (req: UserRequest, res: Response, next: NextFunction) => {
    User.findById(req.userId).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (user.role === Role.Moderator) {
            next();
            return;
        }
        else {
            res.status(403).send({ message: "Admin-Berechtigungen erforderlich!"});
        }
    })
}



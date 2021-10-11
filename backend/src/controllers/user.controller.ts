import {Request, Response} from "express";

export const allAccess = (req: Request, res: Response) => {
    res.status(200).send("Öffentlicher Inhalt.");
}

export const userBoard = (req: Request, res: Response) => {
    res.status(200).send("User Inhalt.");
};

export const adminBoard = (req: Request, res: Response) => {
    res.status(200).send("Admin Inhalt.");
};

export const moderatorBoard = (req: Request, res: Response) => {
    res.status(200).send("Moderator Inhalt.");
};



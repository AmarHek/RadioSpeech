import {PathologyDB} from "../models";
import {Request, Response} from "express";

export function getPathologyList(req: Request, res: Response) {
    PathologyDB.find().exec((err, pathologyList) => {
        if (err) {
            res.status(500).send({message: err});
        }
        res.status(200).send(pathologyList);
    });
}
import MaterialSchema from '../models/materialSchema';
import { Document } from 'mongoose';
import { Request, Response, NextFunction } from 'express';
import assert from "assert";

/*
export interface matRequest extends Request {
    files: {
        mainScan: Express.Multer.File
    }
}*/

// TODO: Define request types properly

export function filename(originalname: string, suffix: string): string {
    const nameSplit = originalname.split(".");
    return nameSplit[0] + "_" + suffix + "." + nameSplit[1] as string;
}

export function addMaterial (req: any, res: Response, next: NextFunction) {
    try {

        if (req.files) {
            const mainScan = {
                filename: filename(req.files.mainScan[0].originalname, req.files.mainScan[0].fieldname),
                mimetype: req.files.mainScan[0].mimetype
            };
            let lateralScan = undefined;
            if (req.files.lateralScan !== undefined) {
                lateralScan = {
                    filename: filename(req.files.lateralScan[0].originalname, req.files.lateralScan[0].fieldname),
                    mimetype: req.files.lateralScan[0].mimetype
                }
            }
            let preScan = undefined;
            if (req.files.preScan !== undefined) {
                preScan = {
                    filename: filename(req.files.preScan[0].originalname, req.files.preScan[0].fieldname),
                    mimetype: req.files.preScan[0].mimetype
                }
            }

            const material = new MaterialSchema({
                scans: {
                    id: req.body.id,
                    mainScan: mainScan,
                    lateralScan: lateralScan,
                    preScan: preScan
                },
                coordinates: {
                    main: [],
                    lateral: [],
                    pre: []
                },
                modality: req.body.modality,
                parts: JSON.parse(req.body.parts),
                judged: false
            });

            material.save().then((mat: Document) => {
                const message = "Material with id "+ mat._id + " added successfully";
                console.log(message);
                res.status(201).send(message);
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send( "Unexpected behaviour");
    }
}

export function deleteMaterial(req: Request, res: Response, next: NextFunction) {
    try {
        MaterialSchema.deleteOne({
            _id: req.params.id
        }).then(
            result => {
                console.log(result);
                res.status(200).send("Material deleted");
            });
    } catch (error) {
        res.status(404).send(error.message);
    }
}

export function updateMaterial(req: any, res: Response, next: NextFunction){

}

export function sampleMaterial(req: Request, res: Response, next: NextFunction) {
  MaterialSchema.find()
    .then(materials => {
      console.log(materials);
      res.status(200).send(materials);
    });
}

export function queryMaterial(req: Request, res: Response, next: NextFunction){
    try {
        MaterialSchema.find(req.body).then(matsDB => {
            res.status(200).send(matsDB);
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
}

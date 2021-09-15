import MaterialSchema from '../models/materialSchema';
import { Document } from 'mongoose';
import { Request, Response, NextFunction } from 'express';
import { Material } from "../models/materialModel";

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

export function addMaterial (req: any, res: Response, next: NextFunction): void {
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
                template: JSON.parse(req.body.template),
                judged: false
            });

            material.save().then((mat: Document) => {
                const message = "Material with id "+ mat._id + " added successfully";
                res.status(201).json({
                    success: true,
                    message: message});
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message});
    }
}

export function deleteMaterial(req: Request, res: Response, next: NextFunction): void {
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

export function updateMaterial(req: Request, res: Response, next: NextFunction): void {
    try {
        MaterialSchema.updateOne({
            _id: req.params.id
        }, {
            parts: req.body.parts,
            coordinates: req.body.coordinates,
            judged: req.body.judged
        }).then(response => {
            console.log(response);
            if (response.ok === 1) {
                if (response.nModified === 1) {
                    res.status(200).json({message: "Update successful"});
                } else {
                    res.status(200).json({message: "No changes detected with your submit."});
                }
            } else {
                res.status(409).json({message: "Something went wrong during the update."});
            }
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export function sampleMaterial(req: Request, res: Response, next: NextFunction): void {
  MaterialSchema.find()
    .then((materials: Material[]) => {
      res.status(200).send(materials);
    });
}

export function queryMaterial(req: Request, res: Response, next: NextFunction): void {
    try {
        MaterialSchema.find(req.body).limit(20).then((mats: Material[]) => {
            res.status(200).send(mats);
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export function getMaterialById(req: Request, res: Response, next: NextFunction): void {
    try {
        MaterialSchema.find({_id: req.params.id}).then(mats => {
            res.status(200).send(mats[0]);
        });
    } catch (error) {
        res.status(404).send(error.message);
    }
}

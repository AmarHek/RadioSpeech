import Material from '../models/materialSchema';
import fs from 'fs';
import { Document } from 'mongoose';
import { Request, Response, NextFunction } from 'express';
import * as path from "path";

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

            const material = new Material({
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
                console.log("Material with id " + mat._id + " added successfully");
                res.status(201).json({
                    message: 'Material added successfully'
                });
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
          message: "Unexpected behaviour"
        })
    }
}

export function deleteMaterial(req: any, res: Response, next: NextFunction) {
    try {
        Material.deleteOne({
            _id: req.params.id
        }).then(
            result => {
                console.log(result);
                res.status(200).json({
                    message: "Material deleted"
                });
            });
    } catch (error) {
        res.status(404).json({
            message: "ID not found, could not delete",
            error: error
        })
    }
}

export function sampleMaterial(req: any, res: Response, next: NextFunction) {
  Material.find()
    .then(materials => {
      console.log(materials);
      res.status(200).json({
        message: "Materials fetched",
        materials: materials
      });
    });
}

export function queryMaterial(req: any, res: Response, next: NextFunction){
    Material.find(req.body.query).then(mats => {
        const materials = [];
        console.log(mats);
        for (const mat of mats) {
            const id = mat.scans.id;
            const mainScan = fs.readFileSync('data/images/' + id + '/mainScan.jpeg', 'base64');
            console.log(mainScan);
        }
    });
}

function readScans(scans: any) {
    return;
}

function readImage(path: any, mimetype: any) {
    return;
}

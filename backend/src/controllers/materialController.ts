import MaterialSchema, {ImageDB, MaterialDB} from '../models/materialSchema';
import fs from 'fs';
import { Document } from 'mongoose';
import { Request, Response, NextFunction } from 'express';
import * as path from "path";
import {Image, Material} from "../models/materialModel";
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

/*export function queryMaterial(req: Request, res: Response, next: NextFunction){
    try {
        MaterialSchema.find(req.body.query).then(matsDB => {
            assert(matsDB.length > 0);
            const materials = [];
            for (const matDB of matsDB) {
                const scan_id = matDB.scans.id;
                const mainScan = readScan(scan_id, matDB.scans.mainScan);
                const lateralScan = (matDB.scans.lateralScan !== undefined) ?
                    readScan(scan_id, matDB.scans.lateralScan) : undefined;
                const preScan = (matDB.scans.preScan !== undefined) ?
                    readScan(scan_id, matDB.scans.preScan) : undefined;
                const mat = generateMaterial(matDB, mainScan, lateralScan, preScan);
                materials.push(mat);
            }
            res.status(200).send(materials);
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
}*/

export function queryMaterial(req: Request, res: Response, next: NextFunction){
    try {
        MaterialSchema.find(req.body.query).then(matsDB => {
            assert(matsDB.length > 0);
            res.status(200).send(matsDB);
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
}


// Utility functions

function readScan(scan_id: string, imageFile: ImageDB, imgRoot: string = 'data/images'): Image {
    try {
        const img_path = path.join(imgRoot, scan_id, imageFile.filename);
        const img_base64 = fs.readFileSync(img_path, 'base64');
        return {
            data: img_base64,
            contentType: imageFile.mimetype
        };
    } catch (error) {
        return error;
    }
}

function generateMaterial(matDB: MaterialDB, mainScan: Image, lateralScan?: Image, preScan?: Image): Material{
    const material: Material = {
        _id: matDB._id,
        mainScan: mainScan,
        coordinates: matDB.coordinates,
        modality: matDB.modality,
        parts: matDB.parts,
        pathologies: matDB.pathologies
    }
    if (lateralScan !== undefined) {
        material.lateralScan = lateralScan;
    }
    if (preScan !== undefined) {
        material.preScan = preScan;
    }

    return material;
}

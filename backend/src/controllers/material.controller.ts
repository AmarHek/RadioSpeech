import MaterialSchema from '../models/material.schema';
import { Document } from 'mongoose';
import { Request, Response } from 'express';
import { Material } from "../models/material.model";
import fs from "fs";
import Path from "path";

// TODO: Define request types properly

export function filename(originalname: string, suffix: string): string {
    const nameSplit = originalname.split(".");
    return nameSplit[0] + "_" + suffix + "." + nameSplit[1] as string;
}

export function addMaterial (req: any, res: Response): void {
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
}

export function deleteMaterial(req: Request, res: Response): void {
    MaterialSchema.deleteOne({
        _id: req.body.objectID
    }).exec((err) => {
        if (err) {
            res.status(500).send({message: err});
        } else {
            const dir = Path.join("data/images/", req.body.scanID);
            fs.rmdirSync(dir, {recursive: true});
            res.status(200).send({message: "Material deleted"});
        }
    });
}

export function updateMaterial(req: Request, res: Response): void {
    MaterialSchema.updateOne({
        _id: req.params.id
    }, {
        template: req.body.template,
        coordinates: req.body.coordinates,
        judged: req.body.judged
    }).exec((err, response) => {
        console.log(response);
        if (err) {
            res.status(500).send({message: err});
        } else if (response.nModified === 1) {
            res.status(200).json({message: "Update successful"});
        } else {
            res.status(200).json({message: "No changes detected."});
        }
    });
}

export function getMaterialById(req: Request, res: Response): void {
    MaterialSchema.findOne({_id: req.params.id}).exec((err, material) => {
        if (err) {
            res.status(500).send({message: err});
        } else {
            res.status(200).send({material});
        }
    });
}

export function listAll(req: Request, res: Response): void {
  MaterialSchema.find()
    .exec((err, materials: Material[]) => {
        if(err) {
            res.status(500).send({message: err});
        } else {
            res.status(200).send({materials});
        }
    });
}

export function listByQuery(req: Request, res: Response): void {
    let query: Record<string, boolean | string>;
    if (req.body.pathology.length > 0) {
        query = {
            judged: req.body.judged,
            pathology: req.body.pathology
        }
    } else {
        query = { judged: req.body.judged }
    }
    console.log(query);
    MaterialSchema.find(query)
        .skip(req.body.skip)
        .limit(req.body.length)
        .exec((err, materials) => {
        if (err) {
            res.status(404).send({message: err});
        }
        res.status(200).send({materials});
    });
}

export function getRandom(req: Request, res: Response): void {
    let query: Record<string, boolean | string>;
    if (req.body.pathology.length > 0) {
        query = {
            judged: req.body.judged,
            pathology: req.body.pathology
        }
    } else {
        query = { judged: req.body.judged }
    }
    MaterialSchema.countDocuments(query).exec((err, count) => {
        if (err) {
            res.status(500).send({message: err});
        } else {
            // get random entry
            const random = Math.floor(Math.random() * count);
            // query one judged material, but skip random count
            MaterialSchema.findOne(query).skip(random).exec(
                (err, material) => {
                    if (err) {
                        res.status(500).send({message: err});
                    }
                    res.status(200).send({material});
                });
        }
    });
}

export function queryDocCount(req: Request, res: Response): void {
    let query;
    if (req.body.pathology.length > 0) {
        query = {
            judged: req.body.judged,
            pathologies: req.body.pathology
        }
    } else {
        query = {
            judged: req.body.judged
        }
    }
    MaterialSchema.countDocuments(query).exec((err, count) => {
        if (err) {
            console.log(err);
            res.status(500).send({message: err});
        } else {
            console.log(count);
            res.status(201).send({count});
        }
    });
}

import {updatePartsBackwardsCompatible} from "../middleware/materialMiddleware";
import {MaterialDB, TemplateDB, TemplateDoc} from '../models';
import { Document } from 'mongoose';
import { Request, Response } from 'express';
import fs from "fs";
import Path from "path";
import {Template} from "../models/template.model";

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

         const time: number = new Date().getTime();

         const material = new MaterialDB({
             scans: {
                 id: req.body.id,
                 mainScan: mainScan,
                 lateralScan: lateralScan,
                 preScan: preScan
             },
             annotations: {
                 main: [],
                 lateral: [],
                 pre: []
             },
             modality: req.body.modality,
             template: JSON.parse(req.body.template),
             pathologies: [],
             timestamp: time,
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
    MaterialDB.deleteOne({
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
    MaterialDB.updateOne({
        _id: req.params.id
    }, {
        template: req.body.template,
        annotations: req.body.annotations,
        pathologies: req.body.pathologies,
        judged: req.body.judged
    }).exec((err, response) => {
        console.log(response);
        if (err) {
            res.status(500).send({message: err});
        } else if (response.modifiedCount === 1) {
            res.status(200).json({message: "Update successful"});
        } else {
            res.status(200).json({message: "No changes detected."});
        }
    });
}

export function addScan(req: any, res: Response) {
    console.log(req);

    const newScan = {
        filename: req.file.filename,
        mimetype: req.file.mimetype
    }

    MaterialDB.findById(req.params.id).exec(
        (err, material) => {
        if (err || material === null)  {
            console.log(err);
            res.status(500).send({message: err});
        } else {
            const scans = material.scans;
            if (req.body.scanType === "lateralScan") {
                scans.lateralScan = newScan;
            } else if (req.body.scanType === "preScan") {
                scans.preScan = newScan;
            }

            MaterialDB.updateOne({_id: req.params.id}, {
                scans: scans
            }).exec((err, response) => {
                console.log(response);
                res.status(200).send({message: "Update successful"});
            });
        }
    });
}

export function deleteScanById(req: Request, res: Response): void {
    let update;
    if (req.body.scanType === "lateralScan") {
        update = {
            "scans.lateralScan": undefined,
            "annotations.lateral": []
        }
    } else if (req.body.scanType === "preScan") {
        update = {
            "scans.preScan": undefined,
            "annotations.pre": []
        }
    } else  {
        res.status(400).send({message: "Unknown scanType specified"});
    }
    // simply update corresponding material entry by id, removing requested scan and annotations
    MaterialDB.updateOne({_id: req.params.id}, update
    ).exec((err, response) => {
        if (err) {
            res.status(500).send({message: err});
        } else {
            console.log(response);
            // delete image from server folder
            fs.rmSync(Path.join("data/images", req.body.id, req.body.filename));
            res.status(200).send({message: "Deletion successful"});
        }
    });
}

export function updateMaterialTemplates(req: Request, res: Response): void {
    // replaces old with new template in all unjudged material
    // first get current Template
    TemplateDB.findOne({name: "Radiolearn"}).exec((err, template) => {
        if (err || template === null) {
            res.status(500).send({message: err});
        } else {
            // turn currentTemplate into template object
            const newTemplate: Template = {
                _id: template._id,
                parts: template.parts,
                name: template.name,
                timestamp: template.timestamp
            }

            // judged/unjudged given by request body
            // more important for judged: only replace template if Material Template is older than new one
            // because previous entries are lost in the process. Also set judged to false
            MaterialDB.updateMany({
                'judged': req.body.judged,
                'template.timestamp': {$lt: newTemplate.timestamp}
            }, {
                template: newTemplate,
                judged: false
            }).exec(
                (err, update) => {
                    if (err) {
                        res.status(500).send({message: err});
                    } else {
                        console.log(update);
                        res.status(200).send({message: "All updates successful"})
                    }
                })
        }
    });
}

export function updateMatTempBC(req: Request, res: Response): void {
    // updates old templates on judged with backwards compatibility

    // first get current Template
    TemplateDB.findOne({name: "Radiolearn"}).exec((err, template) => {
        if (err || template === null) {
            res.status(500).send({message: err});
        } else {
            // first get list of all Material with old template
            MaterialDB.find({
                'judged': true,
                'template.timestamp': {$lt: template.timestamp}
            }).exec((err, materials) => {
                if (err) {
                    res.status(500).send({message: err})
                } else if (materials.length === 0) {
                    res.status(200).send({message: "Keine Materialien zum Aktualisieren."})
                } else {
                    // found some materials, time to update them
                    for (const material of materials) {
                        // first copy new template
                        const newPartsEmpty = JSON.parse(JSON.stringify(template.parts))
                        // now fill out new parts by using old parts
                        const newParts = updatePartsBackwardsCompatible(newPartsEmpty, material.documentTemplate.parts);
                        // generate new template and update material entry
                        const newTemplate = {
                            _id: material.documentTemplate._id,
                            name: template.name,
                            timestamp: template.timestamp,
                            parts: newParts
                        }
                        MaterialDB.updateOne({_id: material._id},
                            {template: newTemplate}).exec((err, response) => {
                            if (err) {
                                console.log(err);
                                res.status(500).send({message: err});
                            }
                            console.log(response);
                        });
                    }
                    res.status(200).send({message: "Update successful"});
                }
            })
        }
    });
}

export function updateMaterialTemplateBCByID(req: Request, res: Response) {
    // get current Template
    TemplateDB.findOne({name: "Radiolearn"}).exec((err, template) => {
        if (err || template === null) {
            res.status(500).send({message: err});
        } else {
            MaterialDB.findById(req.params.id).exec((err, material) => {
                if (err || material === null) {
                    res.status(500).send({message: err});
                } else {
                    // first copy new template
                    const newPartsEmpty = JSON.parse(JSON.stringify(template.parts))
                    // now fill out new parts by using old parts
                    const newParts = updatePartsBackwardsCompatible(newPartsEmpty, material.documentTemplate.parts);
                    // generate new template and update material entry
                    const newTemplate = {
                        _id: material.documentTemplate._id,
                        name: template.name,
                        timestamp: template.timestamp,
                        parts: newParts
                    }
                    MaterialDB.updateOne({_id: material._id},
                        {template: newTemplate}).exec((err, response) => {
                        if (err) {
                            console.log(err);
                            res.status(500).send({message: err});
                        }
                        console.log(response);
                        res.status(200).send({message: "Update successful"});
                    });
                }
            });
        }
    });
}

export function getMaterialById(req: Request, res: Response): void {
    MaterialDB.findById(req.params.id).exec((err, material) => {
        if (err) {
            res.status(500).send({message: err});
        } else {
            res.status(200).send({material});
        }
    });
}

export function listAll(req: Request, res: Response): void {
    MaterialDB.find()
    .exec((err, materials) => {
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
    const skip = Math.max(0, req.body.skip);
    MaterialDB.find(query)
        .skip(skip)
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
    MaterialDB.countDocuments(query).exec((err, count) => {
        if (err) {
            res.status(500).send({message: err});
        } else {
            // get random entry
            const random = Math.floor(Math.random() * count);
            // query one judged material, but skip random count
            MaterialDB.findOne(query).skip(random).exec(
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
    MaterialDB.countDocuments(query).exec((err, count) => {
        if (err) {
            console.log(err);
            res.status(500).send({message: err});
        } else {
            res.status(201).send({count});
        }
    });
}

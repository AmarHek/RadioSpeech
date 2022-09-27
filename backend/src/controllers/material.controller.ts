import {updatePartsBackwardsCompatible} from "../middleware/materialMiddleware";
import {MaterialDB, ParticipantDB, TemplateDB} from '../models';
import { Document } from 'mongoose';
import { Request, Response } from 'express';
import fs from "fs";
import Path from "path";
import {Template} from "../models/template.model";
import {isJsonString} from "../util/util";

// TODO: Define request types properly

export function filename(originalname: string, suffix: string): string {
    const nameSplit = originalname.split(".");
    return nameSplit[0] + "_" + suffix + "." + nameSplit[1] as string;
}

export function addMaterial (req: any, res: Response): void {
     if (req.files) {
         if(!isJsonString(req.body.deepDocTemplate) || !isJsonString(req.body.shallowDocTemplate)) {
             res.status(500).send({message: "One or more templates are invalid and cannot be parsed"});
         }

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
             deepDocTemplate: JSON.parse(req.body.deepDocTemplate),
             shallowDocTemplate: JSON.parse(req.body.shallowDocTemplate),
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
     } else {
         res.status(500).send({message: "No files in request found."})
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
    const time: number = new Date().getTime();
    MaterialDB.updateOne({
        _id: req.params.id
    }, {
        deepDocTemplate: req.body.deepDocTemplate,
        shallowDocTemplate: req.body.shallowDocTemplate,
        annotations: req.body.annotations,
        pathologies: req.body.pathologies,
        lastModified: time,
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
    TemplateDB.findOne({name: "Radiolearn"}).exec((err,
                                                   template) => {
        if (err || template === null) {
            res.status(500).send({message: err});
        } else {
            // turn currentTemplate into template object
            const newTemplate: Template = {
                _id: template._id,
                parts: template.parts,
                kind: template.kind,
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
                deepDocTemplate: newTemplate,
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

// NOTE: BETTER USE PYTHON SCRIPTS WITH HARD CODED CHANGES
export function updateMatTempBC(req: Request, res: Response): void {
    // updates old templates on judged with backwards compatibility

    // first get current Template
    TemplateDB.findOne({name: "Radiolearn"}).exec((err,
                                                   template) => {
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
                        const newParts = updatePartsBackwardsCompatible(newPartsEmpty, material.deepDocTemplate.parts);
                        // generate new template and update material entry
                        const newTemplate = {
                            _id: material.deepDocTemplate._id,
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
    TemplateDB.findOne({name: "Radiolearn"}).exec((err,
                                                   template) => {
        if (err || template === null) {
            res.status(500).send({message: err});
        } else {
            MaterialDB.findById(req.params.id).exec((err,
                                                     material) => {
                if (err || material === null) {
                    res.status(500).send({message: err});
                } else {
                    // first copy new template
                    const newPartsEmpty = JSON.parse(JSON.stringify(template.parts))
                    // now fill out new parts by using old parts
                    const newParts = updatePartsBackwardsCompatible(newPartsEmpty, material.deepDocTemplate.parts);
                    // generate new template and update material entry
                    const newTemplate = {
                        _id: material.deepDocTemplate._id,
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
    let query;
    if (req.body.shallowFilter !== undefined) {
        query = {
            'judged': req.body.judged,
            'shallowDocTemplate.name': req.body.shallowDocTemplate
        }
    }
    else {
        query = {
            'judged': req.body.judged
        }
    }

    const skip = Math.max(0, req.body.skip);
    if (req.body.judged) {
        MaterialDB.find(query)
            .sort('lastModified')
            .skip(skip)
            .limit(req.body.length)
            .exec((err, materials) => {
                if (err) {
                    res.status(404).send({message: err});
                }
                res.status(200).send({materials});
            });
    } else {
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
}

export function getRandom(req: Request, res: Response): void {
    MaterialDB.countDocuments({judged: req.body.judged}).exec((err, count) => {
        if (err) {
            res.status(500).send({message: err});
        } else {
            // get random entry
            const random = Math.floor(Math.random() * count);
            // query one judged material, but skip random count
            MaterialDB.findOne({judged: req.body.judged}).skip(random).exec(
                (err, material) => {
                    if (err) {
                        res.status(500).send({message: err});
                    }
                    res.status(200).send({material});
                });
        }
    });
}
/*
* Returns a material that the participant with the UUID specified in the request body has not completed yet,
* or the error "no-unused-materials" if no unused materials are left for this participant.
* */
export function getUnusedMaterial(req: Request, res: Response): void {
    console.log("received request to give unused material")
    const query = ParticipantDB.findOne({'UUID' : req.body.UUID});
    query.exec(function (error, participant){
        if(error){
            console.log("Error getting participant for material query: " + error.message)
            res.status(500).send({message: "Error getting participant for material query: " + error.message});
        }else {
            //Get all material IDs of the materials that this user has already completed in this mode and this reset round
           const usedMaterialIDs: string[] = []
            if(participant != null){
                participant.usageList.forEach(usageData =>{
                    if(usageData.mode == req.body.mode && usageData.resetCounter == req.body.resetCounter){
                        usedMaterialIDs.push(usageData.materialID)
                    }
                })
            }
            console.log("got all used materials of user " + req.body.UUID + " for run " + req.body.resetCounter + " here: " + usedMaterialIDs.toString())
            const materialQuery = MaterialDB.find({})
            materialQuery.exec(function (error, result){
                if (error){
                    console.log("Error fetching materials: " + error.message)
                    res.status(500).send({message: "Error fetching materials: " + error.message});
                }else {
                    //Get all available material IDs
                    //Todo, filter for judged here?
                    const allMaterialIDs: string[] = []
                    result.forEach(material =>{
                        if(material.judged){
                            allMaterialIDs.push(material._id)
                        }
                    })
                    // console.log("Got all existing material ids: " + allMaterialIDs.toString())
                    //Get a list of all uncompleted material IDs
                    const unusedMaterialIDs: string[] = []
                    allMaterialIDs.forEach(matID => {
                        let used = false
                        usedMaterialIDs.forEach(usedID =>{
                            if(usedID == matID) used = true
                        })
                        if (!used) unusedMaterialIDs.push(matID)
                    })
                    // console.log("Removed used ids: " + unusedMaterialIDs.toString())

                    if(unusedMaterialIDs.length <= 0){
                        //No unused materials left
                        console.log("No unused materials left")
                        res.status(200).send({material: null});
                    }else{
                        //Pick a random uncompleted material ID
                        const randomUnusedMaterialID = unusedMaterialIDs[Math.floor(Math.random() * unusedMaterialIDs.length)]
                        console.log("selected random id: " + randomUnusedMaterialID)
                        const finalMaterialQuery = MaterialDB.findOne({'_id': randomUnusedMaterialID})
                        finalMaterialQuery.exec(function (error, material){
                            if(error){
                                console.log("Error fetching random unused material: " + error.message)
                                res.status(500).send({message: "Error fetching random unused material: " + error.message});
                            }else {
                                res.status(200).send({material});
                            }
                        });
                    }

                }
            })

        }
    });

}

export function queryDocCount(req: Request, res: Response): void {
    MaterialDB.countDocuments({judged: req.body.judged}).exec((err, count) => {
        if (err) {
            console.log(err);
            res.status(500).send({message: err});
        } else {
            res.status(201).send({count});
        }
    });
}

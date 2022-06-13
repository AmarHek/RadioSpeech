import {TemplateDB} from '../models';
import * as fs from 'fs';
import {Request, Response} from "express";
import {parseXLSToJson} from "../middleware";
import * as Path from "path";
import {generateUniqueFilename} from "../util/util";


export function createExcelTemplate(req: any, res: Response) {
    const rawData = fs.readFileSync(req.file.path);
    const jsonString = parseXLSToJson(rawData.toString("binary"));
    if (jsonString === undefined) {
        res.status(500).send({
            message: "Parsing error in Excel Template"
        });
    }
    // save parsed data to json
    const jsonName = generateUniqueFilename("data/json", req.body.name, ".json");
    fs.writeFile(Path.join("data/json", jsonName), jsonString, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Successfully saved " + jsonName);
        }
    })
    const parts = JSON.parse(jsonString);
    const template = new TemplateDB({
        parts: parts,
        name: req.body.name,
        timestamp: req.body.timestamp as number
    });
    template.save().then(result => {
        res.status(201).json({
            message: "Template added successfully",
            postId: result._id
        });
    });
}


export function createJSONTemplate(req: any, res: Response) {
  // TODO: Check JSON for errors and add sufficient messages
  const rawData = fs.readFileSync(req.file.path);
  const parts = JSON.parse(rawData.toString());
  const template = new TemplateDB({
    parts: parts,
    name: req.body.name,
    timestamp: req.body.timestamp as number
  });
  template.save().then(result => {
    res.status(201).json({
      message: "Template added successfully",
      postId: result._id
    });
  });
}

export function createTemplate(req: any, res: Response) {
  const template  = new TemplateDB({
    parts: req.body.parts,
    name: req.body.name,
      timestamp: req.body.timestamp as number
  });
  template.save().then(result => {
    res.status(201).json({
      message: 'Template added successfully',
      postId: result._id
    });
  });
}

export function updateTemplate(req: Request, res: Response) {
  const newTemplate = new TemplateDB({
    _id: req.params.id,
    parts: req.body.parts,
    name: req.body.name,
    timestamp: req.body.timestamp
  });
  TemplateDB.updateOne({
      _id: req.params.id
    }, newTemplate)
    .then(result => {
      console.log(result);
      res.status(200).send("Update successful");
    });
}

export function deleteTemplate(req: any, res: Response){
  TemplateDB.deleteOne({
    _id: req.params.id
  }).then(
    result => {
      console.log(result);
      res.status(200).json({
        message: "TemplateModel deleted"
      });
    });
}

export function getTemplateList(req: any, res: Response){
  try {
    TemplateDB.find()
        .then(templates => {
          res.status(200).send(templates);
        });
  } catch {
    res.status(500);
  }
}

export function getTemplateById(req: Request, res: Response): void {
    TemplateDB.findOne({_id: req.params.id}).exec(
        (err, template) => {
          if(err) {
            res.status(500).send({message: err});
          }
          res.status(200).send(template)
        }
    )
}

export function getTemplateByName(req: Request, res: Response): void {
    TemplateDB.findOne({name: req.body.name}).exec(
        (err, template) => {
            if(err) {
                res.status(500).send({message: err});
            }
            res.status(201).send({template});
        }
    )
}

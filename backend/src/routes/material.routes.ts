import express from "express";
import multer from 'multer';

import * as MaterialController from "../controllers/material.controller";
import Path from "path";
import fs from "fs";
import {
  checkDuplicateLateralScan,
  checkDuplicateMainScan, checkDuplicatePreScan
} from "../middleware/materialMiddleware";

const storageImages = multer.diskStorage({
  destination: (req, file, cb) => {
    const path = Path.join("data/images/", req.body.id);
    fs.mkdirSync(path, {recursive: true});
    cb(null, path);
  },
  filename: (req, file, cb) => {
    cb(null, MaterialController.filename(file.originalname, file.fieldname));
  }
});

const updateStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const path = Path.join("data/images/", req.body.id);
    cb(null, path);
  },
  filename: (req, file, cb) => {
    cb(null, MaterialController.filename(file.originalname, req.body.scanType));
  }
})

const fileFilter = (req: any, file: Express.Multer.File, cb: any) => {
  if(file.mimetype === "image/jpg" || file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error("Das hochgeladene Bild ist kein jpeg oder png"), false);
  }
}

const upload = multer({
  storage: storageImages,
  fileFilter: fileFilter
}).fields([{
  name: 'mainScan', maxCount: 1
}, {
  name: 'lateralScan', maxCount: 1
}, {
  name: 'preScan', maxCount: 1
}]);

const update = multer({
  storage: updateStorage,
  fileFilter: fileFilter
}).single('newScan');

export const matRouter = express.Router();

matRouter.post("/add/", upload, checkDuplicateMainScan,
    checkDuplicateLateralScan,
    checkDuplicatePreScan,
    MaterialController.addMaterial);
matRouter.get("/get/:id", MaterialController.getMaterialById)
matRouter.post("/delete/", MaterialController.deleteMaterial)

matRouter.post("/addScan/:id", update, MaterialController.addScan);
matRouter.post("/deleteScan/:id", MaterialController.deleteScan);

matRouter.put("/update/:id", MaterialController.updateMaterial)
matRouter.post("/updateMaterialTemplates/", MaterialController.updateMaterialTemplates);
matRouter.post("/updateMaterialTemplatesBC/", MaterialController.updateMaterialTemplatesBackwardsCompatible);

matRouter.get("/listAll/", MaterialController.listAll);
matRouter.post("/listByQuery/", MaterialController.listByQuery);
matRouter.post("/queryDocCount/", MaterialController.queryDocCount);
matRouter.post("/random/", MaterialController.getRandom);




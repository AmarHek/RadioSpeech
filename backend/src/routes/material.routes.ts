import express from "express";
import multer from 'multer';

import * as MaterialController from "../controllers/material.controller";
import Path from "path";
import fs from "fs";

const storageImages = multer.diskStorage({
// TODO: Path dependencies!
  destination: (req, file, cb) => {
    const path = Path.join("data/images/", req.body.id);
    fs.mkdirSync(path, {recursive: true});
    cb(null, path);
  },
  filename: (req, file, cb) => {
    cb(null, MaterialController.filename(file.originalname, file.fieldname));
  }
});

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
}])

export const router = express.Router();

router.post("/material/add/", upload, MaterialController.addMaterial);
router.get("/material/get/:id", MaterialController.getMaterialById)
router.put("/material/update/:id", MaterialController.updateMaterial);
router.post("/material/delete/", MaterialController.deleteMaterial)
router.get("/material/listAll/", MaterialController.listAll);
router.get("/material/listJudged/", MaterialController.listJudged);
router.get("/material/listUnjudged/", MaterialController.listUnjudged);
router.post("/material/listByPathology/", MaterialController.listByPathology);
router.get("/material/randomJudged/", MaterialController.getRandomJudged);
router.get("/material/randomUnjudged/", MaterialController.getRandomUnjudged);



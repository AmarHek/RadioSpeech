import express from "express";
import multer from 'multer';

import * as MaterialController from "../controllers/materialController";
import Path from "path";
import fs from "fs";

const storageImages = multer.diskStorage({
// TODO: Path dependencies!
  destination: (req, file, cb) => {
    const path = Path.join("data/images", req.body.id);
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

router.post("/material", upload, MaterialController.addMaterial);
router.put("/material/:id", MaterialController.updateMaterial);
router.get("/material/sample", MaterialController.sampleMaterial);
router.post("/material/query", MaterialController.queryMaterial);
router.delete("/material/:id", MaterialController.deleteMaterial)



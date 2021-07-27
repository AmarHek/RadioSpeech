import express from "express";
import multer from 'multer';

import * as MaterialController from "../controllers/materialController";
import path from "path";
import fs from "fs";

const storageImages = multer.diskStorage({
// TODO: Path dependencies!
  destination: (req, file, cb) => {
    if (!fs.existsSync(path.join("data/images/", req.body.id))) {
    fs.mkdirSync(path.join("data/images/", req.body.id));
    }
      cb(null, path.join("data/images/", req.body.id))
  },

  filename: (req, file, cb) => {
    cb(null, file.fieldname + "." + file.mimetype.split("/")[1])
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

router.post("/material", upload, MaterialController.addMaterial)
router.get("/material/all", MaterialController.getAllMaterial)
router.get("/material/query", MaterialController.queryMaterial);
router.delete("/material/:id", MaterialController.deleteMaterial)



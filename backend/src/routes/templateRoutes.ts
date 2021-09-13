import express from 'express';
import multer from 'multer';
import fs from "fs";

import * as TemplateController from "../controllers/templateController";

const storageExcel = multer.diskStorage({
    destination: (req, file, cb) => {
        const path = "data/excels/";
        fs.mkdirSync(path, { recursive: true });
        cb(null, path);
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(" ").join("-");
        //const ext = file.mimetype;
        cb(null, name + ".xlsx");
    }
});

const storageJSON = multer.diskStorage({
    destination: (req, file, cb) => {
        const path = "data/json/";
        fs.mkdirSync(path, { recursive: true });
        cb(null, path);
    },
    filename: (req, file, cb) => {
        const name = file.originalname;
        cb(null, name);
    }
});

export const router = express.Router();

router.post("/template/json/", multer({
    storage: storageJSON
}).single("file"), TemplateController.createJSONTemplate);

router.post("/template/", TemplateController.createTemplate);
router.put("/template/:id", TemplateController.updateTemplate);
router.get('/template/', TemplateController.getTemplateList);
router.get("/template/:id", TemplateController.getTemplateById)
router.delete("/template/:id", TemplateController.deleteTemplate);

// TODO Excel parser
/*
router.post("/excel", multer({
  storage: storageExcel
}).single("file"), TemplateController.createExcelTemplate );*/


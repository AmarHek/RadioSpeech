import express from 'express';
import multer from 'multer';

import * as TemplateController from "../controllers/templateController";

const storageExcel = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "data/excels");
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(" ").join("-");
        //const ext = file.mimetype;
        cb(null, name + ".xlsx");
    }
});

const storageJSON = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "data/json");
    },
    filename: (req, file, cb) => {
        const name = file.originalname;
        cb(null, name);
    }
});

export const router = express.Router();

router.post("/json", multer({
    storage: storageJSON
}).single("file"), TemplateController.createJSONTemplate);

router.post("", TemplateController.createTemplate);
router.put("/:id", TemplateController.changeTemplate);
router.get('', TemplateController.getTemplates);
router.delete("/:id", TemplateController.deleteTemplate);

// TODO Excel parser
/*
router.post("/excel", multer({
  storage: storageExcel
}).single("file"), TemplateController.createExcelTemplate );*/


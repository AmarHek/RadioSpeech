import express from 'express';
import multer from 'multer';
import fs from "fs";

import * as TemplateController from "../controllers/template.controller";

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

export const templateRouter = express.Router();

templateRouter.post("/template/excel", multer({
    storage: storageExcel
}).single("file"), TemplateController.createExcelTemplate);

templateRouter.post("/template/json/", multer({
    storage: storageJSON
}).single("file"), TemplateController.createJSONTemplate);

templateRouter.post("/template/excel", multer({
    storage: storageExcel
}).single("file"), TemplateController.createExcelTemplate );

templateRouter.post("/template/", TemplateController.createTemplate);
templateRouter.put("/template/:id", TemplateController.updateTemplate);
templateRouter.get('/template/', TemplateController.getTemplateList);
templateRouter.get("/template/:id", TemplateController.getTemplateById)
templateRouter.delete("/template/:id", TemplateController.deleteTemplate);

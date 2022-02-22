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

templateRouter.post("/excel", multer({
    storage: storageExcel
}).single("file"), TemplateController.createExcelTemplate);

templateRouter.post("/json/", multer({
    storage: storageJSON
}).single("file"), TemplateController.createJSONTemplate);

templateRouter.post("/add/", TemplateController.createTemplate);
templateRouter.put("/update/:id", TemplateController.updateTemplate);
templateRouter.get('/list/', TemplateController.getTemplateList);
templateRouter.get("/:id", TemplateController.getTemplateById)
templateRouter.delete("/delete/:id", TemplateController.deleteTemplate);

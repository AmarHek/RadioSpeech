const express = require("express");
const multer = require("multer");
const router = express.Router();
const TemplateController = require("../controllers/templateController");
const MaterialController = require("../controllers/materialController");
const storageExcel = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./excels");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(" ").join("-");
    //const ext = file.mimetype;
    cb(null, name + ".xlsx");
  }
});

const storageJSON = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./json");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, name);
  }
});

const storageMaterial = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname + '-' + Date.now())
  }
});

// TODO Excel parser
/*
router.post("/excel", multer({
  storage: storageExcel
}).single("file"), TemplateController.createExcelTemplate );*/

router.post("/json", multer({
  storage: storageJSON
}).single("file"), TemplateController.createJSONTemplate);

router.post("", TemplateController.createTemplate);
router.put("/:id", TemplateController.changeTemplate);
router.get('', TemplateController.getTemplates);
router.delete("/:id", TemplateController.deleteTemplate);

router.post("/material", multer({
  storage: storageMaterial
}).single("file"), MaterialController.createMaterial)
router.get("/material", MaterialController.getMaterial)
router.delete("/material/:id", MaterialController.deleteMaterial)

module.exports = router;


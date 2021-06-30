const express = require("express");
const multer = require("multer");
const router = express.Router();
const TemplateController = require("../controllers/templateController");
const MaterialController = require("../controllers/materialController");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "backend/excels");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(" ").join("-");
    //const ext = file.mimetype;
    cb(null, name + ".xlsx");
  }
});

const storageMaterial = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "backend/images");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname + '-' + Date.now())
  }
});

// TODO Excel parser
/*
router.post("/excel", multer({
  storage: storage
}).single("file"), TemplateController.createExcelTemplate );*/

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


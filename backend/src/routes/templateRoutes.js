const express = require("express");
const multer = require("multer");
const router = express.Router();
const TemplateController = require("../controllers/templateController");
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

/*
router.post("/excel", multer({
  storage: storage
}).single("file"), TemplateController.createExcelTemplate );*/

router.post("", TemplateController.createTemplate);

router.put("/:id", TemplateController.changeTemplate);

router.get('', TemplateController.getTemplates);

router.delete("/:id", TemplateController.deleteTemplate);

module.exports = router;


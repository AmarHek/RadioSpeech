const express = require("express");
const multer = require("multer");
const router = express.Router();
const DictController = require("../controllers/dicts");
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




router.post("/excel", multer({
  storage: storage
}).single("file"), DictController.createExcelDict );

router.post("", DictController.createDict);

router.put("/:id", DictController.changeDict );

router.get('', DictController.getDicts);

router.delete("/:id", DictController.deleteDict);

router.post("/radio/excel", multer({
  storage: storage
}).single("file"), DictController.createExcelDictRadio );

router.post("/radio", DictController.createDictRadio);

router.put("/radio/:id", DictController.changeDictRadio );

router.get('/radio', DictController.getDictsRadio);

router.delete("/radio/:id", DictController.deleteDictRadio);

module.exports = router;


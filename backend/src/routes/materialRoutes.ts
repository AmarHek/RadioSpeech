const express = require("express");
const multer = require("multer");
const router = express.Router();
const MaterialController = require("../controllers/materialController");
const path = require("path");
const fs = require("fs");

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

const fileFilter = (req, file, cb) => {
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

router.post("/material", upload, MaterialController.addMaterial)
router.get("/material/all", MaterialController.getAllMaterial)
router.get("/material/query", MaterialController.queryMaterial);
router.delete("/material/:id", MaterialController.deleteMaterial)

module.exports = router;


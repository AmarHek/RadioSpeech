const express = require("express");
const multer = require("multer");
const router = express.Router();
const MaterialController = require("../controllers/materialController");
const nanoid = require("nanoid");
const path = require("path");
const fs = require("fs");

const storageImages = multer.diskStorage({
// TODO: Path dependencies!
  destination: (req, file, cb) => {
    if (!fs.existsSync(path.join("data/images/", req.body.id))) {
    fs.mkdir(path.join("data/images/", req.body.id), (err) => {
      if (err) {
        return console.error(err);
      }
    });}
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
router.get("/material", MaterialController.getMaterial)
router.get("/material/unjudged", MaterialController.getUnjudgedMats);
router.delete("/material/:id", MaterialController.deleteMaterial)

module.exports = router;


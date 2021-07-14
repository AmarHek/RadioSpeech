const express = require("express");
const multer = require("multer");
const router = express.Router();
const MaterialController = require("../controllers/materialController");

const storageImages = multer.diskStorage({
// TODO: Path dependencies!
  destination: (req, file, cb) => {
    if (file.fieldname === "mainScan") {
      cb(null, 'images/main')
    } else if (file.fieldname === "lateralScan") {
      cb(null, 'images/lateral')
    } else {
      cb(null, "images/pre");
    }
  },

  filename: (req, file, cb) => {
    cb(null, file.originalname)
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


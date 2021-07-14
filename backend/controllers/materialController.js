const Material = require('../models/materialSchema');
const fs = require('fs');
const path = require("path");

exports.addMaterial = (req, res, next) => {
    // try {
        let lateralScan;
        let preScan;
        if (req.files.lateralScan) {
            lateralScan = {
                data: fs.readFileSync(path.join('./images/lateral/' + req.files.lateralScan[0].originalname)),
                contentType: req.files.lateralScan[0].mimetype
            }
        }
        if (req.files.preScan) {
            preScan = {
                data: fs.readFileSync(path.join('./images/pre/' + req.files.preScan[0].originalname)),
                contentType: req.files.preScan[0].mimetype
            }
        }
        const material = new Material({
            mainScan: {
                data: fs.readFileSync(path.join('./images/main/' + req.files.mainScan[0].originalname)),
                contentType: req.files.mainScan[0].mimetype
            },
            lateralScan: lateralScan,
            preScan: preScan,
            modality: req.body.modality,
            parts: JSON.parse(req.body.parts),
            judged: false
        });

        console.log(material);

        material.save().then(() => {
            res.status(201).json({
                message: 'Material added successfully'
            });
        });
    // } catch (error) {
    //     console.log(error);
    //     res.status(500).json({
    //       message: "Unexpected behaviour"
    //     })
    // }
};

exports.deleteMaterial = (req, res, next) => {
    try {
        Material.deleteOne({
            _id: req.params.id
        }).then(
            result => {
                console.log(result);
                res.status(200).json({
                    message: "Material deleted"
                });
            });
    } catch (error) {
        res.status(404).json({
            message: "ID not found, could not delete",
            error: error
        })
    }
};

exports.getMaterial = (req, res, next) => {
  Material.find()
    .then(materials => {
      console.log(materials);
      res.status(200).json({
        message: "Materials fetched",
        materials: materials
      });
    });
};

exports.getUnjudgedMats = (req, res, next) => {
    Material.find({judged: false}).then(materials => {
        res.status(200).json({
            message: "Materials fetched",
            materials: materials
        });
    });
}

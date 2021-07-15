const Material = require('../models/materialSchema');
const fs = require('fs');
const path = require("path");

exports.addMaterial = (req, res, next) => {
    console.log("This should be working");
    console.log(req.body);
    try {
        let lateralScan = (req.files.lateralScan !== null);
        let preScan = (req.files.preScan !== null);
        const material = new Material({
            scans: {
                id: req.body.id,
                mainScan: true,
                lateralScan: lateralScan,
                preScan: preScan
            },
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
    } catch (error) {
        console.log(error);
        res.status(500).json({
          message: "Unexpected behaviour"
        })
    }
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

const Material = require('../models/materialSchema');
const fs = require('fs');

  exports.createMaterial = (req, res, next) => {
    const material  = new Material({
      img: {
        data: fs.readFileSync(path.join('backend/images/' + req.file.filename)),
        contentType: 'image/png'
      },
      modality: req.body.modality,
      report: req.body.report,
      parts: req.body.parts,
      defaultParts: req.body.defaultParts,
      pathologies: req.body.pathologies
    });
    material.save().then(result => {
      res.status(201).json({
        message: 'Material added successfully'
      });
    });
  };

    exports.deleteMaterial = (req, res, next) => {
    Material.deleteOne({
      _id: req.params.id
    }).then(
      result => {
        console.log(result);
        res.status(200).json({
          message: "Material deleted"
        });
      });
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


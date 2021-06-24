const Template = require('../models/myTemplate');
const fs = require('file-system');
const {
    parser,
  } = require('../excels/excelParser');

/*
exports.createExcelDict =  (req, res, next) => {
    var xlsx = require('xlsx');
    var workbook = xlsx.readFile('backend/excels/' + req.file.filename);
    console.log("Filename:");
    console.log(req.file.filename);
    var sheet_name_list = workbook.SheetNames;
    var data = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
    /* fs.writeFile('backend/excels/' + req.file.filename +".json", JSON.stringify(data), function (err) {
      if (err) {
          return console.log(err);
      }});
    fs.unlinkSync('backend/excels/' + req.file.filename);
    let parsed = parser(data);
    if (typeof (parsed) == "string") {
      res.status(201).json({
        message: parsed,
        dictId: "false"
      });
    } else {
      var fName = req.file.filename.split(".")[0];
      Endo.findOne({
        name: fName
      }).then(myres => {
        if (myres !== null) {
          fName += "_cpy";
        }
        const endo = new Endo({
          dict: parsed.dict,
          name: fName
        });
        endo.save().then(result => {
          console.log(result._id);
          res.status(201).json({
            message: 'Excel successfully uploaded',
            dictId: result._id
          });
        });
      });

  
    }
     try {
  
      var parsed = parser(data);
      var fName = req.file.filename.split(".")[0];
  
      const endo = new Endo({
        dict: parsed.dict,
        name: fName
      });
      endo.save().then(result => {
        console.log(result._id);
        res.status(201).json({
          message: 'Excel uploaded',
          dictId: result._id
        });
      });
    } catch (error) {
      res.status(201).json({
        message: error.message
      });
    }
  };*/

  exports.createTemplate = (req, res, next) => {
    const template  = new Template({
      parts: req.body.parts,
      name: req.body.name
    });
    template.save().then(result => {
      res.status(201).json({
        message: 'Template added successfully',
        postId: result._id
      });
    });
  };

  exports.changeTemplate = (req, res, next) => {
    const newTemplate = new Template({
      _id: req.params.id,
      parts: req.body.parts,
      name: req.body.name
    });
    Template.updateOne({
        _id: req.params.id
      }, newTemplate)
      .then(result => {
        console.log(result);
        res.status(200).json({
          message: "Update successful"
        });
      });
  };

  exports.deleteTemplate = (req, res, next) => {
    Template.deleteOne({
      _id: req.params.id
    }).then(
      result => {
        console.log(result);
        res.status(200).json({
          message: "Template deleted"
        });
      });
  };

  exports.getTemplates = (req, res, next) => {
    Template.find()
      .then(templates => {
        console.log(templates);
        res.status(200).json({
          message: "Templates fetched",
          templates: templates
        });
      });
  };




  // Routes for Radiology start here -----------------------------

/*
  exports.createExcelDictRadio =  (req, res, next) => {
    var xlsx = require('xlsx');
    var workbook = xlsx.readFile('backend/excels/' + req.file.filename);
    console.log("Filename:");
    console.log(req.file.filename);
    var sheet_name_list = workbook.SheetNames;
    var data = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
    
    fs.unlinkSync('backend/excels/' + req.file.filename);
    let parsed = parser(data);
    if (typeof (parsed) == "string") {
      res.status(201).json({
        message: parsed,
        dictId: "false"
      });
    } else {
      var fName = req.file.filename.split(".")[0];
      Template.findOne({
        name: fName
      }).then(myres => {
        if (myres !== null) {
          fName += "_cpy";
        }
        const radio = new Template({
          dict: parsed.dict,
          name: fName
        });
        radio.save().then(result => {
          console.log(result._id);
          res.status(201).json({
            message: 'Excel successfully uploaded',
            dictId: result._id
          });
        });
      });
  
  
    }

  };*/

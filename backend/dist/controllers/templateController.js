"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTemplates = exports.deleteTemplate = exports.changeTemplate = exports.createTemplate = exports.createJSONTemplate = void 0;
var templateSchema_1 = __importDefault(require("../models/templateSchema"));
var fs_1 = __importDefault(require("fs"));
// import { parser } from '../excel/excelParser';
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
function createJSONTemplate(req, res, next) {
    // TODO: Check JSON for errors and add sufficient messages
    var rawData = fs_1.default.readFileSync(req.file.path);
    var parts = JSON.parse(rawData.toString());
    var timestamp = new Date();
    var template = new templateSchema_1.default({
        parts: parts,
        name: req.body.name,
        timestamp: timestamp
    });
    template.save().then(function (result) {
        res.status(201).json({
            message: "TemplateModel added successfully",
            postId: result._id
        });
    });
}
exports.createJSONTemplate = createJSONTemplate;
function createTemplate(req, res, next) {
    var template = new templateSchema_1.default({
        parts: req.body.parts,
        name: req.body.name,
        timestamp: req.body.timestamp
    });
    template.save().then(function (result) {
        res.status(201).json({
            message: 'TemplateModel added successfully',
            postId: result._id
        });
    });
}
exports.createTemplate = createTemplate;
function changeTemplate(req, res, next) {
    var newTemplate = new templateSchema_1.default({
        _id: req.params.id,
        parts: req.body.parts,
        name: req.body.name,
        timestamp: req.body.timestamp
    });
    templateSchema_1.default.updateOne({
        _id: req.params.id
    }, newTemplate)
        .then(function (result) {
        console.log(result);
        res.status(200).json({
            message: "Update successful"
        });
    });
}
exports.changeTemplate = changeTemplate;
function deleteTemplate(req, res, next) {
    templateSchema_1.default.deleteOne({
        _id: req.params.id
    }).then(function (result) {
        console.log(result);
        res.status(200).json({
            message: "TemplateModel deleted"
        });
    });
}
exports.deleteTemplate = deleteTemplate;
function getTemplates(req, res, next) {
    templateSchema_1.default.find()
        .then(function (templates) {
        res.status(200).json({
            message: "Templates fetched",
            templates: templates
        });
    });
}
exports.getTemplates = getTemplates;
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
      TemplateModel.findOne({
        name: fName
      }).then(myres => {
        if (myres !== null) {
          fName += "_cpy";
        }
        const radio = new TemplateModel({
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

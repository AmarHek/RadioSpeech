const Endo = require('../models/myEndo');
const Radio = require('../models/myRadio');
const fs = require('file-system');
const {
    VariableOC,
    VariableText,
    CheckBox,
    Category,
    Disease,
    myDict
  } = require('../models/dict_old');
  const {
    parser,
  } = require('../excels/excelParser');

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
      }}); */
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
    /* try {
  
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
    } */
  };

  exports.createDict = (req, res, next) => {
    const endo = new Endo({
      dict: req.body.dict,
      name: req.body.name
    });
    endo.save().then(result => {
      res.status(201).json({
        message: 'Disease/Category added successfully',
        postId: result._id
      });
    });
  };

  exports.changeDict = (req, res, next) => {
    const newDict = new Endo({
      _id: req.params.id,
      dict: req.body.dict,
      name: req.body.name
    });
    Endo.updateOne({
        _id: req.params.id
      }, newDict)
      .then(result => {
        console.log(result);
        res.status(200).json({
          message: "Update succ"
        });
      });
  };

  exports.deleteDict = (req, res, next) => {
    Endo.deleteOne({
      _id: req.params.id
    }).then(
      result => {
        console.log(result);
        res.status(200).json({
          message: "Post deleted"
        });
      });
  };

  exports.getDicts = (req, res, next) => {
    //console.log(Endo.findOne());
    Endo.find()
      .then(dicts => {
        console.log(dicts);
        res.status(200).json({
          message: "Dicts fetched",
          myDicts: dicts
        });
      });
  };




  // Routes for Radiology start here -----------------------------


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
      Radio.findOne({
        name: fName
      }).then(myres => {
        if (myres !== null) {
          fName += "_cpy";
        }
        const radio = new Radio({
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

  };


  exports.createDictRadio = (req, res, next) => {
    const radio = new Radio({
      dict: req.body.dict,
      name: req.body.name
    });
    radio.save().then(result => {
      res.status(201).json({
        message: 'Dict added successfully',
        postId: result._id
      });
    });
  };

  exports.changeDictRadio = (req, res, next) => {
    const newDict = new Radio({
      _id: req.params.id,
      dict: req.body.dict,
      name: req.body.name
    });
    Radio.updateOne({
        _id: req.params.id
      }, newDict)
      .then(result => {
        console.log(result);
        res.status(200).json({
          message: "Update succ"
        });
      });
  };

  exports.deleteDictRadio = (req, res, next) => {
    Radio.deleteOne({
      _id: req.params.id
    }).then(
      result => {
        console.log(result);
        res.status(200).json({
          message: "Post deleted"
        });
      });
  };

  exports.getDictsRadio = (req, res, next) => {
    //console.log(Radio.findOne());
    Radio.find()
      .then(dicts => {
        console.log(dicts);
        res.status(200).json({
          message: "Dicts fetched",
          myDicts: dicts
        });
      });
  };

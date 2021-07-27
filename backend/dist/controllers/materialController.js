"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryMaterial = exports.getAllMaterial = exports.deleteMaterial = exports.addMaterial = void 0;
var materialSchema_1 = __importDefault(require("../models/materialSchema"));
var fs_1 = __importDefault(require("fs"));
/*
export interface matRequest extends Request {
    files: {
        mainScan: Express.Multer.File
    }
}*/
// TODO: Define request types properly
function addMaterial(req, res, next) {
    try {
        if (req.files) {
            var material = new materialSchema_1.default({
                scans: {
                    id: req.body.id,
                    mainScan: req.files.mainScan[0].mimetype,
                    lateralScan: (req.files.lateralScan !== undefined) ? req.files.lateralScan[0].mimetype : "None",
                    preScan: (req.files.preScan !== undefined) ? req.files.preScan[0].mimetype : "None"
                },
                modality: req.body.modality,
                parts: JSON.parse(req.body.parts),
                judged: false
            });
            material.save().then(function (mat) {
                console.log("Material with id " + mat._id + " added successfully");
                res.status(201).json({
                    message: 'Material added successfully'
                });
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Unexpected behaviour"
        });
    }
}
exports.addMaterial = addMaterial;
function deleteMaterial(req, res, next) {
    try {
        materialSchema_1.default.deleteOne({
            _id: req.params.id
        }).then(function (result) {
            console.log(result);
            res.status(200).json({
                message: "Material deleted"
            });
        });
    }
    catch (error) {
        res.status(404).json({
            message: "ID not found, could not delete",
            error: error
        });
    }
}
exports.deleteMaterial = deleteMaterial;
function getAllMaterial(req, res, next) {
    materialSchema_1.default.find()
        .then(function (materials) {
        console.log(materials);
        res.status(200).json({
            message: "Materials fetched",
            materials: materials
        });
    });
}
exports.getAllMaterial = getAllMaterial;
;
function queryMaterial(req, res, next) {
    materialSchema_1.default.find(req.query).then(function (mats) {
        var materials = [];
        console.log(mats);
        for (var _i = 0, mats_1 = mats; _i < mats_1.length; _i++) {
            var mat = mats_1[_i];
            var id = mat.scans.id;
            var mainScan = fs_1.default.readFileSync('data/images/' + id + '/mainScan.jpeg', 'base64');
            console.log(mainScan);
        }
    });
}
exports.queryMaterial = queryMaterial;
function readScans(scans) {
}
function readImage(path, mimetype) {
}

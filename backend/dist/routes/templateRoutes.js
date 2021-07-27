"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = __importDefault(require("express"));
var multer_1 = __importDefault(require("multer"));
var TemplateController = __importStar(require("../controllers/templateController"));
var storageExcel = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "data/excels");
    },
    filename: function (req, file, cb) {
        var name = file.originalname.toLowerCase().split(" ").join("-");
        //const ext = file.mimetype;
        cb(null, name + ".xlsx");
    }
});
var storageJSON = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "data/json");
    },
    filename: function (req, file, cb) {
        var name = file.originalname;
        cb(null, name);
    }
});
exports.router = express_1.default.Router();
exports.router.post("/json", multer_1.default({
    storage: storageJSON
}).single("file"), TemplateController.createJSONTemplate);
exports.router.post("", TemplateController.createTemplate);
exports.router.put("/:id", TemplateController.changeTemplate);
exports.router.get('', TemplateController.getTemplates);
exports.router.delete("/:id", TemplateController.deleteTemplate);
// TODO Excel parser
/*
router.post("/excel", multer({
  storage: storageExcel
}).single("file"), TemplateController.createExcelTemplate );*/

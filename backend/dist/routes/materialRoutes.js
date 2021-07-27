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
var MaterialController = __importStar(require("../controllers/materialController"));
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var storageImages = multer_1.default.diskStorage({
    // TODO: Path dependencies!
    destination: function (req, file, cb) {
        if (!fs_1.default.existsSync(path_1.default.join("data/images/", req.body.id))) {
            fs_1.default.mkdirSync(path_1.default.join("data/images/", req.body.id));
        }
        cb(null, path_1.default.join("data/images/", req.body.id));
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "." + file.mimetype.split("/")[1]);
    }
});
var fileFilter = function (req, file, cb) {
    if (file.mimetype === "image/jpg" || file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        cb(null, true);
    }
    else {
        cb(new Error("Das hochgeladene Bild ist kein jpeg oder png"), false);
    }
};
var upload = multer_1.default({
    storage: storageImages,
    fileFilter: fileFilter
}).fields([{
        name: 'mainScan', maxCount: 1
    }, {
        name: 'lateralScan', maxCount: 1
    }, {
        name: 'preScan', maxCount: 1
    }]);
exports.router = express_1.default.Router();
exports.router.post("/material", upload, MaterialController.addMaterial);
exports.router.get("/material/all", MaterialController.getAllMaterial);
exports.router.get("/material/query", MaterialController.queryMaterial);
exports.router.delete("/material/:id", MaterialController.deleteMaterial);

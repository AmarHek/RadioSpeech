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
exports.app = void 0;
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var mongoose_1 = __importDefault(require("mongoose"));
var materialRoutes = __importStar(require("./routes/materialRoutes"));
var templateRoutes = __importStar(require("./routes/templateRoutes"));
exports.app = express_1.default();
// TODO: Auf env auslagern
var url = "mongodb://127.0.0.1:27017/radio";
mongoose_1.default.connect(url, { useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(function () {
    console.log("Connected to db");
})
    .catch(function () {
    console.log("Connection lost");
});
exports.app.use(body_parser_1.default.json());
exports.app.use(body_parser_1.default.urlencoded({
    extended: false
}));
exports.app.set("view engine", "ejs");
exports.app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    next();
});
exports.app.use("/radio/database", materialRoutes.router);
exports.app.use("/radio/database", templateRoutes.router);
//app.get("/*", (req,res)=> res.sendFile(path.join(__dirname)));

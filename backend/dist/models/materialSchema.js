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
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importStar(require("mongoose"));
var materialSchema = new mongoose_1.Schema({
    scans: {
        id: { type: String, required: true },
        mainScan: { type: String, required: true },
        lateralScan: String,
        preScan: String
    },
    modality: { type: String, required: true },
    parts: { type: mongoose_1.default.Schema.Types.Mixed, required: true },
    pathologies: [{ name: String, present: Boolean }],
    judged: { type: Boolean }
});
exports.default = mongoose_1.default.model("Material", materialSchema, "material");

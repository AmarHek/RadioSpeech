import mongoose from 'mongoose';
import {Material, UsageData} from "./material.model";

const imageSchema = new mongoose.Schema({
    filename: String,
    mimetype: String
})

const annotationSchema = new mongoose.Schema({
    boxes: [{left: Number, top: Number, height: Number, width: Number, label: String}],
    label: {type: String},
    comment: {type: String},
    correct: {type: Boolean},
    labelLeft: {type: Number},
    labelTop: {type: Number}
})

const usageDataScheme = new mongoose.Schema({
    deepDocTemplate: { type: mongoose.Schema.Types.Mixed, required: true },
    shallowDocTemplate: { type: mongoose.Schema.Types.Mixed, required: true },
    mode: {type: String},
    timestamp:  {type: Number},
    duration:  {type: Number}
});

export const UsageDataDB = mongoose.model<UsageData>("UsageData", usageDataScheme, "usageData");

const materialSchema = new mongoose.Schema({
    scans: {
        id:  {type: String, required: true},
        mainScan: {type: imageSchema, required: true},
        lateralScan: imageSchema,
        preScan: imageSchema
    },
    annotations: {
        main: [annotationSchema],
        lateral: [annotationSchema],
        pre: [annotationSchema],
    },
    modality: { type: String, required: true },
    deepDocTemplate: { type: mongoose.Schema.Types.Mixed, required: true },
    shallowDocTemplate: { type: mongoose.Schema.Types.Mixed, required: true },
    pathologies: {type: [String]},
    timestamp:  {type: Number},
    judged: { type: Boolean }
});

export const MaterialDB = mongoose.model<Material>("Material", materialSchema, "material");

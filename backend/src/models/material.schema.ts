import mongoose from 'mongoose';
import {Material, DoctorReport} from "./material.model";

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

const doctorReportScheme = new mongoose.Schema({
    template: {type: [mongoose.Schema.Types.Mixed]},
    timestamp: {type: Number},
    duration: {type: Number},
    imageID: {type: String},
    layoutID: {type: Number},
    mode: {type: String},
    report: {type: String},
    pseudonym: {type: String}
})

export const DoctorReportDB = mongoose.model<DoctorReport>("DoctorReport", doctorReportScheme, "doctorReports")

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
    timestamp:  {type: Number},
    lastModified: {type: Number},
    judged: { type: Boolean }
});

export const MaterialDB = mongoose.model<Material>("Material", materialSchema, "material");

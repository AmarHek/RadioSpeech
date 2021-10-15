import mongoose from 'mongoose';
import {Material} from "./material.model";

const imageSchema = new mongoose.Schema({
    filename: String,
    mimetype: String
})

const materialSchema = new mongoose.Schema({
    scans: {
        id:  {type: String, required: true},
        mainScan: {type: imageSchema, required: true},
        lateralScan: imageSchema,
        preScan: imageSchema
    },
    coordinates: {
        main: [{left: Number, top: Number, height: Number, width: Number, label: String}],
        lateral: [{left: Number, top: Number, height: Number, width: Number, label: String}],
        pre: [{left: Number, top: Number, height: Number, width: Number, label: String}],
    },
    modality: { type: String, required: true },
    template: { type: mongoose.Schema.Types.Mixed, required: true},
    pathologies: [{ name: String, present: Boolean }],
    judged: { type: Boolean }
});

export default mongoose.model<Material>("Material", materialSchema, "material");
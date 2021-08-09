import mongoose, {Schema, Document} from 'mongoose';
import * as M from './templateModel';
import {Pathology, BoundingBox, Image, Material} from "./materialModel";

/*
export interface MaterialDB extends Document {
    scans: {
        id: string;
        mainScan: Image;
        lateralScan?: Image;
        preScan?: Image;
    };
    coordinates?: {
        main?: BoundingBox[];
        lateral?: BoundingBox[];
        pre?: BoundingBox[];
    }
    modality: string;
    parts: M.TopLevel[];
    pathologies: Pathology[];
    judged: boolean;
}*/

const imageSchema = new Schema({
    filename: String,
    mimetype: String
})

const materialSchema = new Schema({
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
    parts: { type: mongoose.Schema.Types.Mixed, required: true},
    pathologies: [{ name: String, present: Boolean }],
    judged: { type: Boolean }
});

export default mongoose.model<Material>("Material", materialSchema, "material");

import mongoose, {Schema, Document} from 'mongoose';
import * as M from './templateModel';
import { Pathology, BoundingBox } from "./materialModel";

export interface MaterialDB extends Document {
    scans: {
        id: string;
        mainScan: string;
        lateralScan: string;
        preScan: string;
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
}

const materialSchema = new Schema({
    scans: {
        id:  {type: String, required: true},
        mainScan: {type: String, required: true},
        lateralScan: String,
        preScan: String
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

export default mongoose.model<MaterialDB>("Material", materialSchema, "material");

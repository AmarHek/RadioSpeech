import mongoose, {Schema, Document} from 'mongoose';
import * as M from '../excel/templateModel';

export interface Material extends Document {
    scans: {
        id: string;
        mainScan: string;
        lateralScan: string;
        preScan: string;
    };
    modality: string;
    parts: M.TopLevel[];
    pathologies: [{
        name: string;
        present: boolean;
    }];
    judged: boolean;
}

const materialSchema = new Schema({
    scans: {
        id:  {type: String, required: true},
        mainScan: {type: String, required: true},
        lateralScan: String,
        preScan: String
    },
    
    modality: { type: String, required: true },
    parts: { type: mongoose.Schema.Types.Mixed, required: true},
    pathologies: [{ name: String, present: Boolean }],
    judged: { type: Boolean }
});

export default mongoose.model<Material>("Material", materialSchema, "material");

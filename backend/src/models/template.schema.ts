import mongoose, {Schema, Document} from 'mongoose';
import * as M from './template.model';

export interface TemplateDoc extends Document {
    parts:      M.TopLevel[];
    name:       string;
    timestamp:  number;
}

const templateSchema = new Schema({
    parts: { type: mongoose.Schema.Types.Mixed, required: true},
    name: { type: String },
    timestamp: { type: Number }
});

export const TemplateDB = mongoose.model<TemplateDoc>('Template', templateSchema, "templates");

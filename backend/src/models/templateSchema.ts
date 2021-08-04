import mongoose, {Schema, Document} from 'mongoose';
import * as M from './templateModel';

export interface TemplateDB extends Document {
    parts:      M.TopLevel[];
    name:       string;
    timestamp:  Date;
}

/*
const selectableSchema = new Schema({

})

const categorySchema = new Schema({
    kind: "category",
    name: String,
    optional: Boolean,
    selectables: selectableSchema
})*/

const templateSchema = new Schema({
    parts: { type: mongoose.Schema.Types.Mixed, required: true},
    name: { type: String },
    timestamp: { type: Date }
});

export default mongoose.model<TemplateDB>('Template', templateSchema, "templates");

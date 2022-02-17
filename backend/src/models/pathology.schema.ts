import * as mongoose from "mongoose";
import {TemplateMap} from "./pathology.model";

export interface pathologyDoc extends mongoose.Document {
    name: string;
    englishName: string;
    templateMaps: TemplateMap[];
}

export const PathologyDB = mongoose.model<pathologyDoc>(
    "Pathology",
    new mongoose.Schema({
        name: {type: String},
        englishName: {type: String},
        templateMaps: {type: mongoose.Schema.Types.Mixed}
    }),
    "pathology"
);
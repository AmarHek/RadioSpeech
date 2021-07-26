import mongoose from 'mongoose';

const templateSchema = new mongoose.Schema({
    parts: { type: mongoose.Schema.Types.Mixed, required: true},
    name: { type: String },
    timestamp: { type: Date }
});

export const Template = mongoose.model('Template', templateSchema, "templates");

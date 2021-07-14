const mongoose = require('mongoose');

const materialSchema = new mongoose.Schema({
    mainScan: {
        data: Buffer,
        contentType: String
    },
    lateralScan: {
        data: Buffer,
        contentType: String
    },
    preScan: {
        data: Buffer,
        contentType: String
    },
    modality: { type: String, required: true },
    parts: { type: mongoose.Schema.Types.Mixed, required: true},
    pathologies: [{ name: String, present: Boolean }],
    judged: { type: Boolean }
});

module.exports = mongoose.model("Material", materialSchema, "material");

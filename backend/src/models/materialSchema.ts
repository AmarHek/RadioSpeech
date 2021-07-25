const mongoose = require('mongoose');

const materialSchema = new mongoose.Schema({
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

module.exports = mongoose.model("Material", materialSchema, "material");

const mongoose = require('mongoose');

const materialSchema = new mongoose.Schema({
    img: {
        data: Buffer,
        contentType: String
    },
    modality: { type: String, required: true },
    report: { type: String, required: true },
    parts: { type: mongoose.Schema.Types.Mixed, required: true},
    defaultParts: { type: mongoose.Schema.Types.Mixed, required: true},
    pathologies: [{ name: String, present: Boolean }]
});

module.exports = mongoose.model('Material', materialSchema);

const mongoose = require('mongoose');

const templateSchema = new mongoose.Schema({
    parts: { type: mongoose.Schema.Types.Mixed, required: true},
    name: { type: String}
});

module.exports = mongoose.model('Template', templateSchema);

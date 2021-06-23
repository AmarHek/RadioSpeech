const mongoose = require('mongoose');

const radioSchema = mongoose.Schema({
    dict: { type: mongoose.Schema.Types.Mixed, required: true},
    name: { type: String}
});

module.exports = mongoose.model('Radio', radioSchema);

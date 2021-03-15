const mongoose = require('mongoose');


const endoSchema = mongoose.Schema({
    dict: { type: mongoose.Schema.Types.Mixed, required: true},
    name: { type: String}
});

module.exports = mongoose.model('Endo', endoSchema);
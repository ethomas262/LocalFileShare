const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    name: {type: String, require: true},
    url: { type: String, required: true },
    link: {type: String, required: true }
});

const File = mongoose.model('file', fileSchema);

module.exports = File;
const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    author: { type: String, required: true, index: true },
    time: { type: String, required: true },
    message: { type: String, required: true } ,
    timeStamp: {type: String, required: true }
});

const Trip = mongoose.model('message', messageSchema);

module.exports = Trip;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AppSchema = new Schema({
    start: {
        type: Boolean,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    order: {
        type: Number,
        required: true
    },
    count: {
        type: Number,
        required: true
    },
    message: {
        type: String,
        required: true
    }
});

module.exports = App = mongoose.model('app', AppSchema);
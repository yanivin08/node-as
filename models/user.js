//model for users
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    first_name:{
        type: String,
        required: true
    },
    second_name:{
        type: String,
        required: true
    },
    position:{
        type: String,
        required: true
    },
    user_type:{
        type: String,
        default: 'User'
    },
    password: {
        type: String,
        required: true
    },
    register_date: {
        type: Date,
        default: Date.now
    }
});

module.exports = User = mongoose.model('user', UserSchema);
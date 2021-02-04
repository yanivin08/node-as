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
    email:{
        type: String,
        required: true
    },
    position:{
        type: String,
        required: true
    },
    department: {
        type: String
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
    },
    change_password: {
        type: Boolean,
        default: true
    },
    active: {
        type: Boolean,
        default: true
    }
});

module.exports = User = mongoose.model('user', UserSchema);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    order: {
        type: Number,
        required: true
    },
    appt_start: {
        type: Date,
        required: true
    },
    appt_end: {
        type: Date,
        required: true
    },
    vendor: {
        account: {
            type: String,
            required: true
        },
        name:{
            type: String,
            required: true
        },
        address:{
            type: String,
            required: true
        }
    },
    reference: {
        number: {
            type: String,
            required: true
        }
    },
    appt_type: {
        type: String,
        required: true
    },
    //Status can be "New Appointment", "Set Appointment", "Confirmed Appointment", "Cancelled Appointment", "Pending Appointment", "Appointment Completed"
    status: {
        type: String,
        default: "New Appointment"
    },
    date_extracted: {
        type: Date,
        default: Date.now
    }
});

module.exports = Order = mongoose.model('order', OrderSchema);
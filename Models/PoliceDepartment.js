const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PoliceSchema = new Schema({
    County: {
        type: String,
        required: true
    },
    City: {
        type: String,
        required: true
    },
    Name: {
        type: String,
        required: true
    },
    Adress: {
        type: String,
        required: true
    },
    Phone: {
        type: String,
        required: true
    }
});

const Police = mongoose.model('policeDepartment', PoliceSchema);
module.exports = Police;

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JusticeSchema = new Schema({
    Name: {
        type: String,
        required: true
    },
    County: {
        type: String,
        required: true

    },
    City: {
        type: String,
        required: true
    },

    Adress: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    Phone: {
        type: String,
        required: true
    }
});

const Justice = mongoose.model('justiceDepartment', JusticeSchema);
module.exports = Justice;

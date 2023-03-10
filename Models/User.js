const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({

    Name: {
        type: String,
        required: true
    },
    Surname: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    }
});

const User = mongoose.model('user', UserSchema);
module.exports = User;

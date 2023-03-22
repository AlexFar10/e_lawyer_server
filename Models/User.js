const mongoose = require('mongoose');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
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
        required: true,
        unique: true,
    },
    Password: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                const passwordSchema = Joi.object({
                    password: Joi.string()
                        .min(8)
                        .max(32)
                        //.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=[\]{}|\\;:'",.<>/?])/)
                        .required(),
                });

             //   const { error } = passwordSchema.validate({ password: v });
              //  return error === undefined;
            },
            //message: props =>
            //    `${props.value} is not a valid password! Password must be at least 8 characters, at most 32 characters, contain at least one uppercase letter, one lowercase letter, one number, and one symbol`
        },
    },
    role: {
        type: String,
        enum: ['client', 'lawyer', 'admin'],
        default: 'client'
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
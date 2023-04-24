const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Joi = require('joi');

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
        required: true,
        unique: true,
      /*  validate: {
            validator: (email) => {
                const schema = Joi.string().email();
                return schema.validate(email).error === null;
            },
            message: 'Invalid email format',
        },*/
    },
    Password: {
        type: String,
        required: true,
       // validate: {
       //     validator: (password) => {
       //         const schema = Joi.string()
        //            .min(8)
        //            .max(32)
        //            .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\\-={}|\\[\\]\\\\;\':"<>?,./])'))
        //            .messages({
        //                'string.min': 'Password must be at least 8 characters',
        //                'string.max': 'Password can be at most 32 characters',
        //                'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one symbol',
        //            });
         //       return schema.validate(password).error === null;
         //   },
        //    message: 'Invalid password format',
       // },
    },
    Role: {
        type: String,
        enum: ['client', 'avocat','admin'],
        default:'client'
    },
});

const User = mongoose.model('user', UserSchema);
module.exports = User;
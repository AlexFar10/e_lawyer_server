const createError = require('http-errors');
const Form = require('../models/Complaint');

module.exports = {
    createForm: async (req, res, next) => {
        try {
            const form = new Form(req.body);
            const result = await form.save();
            res.send(result);
        } catch (error) {
            console.log(error.message);
            if (error.name === 'ValidationError') {
                next(createError(422, error.message));
                return;
            }
            next(error);
        }
    },

    getFormById: async (req, res, next) => {
        try {
            const id = req.params.id;
            const form = await Form.findById(id);
            if (!form) {
                throw createError(404, 'Form not found');
            }
            res.send(form);
        } catch (error) {
            console.log(error.message);
            if (error instanceof mongoose.CastError) {
                next(createError(400, 'Invalid Form ID'));
                return;
            }
            next(error);
        }
    },

    getAllForms: async (req, res, next) => {
        try {
            const forms = await Form.find();
            res.send(forms);
        } catch (error) {
            console.log(error.message);
            next(error);
        }
    },

    updateFormById: async (req, res, next) => {
        try {
            const id = req.params.id;
            const update = req.body;
            const options = { new: true };
            const form = await Form.findByIdAndUpdate(id, update, options);
            if (!form) {
                throw createError(404, 'Form not found');
            }
            res.send(form);
        } catch (error) {
            console.log(error.message);
            if (error instanceof mongoose.CastError) {
                next(createError(400, 'Invalid Form ID'));
                return;
            }
            next(error);
        }
    },

    deleteFormById: async (req, res, next) => {
        try {
            const id = req.params.id;
            const form = await Form.findByIdAndDelete(id);
            if (!form) {
                throw createError(404, 'Form not found');
            }
            res.send(form);
        } catch (error) {
            console.log(error.message);
            if (error instanceof mongoose.CastError) {
                next(createError(400, 'Invalid Form ID'));
                return;
            }
            next(error);
        }
    }
};
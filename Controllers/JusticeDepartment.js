const createError = require('http-errors');
const mongoose = require('mongoose');
const Product = require('../Models/JusticeDepartment');
const mongosee = require("mongoose");


module.exports = {
    getAllJusticeDepartments: async (req, res, next) => {
        try {
            const result = await Product.find({},{__v:0,_id:0})
            res.send(result)
        } catch (error) {
            console.log(error.message)
        }
    },

    createNewJusticeDepartment: async (req, res, next) => {
        try {
            const product = new Product(req.body);
            const result = await product.save();
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

    findJusticeDepartmentById: async (req, res, next) => {
        try {
            const id = req.params.id
            const result = await Product.findOne({_id:id},{__v:0})
            if(!result){
                throw createError(404, 'not found')
            }
            res.send(result)
        } catch (error) {
            console.log(error.message)
            if(error instanceof mongosee.CastError){
                next(createError(400,'Invalid'))
                return;
            }
            next(error)
        }
    },

    updateJusticeDepartment: async (req, res, next) => {
        try {
            const id = req.params.id
            const update = req.body
            const option = {new: true}
            const result = await Product.findByIdAndUpdate(id,update,option)
            if(!result){
                throw createError(404, 'not found')
            }
            res.send(result)
        } catch (error) {
            console.log(error.message)
            if(error instanceof mongosee.CastError){
                next(createError(400,'Invalid'))
                return;
            }
        }
    },

    deleteJusticeDepartment: async (req, res, next) => {
        try {
            const id = req.params.id
            const result = await Product.findByIdAndDelete(id)
            if(!result){
                throw createError(404, 'not found')
            }
            res.send(result)
        } catch (error) {
            console.log(error.message)
            if(error instanceof mongosee.CastError){
                next(createError(400,'Invalid'))
                return;
            }
            next(error)
        }
}}

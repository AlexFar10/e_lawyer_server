const createError = require('http-errors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const User = require('../Models/User');
const mongosee = require("mongoose");
const jwt = require("jsonwebtoken")
const Product = require("../Models/PoliceDepartment");

const env =
    {
        JWT_KEY: "super_secret"
    }

module.exports = {
    getAllUsers: async (req, res, next) => {
        try {
            const result = await User.find({},{__v:0,_id:0})
            res.send(result)
        } catch (error) {
            console.log(error.message)
        }
    },
    createNewUser:  async (req, res, next) => {
        User.find({ Email: req.body.Email })
            .exec()
            .then(user => {
                if (user.length >= 1) {
                    return res.status(409).json({
                        message: "Mail exists"
                    });
                } else {
                    bcrypt.hash(req.body.Password, 10, (err, hash) => {
                        if (err) {
                            return res.status(500).json({
                                error: err
                            });
                        } else {
                            const user = new User({
                                Name: req.body.Name,
                                Surname: req.body.Surname,
                                Email: req.body.Email,
                                Password: hash
                            });
                            user.save()
                                .then(result => {
                                    console.log(result);
                                    res.status(201).json({
                                        message: "User created"
                                    });
                                })
                                .catch(err => {
                                    console.log(err);
                                    res.status(500).json({
                                        error: err
                                    });
                                });
                        }
                    });
                }
            });
    },

    deleteUser: (req, res, next) => {
        User.remove({ _id: req.params.id })
            .exec()
            .then(result => {
                res.status(200).json({
                    message: "User deleted"
                });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });
    },

    loginUser: async (req, res, next) => {
        User.find({ Email: req.body.Email })
            .exec()
            .then(user => {
                if (user.length < 1) {
                    return res.status(401).json({
                        message: "Auth failed"


                    });
                }
                bcrypt.compare(req.body.Password, user[0].Password, (err, result) => {
                    if (err) {
                        return res.status(401).json({
                            message: "Auth failed"
                        });
                    }
                    if (result) {
                        const token = jwt.sign(
                            {
                                Email: user[0].Email,
                                id: req.params.id
                            },
                            env.JWT_KEY,
                            {
                                expiresIn: "1h"
                            }
                        );
                        return res.status(200).json({
                            message: "Auth successful",
                            token: token
                        });
                    }

                    res.status(401).json({

                        message: "Auth failed"
                    });
                });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });
    }

            }

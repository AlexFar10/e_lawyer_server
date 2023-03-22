const bcrypt = require('bcrypt')
const User = require('../Models/User');
const jwt = require("jsonwebtoken")

const env = {
    JWT_KEY: "super_secret"
};

module.exports = {
    getAllUsers: async (req, res, next) => {
        try {
            const result = await User.find({}, { __v: 0, _id: 0 })
            res.send(result)
        } catch (error) {
            console.log(error.message)
        }
    },

    createNewUser: async (req, res, next) => {
        try {
            const existingUser = await User.findOne({ Email: req.body.Email });
            if (existingUser) {
                return res.status(409).json({
                    message: "Email address is already registered",
                });
            }

            let role = "client";
            if (req.body.Email.endsWith("@elawyer_lawyer.com")) {
                role = "lawyer";
            } else if (req.body.Email.endsWith("@elawyer_admin.com")) {
                role = "admin";
            }

            const hashedPassword = await bcrypt.hash(req.body.Password, 10);

            const newUser = new User({
                Name: req.body.Name,
                Surname: req.body.Surname,
                Email: req.body.Email,
                Password: hashedPassword,
                role: role,
            });

            await newUser.save();

            return res.status(201).json({
                message: "User created",
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                error: error.message,
            });
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            await User.deleteOne({ _id: req.params.id });
            return res.status(200).json({
                message: "User deleted",
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                error: error.message,
            });
        }
    },

    loginUser: async (req, res, next) => {
        try {
            const user = await User.findOne({ Email: req.body.Email });
            if (!user) {
                return res.status(401).json({
                    message: "Auth failed"
                });
            }
            const isMatch = await bcrypt.compare(req.body.Password, user.Password);
            if (!isMatch) {
                return res.status(401).json({
                    message: "Auth failed"
                });
            }

            let role;
            if (user.Email.endsWith("@elawyer_lawyer.com")) {
                role = "lawyer";
            } else if (user.Email.endsWith("@elawyer_admin.com")) {
                role = "admin";
            } else {
                role = "client";
            }

            const token = jwt.sign(
                {
                    userId: user._id,
                    role: role
                },
                env.JWT_KEY,
                {
                    expiresIn: "1h"
                }
            );
            res.status(200).json({
                message: "Auth successful",
                token: token
            });
        } catch (err) {
            console.log(err);
            res.status(500).json({
                error: err
            });
        }
    }
};
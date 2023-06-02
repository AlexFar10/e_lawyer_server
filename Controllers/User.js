const bcrypt = require('bcrypt')
const User = require('../Models/User');
const jwt = require("jsonwebtoken")
require('dotenv').config()
var nodemailer = require("nodemailer");

module.exports = {
    getAllUsers: async (req, res, next) => {
        try {
            const result = await User.find({}, {})
            res.send(result)
        } catch (error) {
            console.log(error.message)
        }
    },
    updateUsers: async (req, res, next) => {
        try {
            const userId = req.params.id;
            const updatedData = req.body;
            const existingUser = await User.findById(userId);
            if (!existingUser) {
                return res.status(404).json({
                    message: "User not found",
                });
            }

            existingUser.Name = updatedData.Name || existingUser.Name;
            existingUser.Surname = updatedData.Surname || existingUser.Surname;
            existingUser.Email = updatedData.Email || existingUser.Email;
            existingUser.Role = updatedData.Role || existingUser.Role;

            await existingUser.save();

            return res.status(200).json({
                message: "User updated",
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                error: error.message,
            });
        }
    },
    getUserById: async (req, res, next) => {
        try {
            const result = await User.findOne({ _id: req.params.id }, { __v: 0, _id: 0 })
            if (!result) {
                return res.status(404).send({ message: 'User not found' })
            }
            res.send(result)
        } catch (error) {
            console.log(error.message)
        }
    },
    getUserByNameAndSurname: async (req, res, next) => {
        try {
            const { firstName, lastName } = req.params
            const result = await User.findOne({ firstName, lastName }, { __v: 0, _id: 0 })
            if (!result) {
                return res.status(404).send({ message: 'User not found' })
            }
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


            const hashedPassword = await bcrypt.hash(req.body.Password, 10);

            const newUser = new User({
                Name: req.body.Name,
                Surname: req.body.Surname,
                Email: req.body.Email,
                Password: hashedPassword,
                Role: req.body.Role || 'client'

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


            const token = jwt.sign(
                {
                    userId: user._id,
                    role: user.Role

                },
                process.env.JWT_KEY,
                {
                    expiresIn: "1h"
                }
            );
            res.status(200).json({
                message: "Auth successful",
                token: token,
                role: user.Role,
                id: user._id

            });
        } catch (err) {
            console.log(err);
            res.status(500).json({
                error: err
            });
        }
    },

    forgotPassword: async (req, res, next) => {
        const { email } = req.body;
        try {
            const oldUser = await User.findOne({ email });
            if (!oldUser) {
                return res.json({ status: "User Not Exists!!" });
            }
            const secret = process.env.JWT_KEY + oldUser.password;
            const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
                expiresIn: "5m"
            });
            //console.log(email);
            const link = `http://localhost:3001/reset-password/${oldUser._id}/${token}`;
            var transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: "alexandru.farcas01@e-uvt.ro",
                    pass: "yhsdthwrleknuqri"
                },
                tls: {
                    rejectUnauthorized: false
                }
            });
            var mailOptions = {
                from: "alexandru.farcas01@e-uvt.ro",
                to: email,
                subject: "Password Reset",
                text: link,
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log("Email sent: " + info.response);
                }
            });
            console.log(link);
        } catch (error) { }
    },


    postResetPassword: async (req, res, next) => {
        const { email, token } = req.params;
        const { password } = req.body;

        try {
            const oldUser = await User.findOne({Email:email});

            if (!oldUser) {
                return res.json({ status: "User Not Exists!!" });
            }

            const secret = process.env.JWT_KEY + oldUser.password;
            const verify = jwt.verify(token, secret);

            const encryptedPassword = await bcrypt.hash(password, 10);
            oldUser.Password = encryptedPassword;
            await oldUser.save();

            res.json({ status: "Password updated successfully" });
        } catch (error) {
            console.log(error);
            res.json({ status: "Something Went Wrong" });
        }
    },
};

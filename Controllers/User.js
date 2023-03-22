const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const env = {
    JWT_KEY: 'super_secret'
};

module.exports = {
    getAllUsers: async (req, res) => {
        try {
            const result = await User.find({}, { __v: 0, _id: 0 });
            res.send(result);
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ error: 'Server error' });
        }
    },

    createNewUser: async (req, res) => {
        try {
            const existingUser = await User.findOne({ Email: req.body.Email });

            if (existingUser) {
                return res.status(400).send('Email already exists');
            }

            const role = req.body.Email.endsWith('@elawyer_lawyer.com')
                ? 'lawyer'
                : req.body.Email.endsWith('@elawyer_admin.com')
                    ? 'admin'
                    : 'client';

            const hashedPassword = await bcrypt.hash(req.body.Password, 10);
            const newUser = new User({
                Name: req.body.Name,
                Surname: req.body.Surname,
                Email: req.body.Email,
                Password: hashedPassword,
                role:role,
            });
            await newUser.save();
            return res.status(201).json({ message: 'User created' });
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ error: 'Server error' });

        }
    },

    deleteUser: async (req, res) => {
        try {
            await User.deleteOne({ _id: req.params.id });
            res.status(200).json({ message: 'User deleted' });
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ error: 'Server error' });
        }
    },

    loginUser: async (req, res) => {
        try {
            const user = await User.findOne({ Email: req.body.Email });
            if (!user) {
                return res.status(401).json({ message: 'Invalid email or password' });
            }

            const isMatch = await bcrypt.compare(req.body.Password, user.Password);
            if (!isMatch) {
                return res.status(401).json({ message: 'Invalid email or password' });
            }

            const role = req.body.Email.endsWith('@elawyer_lawyer.com')
                ? 'lawyer'
                : req.body.Email.endsWith('@elawyer_admin.com')
                    ? 'admin'
                    : 'client';

            const token = jwt.sign({ userId: user._id, role }, env.JWT_KEY, { expiresIn: '1h' });
            res.status(200).json({ message: 'Login successful', token });
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ error: 'Server error' });
        }
    },
};
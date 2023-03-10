const express = require('express');
const router = express.Router();

const UserController = require('../Controllers/User');

//Create a new User
router.post('/signup', UserController.createNewUser);

//Login a User
router.post('/login', UserController.loginUser);

//Delete a  User
router.delete('/:id', UserController.deleteUser);

router.get('/', UserController.getAllUsers)

module.exports = router;

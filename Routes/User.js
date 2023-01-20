const express = require('express');
const router = express.Router();

const UserController = require('../Controllers/User');

//Create a new User
router.post('/singup', UserController.createNewUser);

//Login a User
router.post('/login', UserController.loginUser);

//Delete a  User
//router.delete('/:id', UserController.deleteUser);

router.get('/', UserController.getUser)


module.exports = router;

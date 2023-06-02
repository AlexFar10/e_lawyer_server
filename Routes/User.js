const express = require('express');
const router = express.Router();

const UserController = require('../Controllers/User');

//Create a new User
router.post('/signup', UserController.createNewUser);

//Login a User
router.post('/login', UserController.loginUser);

//Delete a  User
router.delete('/:id', UserController.deleteUser);
router.get('/:id', UserController.getUserById);
router.patch('/:id', UserController.updateUsers);

router.get('/', UserController.getAllUsers)

router.get('/:firstName/:lastName', UserController.getUserByNameAndSurname)


router.post('/forgot-password',UserController.forgotPassword)
router.patch('/reset-password/:email/:token',UserController.postResetPassword)

module.exports = router;

const express = require('express');
const router = express.Router();
const check_auth = require('../middleware/check_auth')
const JusticeController = require('../Controllers/JusticeDepartment');
const bodyParser = require("body-parser");



router.use(bodyParser.json())
//Get a list of all JusticeDepartments
router.get('/', JusticeController.getAllJusticeDepartments);

//Create a new JusticeDepartment
router.post('/', check_auth, JusticeController.createNewJusticeDepartment);

//Get  JusticeDepartment by id
router.get('/:id', JusticeController.findJusticeDepartmentById);

//Update JusticeDepartment by id
router.patch('/:id',check_auth, JusticeController.updateJusticeDepartment);

//Delete JusticeDepartment by id
router.delete('/:id',check_auth, JusticeController.deleteJusticeDepartment);

module.exports = router;

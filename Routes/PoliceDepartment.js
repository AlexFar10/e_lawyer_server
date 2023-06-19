const express = require('express');
const router = express.Router();

const PoliceController = require('../Controllers/PoliceDepartment');
const bodyParser = require("body-parser");
const check_auth = require("../middleware/check_auth");
router.use(bodyParser.json())
//Get a list of all PoliceDepartments
router.get('/', PoliceController.getAllPoliceDepartments);

//Create a new PoliceDepartment
router.post('/',check_auth, PoliceController.createNewPoliceDepartment);

//Get  PoliceDepartment by id
router.get('/:id', PoliceController.findPoliceDepartmentById);
router.get('/city/:city', PoliceController.findPoliceDepartmentByCity);

//Update PoliceDepartment by id
router.patch('/:id',check_auth, PoliceController.updatePoliceDepartment);

//Delete PoliceDepartment by id
router.delete('/:id',check_auth, PoliceController.deletePoliceDepartment);

module.exports = router;

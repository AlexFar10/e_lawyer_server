const express = require('express');
const router = express.Router();
const FormController = require('../controllers/Complaint');

// Create a new form
router.post('/', FormController.createForm);

// Get all forms
router.get('/', FormController.getAllForms);

// Get a form by ID
router.get('/:id', FormController.getFormById);

// Update a form by ID
router.patch('/:id', FormController.updateFormById);

// Delete a form by ID
router.delete('/:id', FormController.deleteFormById);

module.exports = router;
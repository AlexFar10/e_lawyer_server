const express = require("express");
const uploadController = require("../Controllers/Complain");
const router = express.Router();

router.get("/:id", uploadController.getComplainById);
router.post("/", uploadController.createComplain);
router.put("/:id", uploadController.updateComplain);
router.delete("/:id", uploadController.deleteComplain);

module.exports = router;
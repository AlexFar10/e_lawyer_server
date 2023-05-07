const express = require("express");
const uploadController = require("../Controllers/Complain");
const router = express.Router();

router.get("id/:id", uploadController.getComplainById);
router.get("userid/:id", uploadController.getComplainByUserId);
router.get("lawyer/:id", uploadController.getLawyerComplain);
router.post("/", uploadController.createComplain);
router.put("/:id", uploadController.updateComplain);
router.delete("/:id", uploadController.deleteComplain);

module.exports = router;
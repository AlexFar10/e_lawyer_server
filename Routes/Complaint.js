const express = require("express");
const uploadController = require("../Controllers/Complaint");
const router = express.Router();

router.get("/id/:id", uploadController.getComplainById);
router.get("/userid/:id", uploadController.getComplainByUserId);
router.put("/userid/:id", uploadController.updateComplainByUserId);
router.get("/lawyer/:id", uploadController.getLawyerComplain);
router.post("/", uploadController.createComplain);
router.put("/:id", uploadController.updateComplain);
router.delete("/:id", uploadController.deleteComplain);

module.exports = router;
const express = require("express");
const uploadController = require("../Controllers/uploadController");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const uploadStorage = multer({ storage });

const router = express.Router();

router.get("/:id", uploadController.getUploadsById);
router.post("/", uploadStorage.array("file"), uploadController.createUpload);
router.put("/:id", uploadController.updateUploadById);
router.delete("/:id", uploadController.deleteUploadById);

module.exports = router;
const express = require("express");
const multer = require("multer");
const {
    uploadFiles,
    getFiles,
    deleteFile
} = require('../Controllers/File');
const {updateFile} = require("../Controllers/File");

const router = express.Router();
const upload = multer({ dest: "uploads/" });



// Multiple files upload route
router.post('/file', upload.array('file'), uploadFiles);


router.get('/file', getFiles);

router.put('/file/:id', updateFile);

// Delete file route
router.delete('/file/:id', deleteFile);


module.exports = router;

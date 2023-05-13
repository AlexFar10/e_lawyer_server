const express = require("express");
const multer = require("multer");
const {
    uploadFiles,
    getFiles,
    deleteFile, getFilesByUserId, getDownloadFiles
} = require('../Controllers/File');
const {updateFile} = require("../Controllers/File");

const router = express.Router();
const upload = multer({ dest: "uploads/" });



// Multiple files upload route
router.post('/', upload.array('file'), uploadFiles);


router.get('/', getFiles);
router.get('/download/:filename', getDownloadFiles);
router.get('/user/:id', getFilesByUserId);

// Delete file route
router.delete('/:id', deleteFile);


module.exports = router;

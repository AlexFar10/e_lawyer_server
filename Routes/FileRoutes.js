const express = require("express");
const multer = require("multer");
const {
    uploadFiles,
    getFiles,
    deleteFile
} = require('../controllers/fileController');

const router = express.Router();
const upload = multer({ dest: "uploads/" });



// Multiple files upload route
router.post('/file', upload.array('file'), uploadFiles);


router.get('/file', getFiles);


// Delete file route
router.delete('/file/:id', deleteFile);


module.exports = router;

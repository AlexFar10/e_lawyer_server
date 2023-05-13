const File = require("../Models/File");
const fs = require('fs');

const getFiles = async (req, res) => {
    try {
        const files = await File.find();
        res.json(files);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve files" });
    }
};
const getDownloadFiles = async (req, res) => {
    try {
        const filename = req.params.filename;
        const file = await File.findOne({ filename });

        if (!file) {
            return res.status(404).json({ error: 'File not found' });
        }

        const filePath = file.filePath;
        res.download(filePath);
    } catch (error) {
        res.status(500).json({ error: 'Failed to download file' });
    }
};

const deleteFile = async (req, res) => {
    try {
        const fileId = req.params.id;
        const file = await File.findByIdAndDelete(fileId);

        if (!file) {
            return res.status(404).json({ error: 'File not found' });
        }

        // Remove the file from the folder
        fs.unlink(file.filePath, (error) => {
            if (error) {
                console.log('Failed to delete file:', error);
            }
        });

        res.json({ message: 'File deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete file' });
    }
};

const uploadFiles = async (req, res) => {
    try {
        const files = req.files;

        if (Array.isArray(files) && files.length > 0) {
            const fileArray = [];

            files.forEach((file) => {
                const { originalname, path } = file;
                const newFile = new File({
                    filename: originalname,
                    filePath: path,
                    Observations: req.body.Observations, // Set the "Observations" field from the request body
                    UserID: req.body.UserID,
                });

                fileArray.push(newFile);
            });

            await File.insertMany(fileArray);

            res.json(fileArray);
        } else {
            throw new Error("File upload unsuccessful");
        }
    } catch (error) {
        res.status(500).json({ error: "File upload unsuccessful" });
    }
};


const getFilesByUserId = async (req, res) => {
    try {
        const userId = req.params.id; // Get the user ID from the route parameter
        console.log(userId)
        const files = await File.find({ UserID: userId }); // Find files matching the provided user ID
        res.json(files);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve files' });
    }
};

module.exports = {
    getFiles,
    deleteFile,
    uploadFiles,
    getFilesByUserId,
    getDownloadFiles
};

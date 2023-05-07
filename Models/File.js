const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
    filename: String,
    filePath: String,
    Observations:String,
    UserID:String,
});

const File = mongoose.model("File", fileSchema);

module.exports = File;

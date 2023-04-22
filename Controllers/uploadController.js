const Upload = require("../Models/uploadSchema");
const fs = require("fs");
const path = require("path");
exports.getUploadsById = async (req, res) => {
    try {
        const upload = await Upload.findById(req.params.id);
        return res.status(200).json({
            success: true,
            data: upload,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: "Server Error",
        });
    }
};

exports.createUpload = async (req, res) => {
    try {
        const upload = new Upload({
            Name:req.body.Name,
            Surname:req.body.Surname,
            Phone:req.body.Phone,
            Email:req.body.Email,
            Adress:req.body.Adress,
            PoliceName:req.body.PoliceName,
            PoliceSurname:req.body.PoliceSurname,
            PoliceRole:req.body.PoliceRole,
            PoliceInstitution:req.body.PoliceInstitution,
            EventPlace:req.body.EventPlace,
            VerbalProcess:req.body.VerbalProcess,
            SeriesVerbalProcess:req.body.SeriesVerbalProcess,
            NumberVerbalProcess:req.body.NumberVerbalProcess,
            DateVerbalProcess:req.body.DateVerbalProcess,
            HandingOutVerbalProcess:req.body.HandingOutVerbalProcess,
            DateOfHandingOutVerbalProcess:req.body.DateOfHandingOutVerbalProcess,
            DateOfEvent:req.body.DateOfEvent,
            PayTheFine:req.body.PayTheFine,
            Options:req.body.Options,
            DescriptionOfTheEventInVerbalProcess:req.body.DescriptionOfTheEventInVerbalProcess,
            DescriptionOfTheEventInPersonalOpinion:req.body.DescriptionOfTheEventInPersonalOpinion,
            LawNumberEvent:req.body.LawNumberEvent,
            LawParagraphEvent:req.body.LawParagraphEvent,
            LawRuleEvent:req.body.LawRuleEvent,
            LawNumberPay:req.body.LawNumberPay,
            LawParagraphPay:req.body.LawParagraphPay,
            LawRulePay:req.body.LawRulePay,
            Witnesses:req.body.Witnesses,
            Judge:req.body.Judge,
            Lawyer:req.body.Lawyer,
            Document: req.files.map((file) => ({
                fileName: file.filename,
                filePath: file.path,
            })),
        });
        await upload.save();
        return res.status(201).json({
            success: true,
            data: upload,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: "Server Error",
        });
    }
};


exports.updateUploadById = async (req, res) => {
    try {
        const { Name, Surname, Document } = req.body;
        const upload = await Upload.findByIdAndUpdate(
            req.params.id,
            { Name, Surname, Document },
            { new: true }
        );
        return res.status(200).json({
            success: true,
            data: upload,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: "Server Error",
        });
    }
};


exports.deleteUploadById = async (req, res) => {
    try {
        const upload = await Upload.findByIdAndRemove(req.params.id);

        // delete file from uploads folder
        for (let i = 0; i < upload.Document.length; i++) {
            const filePath = upload.Document[i].filePath;
            fs.unlinkSync(filePath);
        }

        return res.status(200).json({
            success: true,
            data: upload,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: "Server Error",
        });
    }
};

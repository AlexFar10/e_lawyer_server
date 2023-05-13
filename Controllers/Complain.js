const Upload = require("../Models/Complain");
exports.getLawyerComplain = async (req, res) => {
    try {
        let query = {};

        if (req.body.Pay === 'DA') {
            query = { Pay: 'DA' };
        }

        const uploads = await Upload.find({ UserId: req.params.userId, ...query });

        return res.status(200).json({
            success: true,
            data: uploads,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: "Server Error",
        });
    }
};
exports.getComplainByUserId = async (req, res) => {
    try {

        const uploads = await Upload.find({ UserId: req.params.id});

        return res.status(200).json({
            success: true,
            data: uploads,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: "Server Error",
        });
    }
};
exports.getComplainById = async (req, res) => {
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

exports.createComplain = async (req, res) => {
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
            Pay:req.body.Pay || 'NU',
            UserID:req.body.UserID
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
exports.updateComplain = async (req, res) => {
    try {
        const upload = await Upload.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!upload) {
            return res.status(404).json({
                success: false,
                error: "Upload not found",
            });
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

exports.deleteComplain = async (req, res) => {
    try {
        const upload = await Upload.findByIdAndDelete(req.params.id);

        if (!upload) {
            return res.status(404).json({
                success: false,
                error: "Upload not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: {},
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: "Server Error",
        });
    }
};

exports.getComplain = async (req, res) => {
    try {
        const uploads = await Upload.find();

        return res.status(200).json({
            success: true,
            data: uploads,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: "Server Error",
        });
    }
};





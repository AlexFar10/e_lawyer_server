const mongoose = require("mongoose");

const complain = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
    },
    Surname: {
        type: String,
        required: true,
    },
    Phone: {
        type: String,
        required: true,
    },
    Email: {
        type: String,
        required: true,
    },
    Adress: {
        type: String,
        required: true,
    },
    PoliceName: {
        type: String,
        required: true,
    },
    PoliceSurname: {
        type: String,
        required: true,
    },
    PoliceRole: {
        type: String,
        required: true,
    },
    PoliceInstitution: {
        type: String,
        required: true,
    },
    EventPlace: {
        type: String,
        required: true,
    },
    VerbalProcess: {
        type: String,
        enum: ['DA', 'NU'],
    },
    SeriesVerbalProcess: {
        type: String,
        required: true,
    },
    NumberVerbalProcess: {
        type: String,
        required: true,
    },
    DateVerbalProcess: {
        type: String,
        required: true,
    },
    HandingOutVerbalProcess: {
        type: String,
        enum: ['PRIN INMABARE LA FATA LOCULUI', 'PRIN POSTA'],
    },
    DateOfHandingOutVerbalProcess: {
        type: String,
        required: true,
    },
    DateOfEvent: {
        type: String,
        required: true,
    },
    PayTheFine: {
        type: String,
        enum: ['DA', 'NU'],
    },
    Options: {
        type: String,
        enum: [
            'Doresc anularea amenzi pentru că sunt nevinovat iar amenda este abuzivă. Am documente şi martori care să ateste nevinovaţia mea',
            'Doresc preschimbarea amenzii în avertisment pentru că deşi sunt vinovat, sunt la prima abatere contravenţională.',
            'Doresc reducerea cuantumului amenzii pentru că amenda primită reprezintă maximul din cât mi se putea aplica sau este disproporţionată în raport de veniturile mele'
        ],
    },
    DescriptionOfTheEventInVerbalProcess: {
        type: String,
        required: true,
    },
    DescriptionOfTheEventInPersonalOpinion: {
        type: String,
        required: true,
    },
    LawNumberEvent: {
        type: String,
        required: true,
    },
    LawParagraphEvent: {
        type: String,
        required: true,
    },
    LawRuleEvent: {
        type: String,
        required: true,
    },
    LawNumberPay: {
        type: String,
        required: true,
    },
    LawParagraphPay: {
        type: String,
        required: true,
    },
    LawRulePay: {
        type: String,
        required: true,
    },
    Witnesses: {
        type: String,
        enum: ['DA', 'NU'],
    },
    Judge: {
        type: String,
        enum: [
            'Doresc să particip la şedinţele de judecată',
            'Doresc judecarea cererii de chemare în judecată în lipsa mea',
        ],
    },
    Lawyer: {
        type: String,
        enum: ['DA', 'NU'],
    },
    Pay: {
        type: String,
        enum: ['DA', 'NU'],
        default:'DA'
    },
});


const Upload = mongoose.model("Upload", complain);

module.exports = Upload;
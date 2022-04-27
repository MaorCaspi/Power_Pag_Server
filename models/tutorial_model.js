const mongoose = require("mongoose")

const tutorialSchema = new mongoose.Schema({
    hebrewURL: {
        type: String,
        required: false
    },
    englishURL: {
        type: String,
        required: false
    }
})

module.exports = mongoose.model('Tutorial', tutorialSchema)
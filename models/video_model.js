const mongoose = require("mongoose")

const videoSchema = new mongoose.Schema({
    hebrewURL: {
        type: String,
        required: false
    },
    englishURL: {
        type: String,
        required: false
    }
})

module.exports = mongoose.model('Video', videoSchema)
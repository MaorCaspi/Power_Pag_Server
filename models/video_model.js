const mongoose = require("mongoose")

const videoSchema = new mongoose.Schema({
    _id: {//the url
        type: String,
        required: true
    },
    language: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Video', videoSchema)
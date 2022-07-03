const mongoose = require("mongoose")

const informationSchema = new mongoose.Schema({
    subject: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    removalStatus: {
        type: Boolean,
        required: true,
        default: false
    }
})

module.exports = mongoose.model('information', informationSchema)
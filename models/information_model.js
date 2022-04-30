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
    }
})

module.exports = mongoose.model('information', informationSchema)
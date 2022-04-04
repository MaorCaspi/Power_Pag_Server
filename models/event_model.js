const mongoose = require("mongoose")

const eventSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    sender: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Event', eventSchema)
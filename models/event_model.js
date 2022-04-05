const mongoose = require("mongoose")

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    place: {
        type: String,
        required: false
    },
    dateAndTime: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Event', eventSchema)
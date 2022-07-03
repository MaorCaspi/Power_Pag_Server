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
        type: Date,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    participants: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
        }
    ],
    removalStatus: {
        type: Boolean,
        required: true,
        default: false
    }
})

module.exports = mongoose.model('Event', eventSchema)
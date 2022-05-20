const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    israeliId: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    adminPrivilege: {
        type: Boolean,
        required: true,
        default: false
    },
    registeredEvents: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Event"
        }
    ],
    myBabyData: {
        gender: {
            type: String,
            required: false
        },
        dateOfBirth: {
            type: Date,
            required: false
        },
        birthWeek: {
            type: mongoose.Decimal128,
            required: false
        },
        birthWeight: {
            type: mongoose.Decimal128,
            required: false
        },
        firstHoldDate: {
            type: Date,
            required: false
        },
        firstKangarooDate: {
            type: Date,
            required: false
        },
        oneKiloDate: {
            type: Date,
            required: false
        },
        twoKiloDate: {
            type: Date,
            required: false
        },
        independentBreathingDate: {
            type: Date,
            required: false
        },
        firstCribDate: {
            type: Date,
            required: false
        },
        firstBottleDate: {
            type: Date,
            required: false
        },
        firstFeedDate: {
            type: Date,
            required: false
        },
        notNeedZondaDate: {
            type: Date,
            required: false
        },
        releaseHomeDate: {
            type: Date,
            required: false
        }
    }
})

module.exports = mongoose.model('User', userSchema)
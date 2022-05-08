const Event = require('../models/event_model')
const User = require('../models/user_model')

const getEvents = async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*")

     var dateNow = new Date();
     dateNow.setHours(dateNow.getHours() + (dateNow.getTimezoneOffset()/(-60)));

    try {
        events = await Event.find({dateAndTime: { $gt: dateNow }}, {"__v":0}).sort({dateAndTime: 1}).populate({
            path:"participants", select:["fullName","email","phoneNumber","israeliId"]});
        res.status(200).send(events)
    } catch (err) {
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
    }
}

const getEventById = async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*")
    try {
        event = await Event.findById({"_id" : req.params.id}, {"__v":0}).populate({
            path:"participants", select:["fullName","email","phoneNumber","israeliId"]});
        res.status(200).send(event)
    } catch (err) {
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
    }
}

const addNewEvent = (req, res) => {
    res.header("Access-Control-Allow-Origin", "*")
    var event;
    if(req.file){
        const { path: image } = req.file;
        event = Event({
            name: req.body.name,
            dateAndTime: new Date(req.body.dateAndTime),
            place: req.body.place,
            description: req.body.description,
            image: process.env.SERVER_URL+"/"+image.replace('\\','/')
        })
    }
    else{
        event = Event({
            name: req.body.name,
            dateAndTime: new Date(req.body.dateAndTime),
            place: req.body.place,
            description: req.body.description
        })
    }

    event.save((error, newEvent) => {
        if (error) {
            res.status(400).send({
                'status': 'fail',
                'error': error.message
            })
        } else {
            res.status(200).send(newEvent)
        }
    })
}

const registerToEvent = async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*")
    try {
        await Event.findByIdAndUpdate({"_id" : req.body.eventId },{ $addToSet: { participants: req.body.userId } },
        { new: true, useFindAndModify: false });
        await User.findByIdAndUpdate({"_id" : req.body.userId },{ $addToSet: { registeredEvents: req.body.eventId } },
        { new: true, useFindAndModify: false });
        res.status(200).send("Registration successful")
    } catch (err) {
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
    }
}

module.exports = {
    getEvents,
    getEventById,
    addNewEvent,
    registerToEvent
}
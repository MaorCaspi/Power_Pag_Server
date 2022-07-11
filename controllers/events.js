const Event = require('../models/event_model')
const User = require('../models/user_model')

const getEvents = async (req, res) => {

     var dateNow = new Date();
     dateNow.setHours(dateNow.getHours() + (dateNow.getTimezoneOffset()/(-60)));

    try {
        events = await Event.find({dateAndTime: { $gt: dateNow }, "removalStatus" : false}, {"__v":0, "removalStatus":0}).sort({dateAndTime: 1}).populate({
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
    try {
        eventResult = await Event.findById({"_id" : req.params.id}, {"__v":0}).populate({
            path:"participants", select:["fullName","email","phoneNumber","israeliId"]});
        if(!eventResult){
            res.status(404).send("No such ID found");
        }
        else{
            res.status(200).send(eventResult);
        }
    } catch (err) {
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
    }
}

const addNewEvent = (req, res) => {
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
    try {
        eventResult = await Event.findByIdAndUpdate({"_id" : req.body.eventId },{ $addToSet: { participants: req.body.userId } },
        { new: true, useFindAndModify: false });
        if(!eventResult){
            return res.status(404).send("No such event ID found");
        }
        user = await User.findByIdAndUpdate({"_id" : req.body.userId },{ $addToSet: { registeredEvents: req.body.eventId } },
        { new: true, useFindAndModify: false });
        if(!user){
            return res.status(404).send("No such user ID found");
        }
        return res.status(200).send("Registration successful");
    } catch (err) {
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
    }
}

const unregisterFromEvent = async (req, res) => {
    try {
        eventResult = await Event.findByIdAndUpdate({"_id" : req.body.eventId },{ $pull: { participants: req.body.userId } },
        { new: false, useFindAndModify: false });
        if(!eventResult){
            return res.status(404).send("No such event ID found");
        }
        user = await User.findByIdAndUpdate({"_id" : req.body.userId },{ $pull: { registeredEvents: req.body.eventId } },
        { new: false, useFindAndModify: false });
        if(!user){
            return res.status(404).send("No such user ID found");
        }
        return res.status(200).send("Registration was cancel successful");
    } catch (err) {
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
    }
}

const deleteEvent = async (req, res) => {
    try {
        eventResult = await Event.findByIdAndUpdate({"_id" : req.params.id}, {"removalStatus":true});
        if(!eventResult){
            res.status(404).send("No such ID found");
        }
        else{
            res.status(200).send("Successful");
        }
    } catch (err) {
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
    }
}

const EditEvent = async (req, res) => {
    try {
        const updateObject = req.body;

        if(req.file){
            const imagePath= process.env.SERVER_URL+"/"+req.file.replace('\\','/');
            updateObject["image"] = imagePath;
        }
    
        const updatedEvent = await Event.findByIdAndUpdate({"_id" : req.params.id}, {$set: updateObject}, { new: true });
        if(!updatedEvent){
            res.status(404).send("No such event object ID found");
        }
        else{
            res.status(200).send(updatedEvent);
        }
       
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
    registerToEvent,
    unregisterFromEvent,
    deleteEvent,
    EditEvent
}
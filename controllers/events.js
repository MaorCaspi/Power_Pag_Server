const Event = require('../models/event_model')

const getEvents = async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*")
    try {
        events = await Event.find()
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
        events = await Event.findById(req.params.id)
        res.status(200).send(events)
    } catch (err) {
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
    }
}

const addNewEvent = (req, res) => {
    res.header("Access-Control-Allow-Origin", "*")
    const event = Event({
        name: req.body.name,
        dateAndTime: req.body.dateAndTime,
        place: req.body.place,
        discription: req.body.discription
    })

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

module.exports = {
    getEvents,
    getEventById,
    addNewEvent
}
const Information = require('../models/information_model')

const getInformations= async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*")
    try {
        informations = await Information.find({}, {"__v":0}).sort({subject: 1});
        res.status(200).send(informations);
    } catch (err) {
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
    }
}

const getInformationById = async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*")
    try {
        information = await Information.findOne({"_id" : req.params.id}, {"__v":0});
        res.status(200).send(information);
    } catch (err) {
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
    }
}

const addNewInformation = (req, res) => {
    res.header("Access-Control-Allow-Origin", "*")
    const information = Information({
        subject: req.body.subject,
        title: req.body.title,
        text: req.body.text
    })

    information.save((error, newInformation) => {
        if (error) {
            res.status(400).send({
                'status': 'fail',
                'error': error.message
            })
        } else {
            res.status(200).send(newInformation)
        }
    })
}

const getInformationSubjects = async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*")
    try {
        subjects = await Information.find().distinct("subject");
        res.status(200).send(subjects);
    } catch (err) {
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
    }
}

const getInformationsBySubject = async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*")
    try {
        informations = await Information.find({"subject" : req.params.subject}, {"__v":0});
        res.status(200).send(informations);
    } catch (err) {
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
    }
}

module.exports = {
    getInformations,
    getInformationById,
    addNewInformation,
    getInformationSubjects,
    getInformationsBySubject
}
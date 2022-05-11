const Information = require('../models/information_model')

const getInformations= async (req, res) => {
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
    try {
        information = await Information.findById({"_id" : req.params.id}, {"__v":0});
        res.status(200).send(information);
    } catch (err) {
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
    }
}

const addNewInformation = (req, res) => {
    var information;
    const { subject, title, text} = req.body;
    console.log(req.body)
    if(req.file){
        const { path: image } = req.file;
        information = Information({
            subject,
            title,
            text,
            image: process.env.SERVER_URL+"/"+image.replace('\\','/')
        })
    }
    else{
        information = Information({
            subject,
            title,
            text
        })
    }

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
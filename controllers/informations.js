const Information = require('../models/information_model')

const getInformations= async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*")
    try {
        informations = await Information.find({}, {"__v":0});
        res.status(200).send(informations)
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
        res.status(200).send(information)
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

module.exports = {
    getInformations,
    getInformationById,
    addNewInformation
}
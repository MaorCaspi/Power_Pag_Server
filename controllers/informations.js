const Information = require('../models/information_model')

const getInformations= async (req, res) => {
    try {
        informations = await Information.find({"removalStatus" : false}, {"__v":0, "removalStatus":0}).sort({subject: 1});
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
        if(!information){
            res.status(404).send("No such ID found");
        }
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
            res.status(200).send(newInformation);
        }
    })
}

const getInformationSubjects = async (req, res) => {
    try {
        subjects = await Information.find({"removalStatus" : false}).distinct("subject");
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
        if(informations){
            res.status(404).send("There is no informations with this subject name");
        }
        res.status(200).send(informations);
    } catch (err) {
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
    }
}

const deleteInformationById = async (req, res) => {
    try {
        information = await Information.findByIdAndUpdate({"_id" : req.params.id}, {"removalStatus":true});
        if(!information){
            res.status(404).send("No such ID found");
        }
        res.status(200).send("Successful");
    } catch (err) {
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
    }
}

const EditInformation = async (req, res) => {
    try {
        const updateObject = req.body;

        if(req.file){
            const imagePath= process.env.SERVER_URL+"/"+req.file.replace('\\','/');
            updateObject["image"] = imagePath;
        }
    
        const updatedInformation = await Information.findByIdAndUpdate({"_id" : req.params.id}, {$set: updateObject}, { new: true });
        if(!updatedInformation){
            res.status(404).send("No such ID found");
        }
        res.status(200).send(updatedInformation);

       
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
    getInformationsBySubject,
    deleteInformationById,
    EditInformation
}
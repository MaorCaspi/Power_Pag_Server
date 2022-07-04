const Tutorial = require('../models/tutorial_model')

const getTutorials= async (req, res) => {
    try {
        tutorials = await Tutorial.find({"removalStatus" : false, "removalStatus":0}, {"__v":0});
        res.status(200).send(tutorials);
    } catch (err) {
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        });
    }
}

const addNewTutorial = (req, res) => {
    const tutorial = Tutorial({
        hebrewURL: req.body.hebrewURL,
        englishURL: req.body.englishURL
    })

    tutorial.save((error, newTutorial) => {
        if (error) {
            res.status(400).send({
                'status': 'fail',
                'error': error.message
            })
        } else {
            res.status(200).send(newTutorial)
        }
    })
}

const deleteTutorialById = async (req, res) => {
    try {
        await Tutorial.findByIdAndUpdate({"_id" : req.params.id}, {"removalStatus":true});
        res.status(200).send("Successful");
    } catch (err) {
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
    }
}

module.exports = {
    getTutorials,
    addNewTutorial,
    deleteTutorialById
}
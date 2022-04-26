const Video = require('../models/video_model')

const getVideos= async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    try {
        videos = await Video.find({}, {"__v":0});
        res.status(200).send(videos);
    } catch (err) {
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        });
    }
}

const addNewVideo = (req, res) => {
    res.header("Access-Control-Allow-Origin", "*")
    const video = Video({
        hebrewURL: req.body.hebrewURL,
        englishURL: req.body.englishURL
    })

    video.save((error, newVideo) => {
        if (error) {
            res.status(400).send({
                'status': 'fail',
                'error': error.message
            })
        } else {
            res.status(200).send(newVideo)
        }
    })
}

module.exports = {
    getVideos,
    addNewVideo
}
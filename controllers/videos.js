const Video = require('../models/video_model')

const getVideos= async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*")
    lang=req.query.language;
    try {
        if(!lang){
            videos = await Video.find({}, {"__v":0});
        }
        else{
            videos = await Video.find({"language" : lang}, {"language": 0, "__v":0});
        }
        res.status(200).send(videos)
    } catch (err) {
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
    }
}

const addNewVideo = (req, res) => {
    res.header("Access-Control-Allow-Origin", "*")
    const video = Video({
        _id: req.body._id,
        language: req.body.language
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
const User = require('../models/user_model')
const bcrypt = require('bcrypt')
const { use } = require('../routes')
const jwt = require('jsonwebtoken')

const sendError = (res,code,msg)=>{
    return res.status(code).send({
        'status': 'fail',
        'error': msg
    })
}

const register = async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*")
    const email = req.body.email.toLowerCase()
    const password = req.body.password
    const fullName = req.body.fullName
    const israeliId = req.body.israeliId
    const phoneNumber = req.body.phoneNumber

    try{
        const exists = await User.findOne({'israeliId' : israeliId})
        if (exists != null){
            return res.status(400).send({
                'status': 'fail',
                'error': 'user exists'
            })
        }
        const salt = await bcrypt.genSalt(10)
        const hashPwd = await bcrypt.hash(password,salt)

        const user = User({
            'email' : email,
            'password': hashPwd,
            'fullName' : fullName,
            'israeliId' : israeliId,
            'phoneNumber' : phoneNumber
        })
        newUser = await user.save();
        res.status(200).send({'fullName' : fullName, 'adminPrivilege' : user.adminPrivilege, 'objectId' : newUser._id})

    }catch(err){
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
    }
}

const login = async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*")
    const israeliId = req.body.israeliId
    const password = req.body.password
    if (israeliId == null || password == null) return sendError(res,400,'Wrong Id or password')
    
    try{
        const user = await User.findOne({'israeliId' : israeliId })
        if (user == null) return sendError(res,400,'Wrong Id or password')

        const match = await bcrypt.compare(password, user.password)
        if (!match) return sendError(res,400,'Wrong ID or password')

        const accessToken = await jwt.sign(
            {'id':user._id},
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: process.env.JWT_TOKEN_EXPIRATION}
            )
        res.status(200).send({/*'accessToken' : accessToken,*/'fullName' : user.fullName, 'adminPrivilege' : user.adminPrivilege, 'objectId' : user._id})

    }catch(err){
        return sendError(res,400,err.message)
    }
}

const getRegisteredEventsByUserId = async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*")
    var dateNow = new Date();
     dateNow.setHours(dateNow.getHours() + (dateNow.getTimezoneOffset()/(-60)));

    try {
        events = await User.findById({"_id" : req.params.id}, {"registeredEvents":1}).populate({
            path:"registeredEvents", match:{dateAndTime: { $gt: dateNow }}, select:["name","place","dateAndTime"]});
        res.status(200).send(events)
    } catch (err) {
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
    }
}

module.exports = {
    login,
    register,
    getRegisteredEventsByUserId
}
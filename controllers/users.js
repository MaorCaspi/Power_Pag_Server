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
    var dateNow = new Date();
     dateNow.setHours(dateNow.getHours() + (dateNow.getTimezoneOffset()/(-60)));

    try {
        events = await User.findById({"_id" : req.params.id}, {"registeredEvents":1}).populate({
            path:"registeredEvents", match:{dateAndTime: { $gt: dateNow }}, select:["name","place","dateAndTime"]});
        if(!events){
            res.status(404).send("No such user ID found");
        }
        else{
            res.status(200).send(events);
        }
    } catch (err) {
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
    }
}

const getMyBabyDataByUserId = async (req, res) => {
    try {
        myBabyData = await User.findById({"_id" : req.params.id}, {"myBabyData":1});
        if(!myBabyData){
            res.status(404).send("No such user ID found");
        }
        else{
            res.status(200).send(myBabyData);
        }
    } catch (err) {
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
    }
}

const addMyBabyDataByUserId = async (req, res) => {
    const {userObjectId, gender, dateOfBirth, birthWeek, birthWeight, firstHoldDate, firstKangarooDate, oneKiloDate, twoKiloDate, independentBreathingDate, firstCribDate, firstBottleDate, firstFeedDate, notNeedZondaDate, releaseHomeDate} = req.body;

    try {
        if(req.file){
            const { path: image } = req.file;
            user = await User.findByIdAndUpdate({"_id" : userObjectId },{ "myBabyData.image" : process.env.SERVER_URL+"/"+image.replace('\\','/')},{ new: true, useFindAndModify: false });
        }
        user = await User.findByIdAndUpdate({"_id" : userObjectId },{ "myBabyData.gender" : gender, "myBabyData.dateOfBirth" : dateOfBirth, "myBabyData.birthWeek" : birthWeek, "myBabyData.birthWeight" : birthWeight, "myBabyData.firstHoldDate" : firstHoldDate, "myBabyData.firstKangarooDate" : firstKangarooDate, "myBabyData.oneKiloDate" : oneKiloDate, "myBabyData.twoKiloDate" : twoKiloDate, "myBabyData.independentBreathingDate" : independentBreathingDate, "myBabyData.firstCribDate" : firstCribDate, "myBabyData.firstBottleDate" : firstBottleDate, "myBabyData.firstFeedDate" : firstFeedDate, "myBabyData.notNeedZondaDate" : notNeedZondaDate, "myBabyData.releaseHomeDate" : releaseHomeDate},
        { new: true, useFindAndModify: false });
        if(!user){
            res.status(404).send("No such user ID found");
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

const addMyBabyGrowthDataByUserId = async (req, res) => {
    const {userObjectId, measurementDate, weight, headCircumference} = req.body;

    try {
        const growth= {measurementDate: measurementDate, weight:weight, headCircumference:headCircumference};
        user = await User.findByIdAndUpdate({"_id" : userObjectId},{ $push: { myBabyGrowth: growth } });
        if(!user){
            res.status(404).send("No such user ID found");
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

const getMyBabyGrowthDataByUserId = async (req, res) => {
    try {
        myBabyGrowthData = await User.findById({"_id" : req.params.id}, {"myBabyGrowth":1});
        if(!myBabyGrowthData){
            res.status(404).send("No such user ID found");
        }
        else{
            res.status(200).send(myBabyGrowthData);
        }
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
    getRegisteredEventsByUserId,
    getMyBabyDataByUserId,
    addMyBabyDataByUserId,
    getMyBabyGrowthDataByUserId,
    addMyBabyGrowthDataByUserId
}
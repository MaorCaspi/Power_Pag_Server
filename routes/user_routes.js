const express = require('express')
const router = express.Router()

const User = require('../controllers/users')

const upload = require('../middlewares/upload')

/**
* @swagger
* tags:
*   name: User Api
*   description: The user API
*/

/**
* @swagger
* components:
*   schemas:
*     User:
*       type: object
*       required:
*         - email
*         - password
*         - fullName
*         - israeliId
*         - phoneNumber
*       properties:
*         email:
*           type: string
*           description: The user's email address
*         password:
*           type: string
*           description: The user's password
*         fullName:
*           type: string
*           description: The user's full name
*         israeliId:
*           type: string
*           description: The user's israeli ID
*         phoneNumber:
*           type: string
*           description: The user's phone number
*         adminPrivilege:
*           type: boolian
*           description: True = Admin Privilege, the defult is false
*         registeredEvents:
*           type: array[objectid]
*           description: The object IDs of events registered by the user
*       example:
*         email: 'test@gmail.com'
*         password: '123456'
*         fullName: 'Maor Caspi'
*         israeliId: '208460410'
*         phoneNumber: '0547929879'
*/

/**
* @swagger
* /user/login:
*   post:
*     summary: Login to server
*     tags: [User Api]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/User'
*             properties:
*                israeliId:
*                  type: string
*                password:
*                  type: string
*             required:
*               - israeliId
*               - password
*     responses:
*       200:
*         description: Login successfully
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/User'
*       400:
*         description: Error
*/
router.post('/login', User.login)

/**
* @swagger
* /user/register:
*   post:
*     summary: register to server
*     tags: [User Api]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/User'
*             properties:
*                email:
*                  type: string
*                password:
*                  type: string
*                fullName:
*                  type: string
*                israeliId:
*                  type: string
*                phoneNumber:
*                  type: string
*             required:
*               - email
*               - password
*               - fullName
*               - israeliId
*               - phoneNumber
*     responses:
*       200:
*         description: Register successfully, return the full name and the user's permission
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/User'
*       400:
*         description: Error
*/
router.post('/register', User.register)

/**
* @swagger
* /user/getRegisteredEventsByUserId/{id}:
*   get:
*     summary: Get registered events by user object Id, sorted by the date and time in ascending order
*     tags: [User Api]
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: The user object id
*     responses:
*       200:
*         description: Success
*       400:
*         description: Error
*/
router.get('/getRegisteredEventsByUserId/:id', User.getRegisteredEventsByUserId)

/**
* @swagger
* /user/getMyBabyDataByUserId/{id}:
*   get:
*     summary: Get "My baby" data by user object Id
*     tags: [User Api]
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*           default: 625c28e22c082ff25282e43e
*         required: true
*         description: The user object id
*     responses:
*       200:
*         description: Success
*       400:
*         description: Error
*/
router.get('/getMyBabyDataByUserId/:id', User.getMyBabyDataByUserId)

/**
* @swagger
* /user/addMyBabyDataByUserId:
*   post:
*     summary: Add or edit "My baby" data to specific user by user object Id
*     tags: [User Api]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             properties:
*                userObjectId:
*                  type: string
*                  default: 625c28e22c082ff25282e43e
*                gender:
*                  type: string
*                  default: Male
*                dateOfBirth:
*                  type: string
*                  default: 2022-06-30
*                birthWeek:
*                  type: number
*                  default: 28.5
*                birthWeight:
*                  type: number
*                  default: 1.14
*                firstHoldDate:
*                  type: string
*                  default: 2022-06-30
*                firstKangarooDate:
*                  type: string
*                  default: 2022-06-30
*                oneKiloDate:
*                  type: string
*                  default: 2022-06-30
*                twoKiloDate:
*                  type: string
*                  default: 2022-06-30
*                independentBreathingDate:
*                  type: string
*                  default: 2022-06-30
*                firstCribDate:
*                  type: string
*                  default: 2022-06-30
*                firstBottleDate:
*                  type: string
*                  default: 2022-06-30
*                firstFeedDate:
*                  type: string
*                  default: 2022-06-30
*                notNeedZondaDate:
*                  type: string
*                  default: 2022-06-30
*                releaseHomeDate:
*                  type: string
*                  default: 2022-06-30
*     responses:
*       200:
*         description: Success
*       400:
*         description: Error
*/
router.post('/addMyBabyDataByUserId', upload.single('image'), User.addMyBabyDataByUserId)

/**
* @swagger
* /user/addMyBabyGrowthDataByUserId:
*   post:
*     summary: Add "My baby Growth" data to specific user by user object Id
*     tags: [User Api]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             properties:
*                userObjectId:
*                  type: string
*                  default: 625c28e22c082ff25282e43e
*                measurementDate:
*                  type: string
*                  default: 2022-06-30
*                weight:
*                  type: number
*                  default: 1.02
*                headCircumference:
*                  type: number
*                  default: 5.03
*     responses:
*       200:
*         description: Success
*       400:
*         description: Error
*/
router.post('/addMyBabyGrowthDataByUserId', User.addMyBabyGrowthDataByUserId)

/**
* @swagger
* /user/getMyBabyGrowthDataByUserId/{id}:
*   get:
*     summary: Get "My baby Growth" array of data by user object Id
*     tags: [User Api]
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*           default: 625c28e22c082ff25282e43e
*         required: true
*         description: The user object id
*     responses:
*       200:
*         description: Success
*       400:
*         description: Error
*/
router.get('/getMyBabyGrowthDataByUserId/:id', User.getMyBabyGrowthDataByUserId)

module.exports = router
const express = require('express')
const router = express.Router()

const User = require('../controllers/users')

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
* /user/getRegisteredEventsByUserId:
*   get:
*     summary: Logout from server----------------------------------------------------------------------------!!!!!!!!!!TODO
*     tags: [User Api]
*     responses:
*       200:
*         description: Logout successfully
*       400:
*         description: Error
*/
router.get('/getRegisteredEventsByUserId/:id', User.getRegisteredEventsByUserId)

module.exports = router
const express = require('express')
const router = express.Router()

const Auth = require('../controllers/auth')

/**
* @swagger
* tags:
*   name: Auth Api
*   description: The Auth API
*/

/**
* @swagger
* components:
*   schemas:
*     Auth:
*       type: object
*       required:
*         - email
*         - password
*       properties:
*         email:
*           type: string
*           description: The user's email address
*         password:
*           type: string
*           description: The user's password
*       example:
*         user: 'test@gmail.com'
*         password: '123456'
*/

/**
* @swagger
* /auth/login:
*   post:
*     summary: Login to server
*     tags: [Auth Api]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Auth'
*             properties:
*                email:
*                  type: string
*                password:
*                  type: string
*             required:
*               - email
*               - password
*     responses:
*       200:
*         description: Login successfully
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Auth'
*       400:
*         description: Error
*/
router.post('/login', Auth.login)

/**
* @swagger
* /auth/register:
*   post:
*     summary: register to server
*     tags: [Auth Api]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Auth'
*             properties:
*                email:
*                  type: string
*                password:
*                  type: string
*             required:
*               - email
*               - password
*     responses:
*       200:
*         description: Register successfully
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Auth'
*       400:
*         description: Error
*/
router.post('/register', Auth.register)
/**
* @swagger
* /auth/logout:
*   get:
*     summary: Logout from server
*     tags: [Auth Api]
*     responses:
*       200:
*         description: Logout successfully
*       400:
*         description: Error
*/
router.post('/logout', Auth.logout)

module.exports = router
const express = require('express')
const router = express.Router()

const Event = require('../controllers/events')
const authenticate = require('../common/auth_middleware')

/**
* @swagger
* tags:
*   name: Event Api
*   description: The Event API
*/

/**
* @swagger
* components:
*   schemas:
*     Event:
*       type: object
*       required:
*         - message
*         - sender
*       properties:
*         message:
*           type: string
*           description: The Event text 
*         sender:
*           type: string
*           description: The user who send the event id
*       example:
*         message: 'this is swagger test message'
*         sender: '123456'
*/


/**
* @swagger
* /event:
*   get:
*     summary: get all events
*     tags: [Event Api]
*     responses:
*       200:
*         description: The events list
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Event'
*/
router.get('/', /*authenticate,*/ Event.getEvents)

/**
* @swagger
* /event/{id}:
*   get:
*     summary: get all events
*     tags: [Event Api]
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: The post id
*     responses:
*       200:
*         description: The posts list
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Post'
*/
router.get('/:id',/*authenticate,*/ Event.getEventById)

/**
* @swagger
* /post:
*   post:
*     summary: add new post
*     tags: [Post Api]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Post'
*     responses:
*       200:
*         description: The posts list
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Post'
*/
router.post('/', /*authenticate,*/ Event.addNewEvent)

module.exports = router
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
*         - name
*         - dateAndTime
*       properties:
*         name:
*           type: string
*           description: The event name 
*         description:
*           type: string
*           description: The event description
*         place:
*           type: string
*           description: The event place 
*         dateAndTime:
*           type: string
*           description: The event date and time
*       example:
*         name: 'Training diapers'
*         dateAndTime: '2022-04-30T13:00Z'
*         place: 'Building A, 5th floor, room 435'
*         description: 'Some description text'
*/


/**
* @swagger
* /event:
*   get:
*     summary: Get all future events sorted by the date and time in ascending order
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
*       400:
*         description: Error
*/
router.get('/', /*authenticate,*/ Event.getEvents)

/**
* @swagger
* /event/{id}:
*   get:
*     summary: Get event by ID
*     tags: [Event Api]
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: The event id
*     responses:
*       200:
*         description: The request event
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Event'
*       400:
*         description: Error
*/
router.get('/:id',/*authenticate,*/ Event.getEventById)

/**
* @swagger
* /event:
*   post:
*     summary: Add new event
*     tags: [Event Api]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Post'
*             properties:
*                name:
*                  type: string
*                description:
*                  type: string
*                place:
*                 type: string
*                dateAndTime:
*                 type: string
*             required:
*               - name
*               - dateAndTime
*     responses:
*       200:
*         description: The event was created successfully
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Event'
*       400:
*         description: Error
*/
router.post('/', /*authenticate,*/ Event.addNewEvent)

module.exports = router
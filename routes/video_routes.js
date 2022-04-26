const express = require('express')
const router = express.Router()

const Video = require('../controllers/videos')

/**
* @swagger
* tags:
*   name: Video Api
*   description: The Video API
*/

/**
* @swagger
* components:
*   schemas:
*     Video:
*       type: object
*       properties:
*         hebrewURL:
*           type: string
*           description: The YouTube video url code in Hebrew
*         englishURL:
*           type: string
*           description: The YouTube video url code in English
*       example:
*         hebrewURL: 'lWB6p3A1ESE'
*         englishURL: 'Pi-l9E-BTwQ'
*/


/**
* @swagger
* /video:
*   get:
*     summary: Get all videos urls
*     tags: [Video Api]
*     responses:
*       200:
*         description: The videos list.
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Video'
*       400:
*         description: Error
*/
router.get('/',  Video.getVideos)


/**
* @swagger
* /video:
*   post:
*     summary: Add new video
*     tags: [Video Api]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Video'
*             properties:
*                hebrewURL:
*                  type: string
*                englishURL:
*                  type: string
*     responses:
*       200:
*         description: The video links was saved successfully
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Video'
*       400:
*         description: Error
*/
router.post('/',  Video.addNewVideo)

module.exports = router
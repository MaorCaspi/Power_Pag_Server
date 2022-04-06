const express = require('express')
const router = express.Router()

const Video = require('../controllers/videos')
const authenticate = require('../common/auth_middleware')

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
*       required:
*         - url
*       properties:
*         url:
*           type: string
*           description: The YouTube video url 
*       example:
*         url: 'https://www.youtube.com/watch?v=RRwh-dICK_I'
*/


/**
* @swagger
* /video:
*   get:
*     summary: Get all videos urls
*     tags: [Video Api]
*     responses:
*       200:
*         description: The videos list
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Video'
*       400:
*         description: Error
*/
router.get('/', /*authenticate,*/ Video.getVideos)


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
*             $ref: '#/components/schemas/Post'
*             properties:
*                url:
*                  type: string
*             required:
*               - url
*     responses:
*       200:
*         description: The video link was created successfully
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Video'
*       400:
*         description: Error
*/
router.post('/', /*authenticate,*/ Video.addNewVideo)

module.exports = router
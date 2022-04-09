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
*         - _id
*         - language
*       properties:
*         _id:
*           type: string
*           description: The YouTube video url
*         language:
*           type: integer
*           description: Language ID of the language in the video. 0-Hebrew, 1-English
*       example:
*         _id: 'https://www.youtube.com/watch?v=RRwh-dICK_I'
*         language: 0
*/


/**
* @swagger
* /video:
*   get:
*     summary: Get all videos urls
*     tags: [Video Api]
*     parameters:
*       - in: query
*         name: language
*         schema:
*           type: integer
*         required: false
*         description: Optional-filter by language ID. Hebrew-0 and English-1
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
*             $ref: '#/components/schemas/Video'
*             properties:
*                _id:
*                  type: string
*                language:
*                  type: integer
*             required:
*               - _id
*               - language
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
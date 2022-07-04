const express = require('express')
const router = express.Router()

const Tutorial = require('../controllers/tutorials')

/**
* @swagger
* tags:
*   name: Tutorial Api
*   description: The Tutorial API
*/

/**
* @swagger
* components:
*   schemas:
*     Tutorial:
*       type: object
*       properties:
*         hebrewURL:
*           type: string
*           description: The YouTube tutorial url code in Hebrew
*         englishURL:
*           type: string
*           description: The YouTube tutorial url code in English
*       example:
*         hebrewURL: 'lWB6p3A1ESE'
*         englishURL: 'Pi-l9E-BTwQ'
*/


/**
* @swagger
* /tutorial:
*   get:
*     summary: Get all tutorials urls
*     tags: [Tutorial Api]
*     responses:
*       200:
*         description: The tutorials list.
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Tutorial'
*       400:
*         description: Error
*/
router.get('/',  Tutorial.getTutorials)


/**
* @swagger
* /tutorial:
*   post:
*     summary: Add new video tutorial
*     tags: [Tutorial Api]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Tutorial'
*             properties:
*                hebrewURL:
*                  type: string
*                englishURL:
*                  type: string
*     responses:
*       200:
*         description: The tutorial links was saved successfully
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Tutorial'
*       400:
*         description: Error
*/
router.post('/',  Tutorial.addNewTutorial)

/**
* @swagger
* /tutorial/deleteById/{id}:
*   delete:
*     summary: Delete tutorial by ID
*     tags: [Tutorial Api]
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: The tutorial id
*     responses:
*       200:
*         description: Successful
*       400:
*         description: Error
*/
router.delete('/deleteById/:id', Tutorial.deleteTutorialById)

module.exports = router
const express = require('express')
const router = express.Router()

const Information = require('../controllers/informations')

const upload = require('../middlewares/upload')

/**
* @swagger
* tags:
*   name: Information Api
*   description: The Information API
*/

/**
* @swagger
* components:
*   schemas:
*     Information:
*       type: object
*       required:
*         - subject
*         - title
*         - text
*       properties:
*         subject:
*           type: string
*           description: The information subject 
*         title:
*           type: string
*           description: The information title 
*         text:
*           type: string
*           description: The information text
*         image:
*           type: string
*           description: The information photo url
*       example:
*         subject: 'General'
*         title: 'Why preterm babies cry less?'
*         text: 'Premature babies cry less than normal babies, this is because they do not have the hormone that is responsible for crying'
*         image: 'http://power-pag.cs.colman.ac.il/uploads/1651927486466-diapers.jpg'
*/


/**
* @swagger
* /information:
*   get:
*     summary: Get all informations
*     tags: [Information Api]
*     responses:
*       200:
*         description: The informations list grouped by subject
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Information'
*       400:
*         description: Error
*/
router.get('/', Information.getInformations)

/**
* @swagger
* /information/getById/{id}:
*   get:
*     summary: Get information by ID
*     tags: [Information Api]
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: The information id
*     responses:
*       200:
*         description: The request information
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Information'
*       404:
*         description: There is no such ID
*       400:
*         description: Error
*/
router.get('/getById/:id', Information.getInformationById)

/**
* @swagger
* /information:
*   post:
*     summary: Add new information, option- attach a png/jpg/jpeg picture with up to 7 MB size
*     tags: [Information Api]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             properties:
*                subject:
*                  type: string
*                  default: General
*                title:
*                  type: string
*                  default: Why preterm babies cry less?
*                text:
*                  type: string
*                  default: Premature babies cry less than normal babies, this is because they do not have the hormone that is responsible for crying
*             required:
*               - subject
*               - title
*               - text
*     responses:
*       200:
*         description: The information was created successfully
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Information'
*       400:
*         description: Error
*/
router.post('/', upload.single('image'), Information.addNewInformation)

/**
* @swagger
* /information/getSubjects:
*   get:
*     summary: Get all information subjects
*     tags: [Information Api]
*     responses:
*       200:
*         description: The information subjects list
*         content:
*           application/json:
*             schema:
*               type: array
*       400:
*         description: Error
*/
router.get('/getSubjects/', Information.getInformationSubjects)


/**
* @swagger
* /information/getBySubject/{id}:
*   get:
*     summary: Get informations by subject
*     tags: [Information Api]
*     parameters:
*       - in: path
*         name: subject
*         schema:
*           type: string
*         required: true
*         description: The informations subject
*     responses:
*       200:
*         description: The request informations
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Information'
*       404:
*         description: There is no such subject object ID
*       400:
*         description: Error
*/
router.get('/getBySubject/:subject', Information.getInformationsBySubject)

/**
* @swagger
* /information/{id}:
*   delete:
*     summary: Delete information by ID
*     tags: [Information Api]
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: The information id
*     responses:
*       200:
*         description: Successful
*       404:
*         description: There is no such information object ID
*       400:
*         description: Error
*/
router.delete('/:id', Information.deleteInformation)

/**
* @swagger
* /information/{id}:
*   patch:
*     summary: Edit information, option- attach a png/jpg/jpeg picture with up to 7 MB size
*     tags: [Information Api]
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: The information id
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             properties:
*                subject:
*                  type: string
*                  default: General
*                title:
*                  type: string
*                  default: Why preterm babies cry less?
*                text:
*                  type: string
*                  default: Premature babies cry less than normal babies, this is because they do not have the hormone that is responsible for crying
*             required:
*               - subject
*               - title
*               - text
*     responses:
*       200:
*         description: The information was update successfully
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Information'
*       404:
*         description: There is no such information object ID
*       400:
*         description: Error
*/
router.patch('/:id', upload.single('image'), Information.EditInformation)

module.exports = router
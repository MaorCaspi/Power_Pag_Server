const dotenv = require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

if (process.env.NODE_ENV == "development") {
    const swaggerUI = require("swagger-ui-express")
    const swaggerJsDoc = require("swagger-jsdoc")
    const options = {
        definition: {
            openapi: "3.0.0",
            info: {
                title: "Power Pag Library API",
                version: "1.0.0",
            },
            servers: [{url: "http://power-pag.cs.colman.ac.il",},],
        },
        apis: ["./routes/*.js"],
    };
    const specs = swaggerJsDoc(options);
    app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
 }


app.use(bodyParser.urlencoded({extended:true, limit: '1m'}))
app.use(bodyParser.json())

mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser : true})
const db = mongoose.connection
db.on('error',error=>{console.error(error)})
db.once('open',()=>{console.log('db connected!')})

const port = process.env.PORT

const indexRouter = require('./routes/index')
app.use('/',indexRouter)

const eventRouter = require('./routes/event_routes')
app.use('/event',eventRouter)

const videoRouter = require('./routes/video_routes')
app.use('/video',videoRouter)

const authRouter = require('./routes/user_routes')
app.use('/user',authRouter)

module.exports = app
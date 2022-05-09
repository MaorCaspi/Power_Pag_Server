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
            servers: [{url: process.env.SERVER_URL,},],
        },
        apis: ["./routes/*.js"],
    };
    const specs = swaggerJsDoc(options);
    app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
 }

app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authoriztion");
    if(req.method === "OPTIONS"){
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});

app.use(bodyParser.urlencoded({extended:true, limit: '1m'}))
app.use(bodyParser.json())

mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser : true})
const db = mongoose.connection
db.on('error',error=>{console.error(error)})
db.once('open',()=>{console.log('db connected!')})

const port = process.env.PORT

app.use('/uploads',express.static('uploads'));

const indexRouter = require('./routes/index')
app.use('/',indexRouter)

const eventRouter = require('./routes/event_routes')
app.use('/event',eventRouter)

const tutorialRouter = require('./routes/tutorial_routes')
app.use('/tutorial',tutorialRouter)

const informationRouter = require('./routes/information_routes')
app.use('/information',informationRouter)

const authRouter = require('./routes/user_routes')
app.use('/user',authRouter)

module.exports = app
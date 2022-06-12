const app = require('./server')
const https = require('https')
const http = require('http')

const httpPort = process.env.HTTP_PORT
const httpsPort = process.env.HTTPS_PORT

http.createServer(app).listen(httpPort,()=>{
    console.log('HTTP- server is running on port ' + httpPort)});

https.createServer(app).listen(httpsPort,()=>{
    console.log('HTTPS- server is running on port ' + httpsPort)});
const app = require('../server')
const request = require('supertest')
const mongoosse = require('mongoose')
const { response } = require('../server')
const User = require('../models/user_model')

const email = 'test@a.com'
const pwd = '123456'


beforeAll(done=>{
    User.remove({'email' : email}, (err)=>{
        done()
    })
})

afterAll(done=>{
    User.remove({'email' : email}, (err)=>{
        mongoosse.connection.close()
        done()
    })
})


describe('Testing Event API',()=>{
    const eventMessage = 'this is my test event'
    const sender = 'Eliav'
    let accessToken = ''
    let userId = ''

    test('test registration',async ()=>{
        const response = await request(app).post('/auth/register').send({
            'email' : email,
            'password':pwd
        })
        expect(response.statusCode).toEqual(200)
        userId = response.body._id
    })

    test('test login',async ()=>{
        const response = await request(app).post('/auth/login').send({
            'email' : email,
            'password':pwd
        })
        expect(response.statusCode).toEqual(200)
        accessToken = response.body.accessToken
    })

    test('event get',async ()=>{
        const response = await request(app).get('/event').set({ authorization: 'JWT ' + accessToken })
        expect(response.statusCode).toEqual(200)
    })

    test('add new event',async ()=>{
        const response = await request(app).post('/event').set({ authorization: 'JWT ' + accessToken })
        .send({
            'message' : eventMessage,
            'sender' : sender
        })
        expect(response.statusCode).toEqual(200)
        const newEvent = response.body
        expect(newEvent.message).toEqual(eventMessage)
        
        const response2 = await request(app).get('/event/' + newEvent._id)
        .set({ authorization: 'JWT ' + accessToken })
        expect(response2.statusCode).toEqual(200)
        const event2 = response2.body
        expect(event2.message).toEqual(eventMessage)
    })
})
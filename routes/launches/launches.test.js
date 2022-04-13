const { describe } = require('pm2');
const request = require('supertest');
const app = require('../../app');
const {mongoConnect, mongoDisconnect} = require('../../services/mongo');

describe('Launch API', () => {

    beforeAll(async() => {
        await mongoConnect();
    })

    describe('Test GET /launches', () => {
        test('It should respond with status 200', async() => {
            await request(app)
                .get('/launches')
                .expect('Content-Type', /json/)
                .expect(200);
            
        })
    })
    
    describe('Test POST /launches', () => {
        test('It should respond with status 201', async() => {
           await request(app).post('/launches')
           .send({
                mission: 'test',
                rocket: 'test',
                launchDate: 'December 12, 2039',
                target: 'Marc'
           })
           .expect(201);
        });
    
        test('It should catch missing required property', () => {
             request(app).post('/launches')
            .send({})
            .expect(400)
        });
    
        test('It should catch invalid dates', () => {
             request(app).post('/launches')
            .send({
                mission: 'test',
                rocket: 'test',
                launchDate: 'hihi',
                target: 'Marc'
           })
           .expect(400);
        });
    })

    afterAll(async() => {
        await mongoDisconnect();
    })
})

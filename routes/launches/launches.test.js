const request = require('supertest');
const app = require('../../app');

describe('Test GET /launches', () => {
    test('It should respond with status 200', async() => {
        const res = await request(app)
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

    test('It should catch missing required property', async() => {
        await request(app).post('/launches')
        .send({})
        .expect(400)
    });

    test('It should catch invalid dates', async() => {
        await request(app).post('/launches')
        .send({
            mission: 'test',
            rocket: 'test',
            launchDate: 'hihi',
            target: 'Marc'
       })
       .expect(400);
    });
})
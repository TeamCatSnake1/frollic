const request = require('supertest');
const polyfill = require('babel-polyfill');

const server = 'http://localhost:3000';

describe('Route integration', () => {
    describe('/', () => {
      describe('GET', () => {
        // Note that we return the evaluation of `request` here! It evaluates to
        // a promise, so Jest knows not to say this test passes until that
        // promise resolves. See https://jestjs.io/docs/en/asynchronous
        it('responds with 200 status and text/html content type', () => {
          return request(server)
            .get('/')
            .expect('Content-Type', /text\/html/)
            .expect(200);
        });
      });
    })
})


describe('using the router', () => {
  describe('/api/search', () => {
    describe('POST', () => {
      // Note that we return the evaluation of `request` here! It evaluates to
      // a promise, so Jest knows not to say this test passes until that
      // promise resolves. See https://jestjs.io/docs/en/asynchronous
      it('responds with 200 status and application/json content type', () => {
        return request(server)
          .post('/api/search')
          .expect('Content-Type', /application\/json/)
          .expect(200)
          .expect('Content-Length', '8328')
         
          
      });
    });
  })
})


describe('testing the API', () => {
  describe('/api/search', () => {
    describe('POST', () => {
      // Note that we return the evaluation of `request` here! It evaluates to
      // a promise, so Jest knows not to say this test passes until that
      // promise resolves. See https://jestjs.io/docs/en/asynchronous
      it('with objects in the shape that we expect', () => {
        return request(server)
          .post('/api/search')
          .expect('Content-Type', /application\/json/)
          .expect(200)
          .then((res) => {
            expect(res.body[0]).toHaveProperty('name');
            expect(res.body[0]).toHaveProperty('image');
            expect(res.body[0]).toHaveProperty('url');
            expect(res.body[0]).toHaveProperty('address');
            expect(res.body[0]).toHaveProperty('phone');
            expect(res.body[0]).toHaveProperty('rating');
            expect(res.body[0]).toHaveProperty('price');
            expect(res.body[0]).toHaveProperty('distance');

           });     
          
      });
    });
  })
})





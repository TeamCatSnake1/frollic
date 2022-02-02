const request = require('supertest');
const polyfill = require('babel-polyfill');

const server = 'http://localhost:3000';

describe('Route integration', () => {
    describe('/', () => {
      describe('GET', () => {
        // Note that we return the evaluation of `request` here! It evaluates to
        // a promise, so Jest knows not to say this test passes until that
        // promise resolves. See https://jestjs.io/docs/en/asynchronous
        it('responds with 404 status and text/html content type', () => {
          return request(server)
            .get('/')
            .expect('Content-Type', /text\/html/)
            .expect(404);
        });
      });
    })
})
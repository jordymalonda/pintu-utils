const supertest = require('supertest');
const app = require('../app');

const server = app.listen();
const request = supertest.agent(server);

describe('GET /v1/merchant-type', () => {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkNhbnZhc2VyIDAyIiwiZW1haWwiOiJjYW52YXNlcjAxQG1haWwubWUiLCJwaG90byI6InBob3RvbmFtZSIsInBob25lIjoiNjI4NTY5MzM4NDI0NyIsInN0YXR1cyI6MSwiY2FudmFzc2VyIjp7ImNvZGUiOiJCYiIsImlkY2FyZCI6IjEyMzQ1Njc4OSIsInRhcmdldF9tZXJjaGFudCI6MTAsImlkX3JlZ2VuY3kiOjEsImlkX2NpdHkiOjEsImlkX3BhcnRuZXIiOjEsImlkX3RlYW1fbGVhZGVyIjoxLCJpZF9jb29yZGluYXRvciI6Mn0sImlhdCI6MTUxODA2NDY1NH0.iuPQn1d860XJgH3vgBUue9smUc-Xeg1pdZgvBhTn0ek';

  it('should not be able to consume the route /v1/merchant-type since no token was sent', (done) => {
    request
      .get('/v1/merchant-type')
      .expect(401, done);
  });

  it('should return merchant type data', (done) => {
    request
      .get('/v1/merchant-type')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .end((err) => {
        if (err) return done(err);

        return done();
      });
  });
});

const supertest = require('supertest');
const app = require('../app');

const server = app.listen();
const request = supertest.agent(server);


describe('GET /v1/config/filter-one', () => {
  it('should return config data', (done) => {
    request
      .get('/v1/config/filter-one?name=CA_APP_VERSION')
      .set('Accept', 'application/json')
      .expect(200)
      .end((err) => {
        if (err) return done(err);

        return done();
      });
  });
});

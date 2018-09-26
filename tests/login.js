const supertest = require('supertest');
const app = require('../app');

const server = app.listen();
const request = supertest.agent(server);

describe('POST /v1/login', () => {
  it('should return json web token and user data', (done) => {
    const param = {
      username: 'canvaser01@mail.me',
      password: 'admin',
      device_id: 'deviceid',
      push_token: 'pushnotificationtoken',
      imei: 12345678910
    };
    request
      .post('/v1/login')
      .set('Accept', 'application/json')
      .send(param)
      .expect(200)
      .end((err) => {
        if (err) return done(err);

        return done();
      });
  });
});

const supertest = require('supertest');
const app = require('../app');

const server = app.listen();
const request = supertest.agent(server);

describe('GET /v1/profile', () => {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkNhbnZhc2VyIDAyIiwiZW1haWwiOiJjYW52YXNlcjAxQG1haWwubWUiLCJwaG90byI6InBob3RvbmFtZSIsInBob25lIjoiNjI4NTY5MzM4NDI0NyIsInN0YXR1cyI6MSwiY2FudmFzc2VyIjp7ImNvZGUiOiJCYiIsImlkY2FyZCI6IjEyMzQ1Njc4OSIsInRhcmdldF9tZXJjaGFudCI6MTAsImlkX3JlZ2VuY3kiOjEsImlkX2NpdHkiOjEsImlkX3BhcnRuZXIiOjEsImlkX3RlYW1fbGVhZGVyIjoxLCJpZF9jb29yZGluYXRvciI6Mn0sImlhdCI6MTUxODA2NDY1NH0.iuPQn1d860XJgH3vgBUue9smUc-Xeg1pdZgvBhTn0ek';

  it('should not be able to consume the route /v1/profile since no token was sent', (done) => {
    request
      .get('/v1/profile')
      .expect(401, done);
  });

  it('should return user data', (done) => {
    request
      .get('/v1/profile')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .end((err) => {
        if (err) return done(err);

        return done();
      });
  });
});

describe('POST /v1/profile', () => {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkNhbnZhc2VyIDAxIiwicGhvbmUiOiIwODk5ODk4OTg5Iiwic3RhdHVzIjoxLCJjYW52YXNzZXIiOnsiY29kZSI6IjAxIiwiaWRjYXJkIjoiMTIzNDU2Nzg5IiwidGFyZ2V0X21lcmNoYW50IjoxMH0sImlhdCI6MTUxNjg2OTU0MX0.BMkY8_SM1b0HhvMaP-qcCYkBWZrbGR631YeWZcDJyQ4';

  it('should not be able to consume the route /v1/profile since no token was sent', (done) => {
    request
      .post('/v1/profile')
      .expect(401, done);
  });

  it('should return field updated', (done) => {
    const param = {
      name: 'canvaser 02',
      phone: 'admin',
      photo: 'photoname',
      idcard: 123456
    };
    request
      .get('/v1/profile')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(param)
      .expect(200)
      .end((err) => {
        if (err) return done(err);

        return done();
      });
  });
});

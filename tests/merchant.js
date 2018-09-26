const supertest = require('supertest');
const app = require('../app');

const server = app.listen();
const request = supertest.agent(server);

const userId = 5;

describe('GET /v1/merchant', () => {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkNhbnZhc2VyIDAyIiwiZW1haWwiOiJjYW52YXNlcjAxQG1haWwubWUiLCJwaG90byI6InBob3RvbmFtZSIsInBob25lIjoiNjI4NTY5MzM4NDI0NyIsInN0YXR1cyI6MSwiY2FudmFzc2VyIjp7ImNvZGUiOiJCYiIsImlkY2FyZCI6IjEyMzQ1Njc4OSIsInRhcmdldF9tZXJjaGFudCI6MTAsImlkX3JlZ2VuY3kiOjEsImlkX2NpdHkiOjEsImlkX3BhcnRuZXIiOjEsImlkX3RlYW1fbGVhZGVyIjoxLCJpZF9jb29yZGluYXRvciI6Mn0sImlhdCI6MTUxODA2NDY1NH0.iuPQn1d860XJgH3vgBUue9smUc-Xeg1pdZgvBhTn0ek';

  it('should not be able to consume the route /v1/merchant since no token was sent', (done) => {
    request
      .get('/v1/merchant')
      .expect(401, done);
  });

  it('should return user data', (done) => {
    request
      .get('/v1/merchant')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .end((err) => {
        if (err) return done(err);

        return done();
      });
  });
});

describe('POST /v1/merchant', () => {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkNhbnZhc2VyIDAyIiwiZW1haWwiOiJjYW52YXNlcjAxQG1haWwubWUiLCJwaG90byI6InBob3RvbmFtZSIsInBob25lIjoiNjI4NTY5MzM4NDI0NyIsInN0YXR1cyI6MSwiY2FudmFzc2VyIjp7ImNvZGUiOiJCYiIsImlkY2FyZCI6IjEyMzQ1Njc4OSIsInRhcmdldF9tZXJjaGFudCI6MTAsImlkX3JlZ2VuY3kiOjEsImlkX2NpdHkiOjEsImlkX3BhcnRuZXIiOjEsImlkX3RlYW1fbGVhZGVyIjoxLCJpZF9jb29yZGluYXRvciI6Mn0sImlhdCI6MTUxODA2NDY1NH0.iuPQn1d860XJgH3vgBUue9smUc-Xeg1pdZgvBhTn0ek';

  it('should not be able to consume the route /v1/merchant since no token was sent', (done) => {
    request
      .post('/v1/merchant')
      .expect(401, done);
  });

  it('should return field created', (done) => {
    const param = {
      name: `Canvasser 0${userId}`,
      email: `canvasser0${userId}@mail.me`,
      status: 1,
      phone: '6285693384247',
      password: 'admin123',
      password_confirmation: 'admin123',
      id_merchant_type: 1,
      id_merchant_category: 1,
      id_coordinator: 1,
      id_canvasser: 1,
      address: 1,
      postal_code: '13123',
      latitude: 70.1131231,
      longitude: -109.1231231,
      picture_1: 'picture',
      picture_2: 'picture',
      picture_3: 'picture',
      npwp: 'npwp',
      code: '123',
      pic_name: 'Dwikky',
      pic_gender: 'M',
      pic_phone: '62856291231',
      pic_email: 'dwikkymaradhiza@mail.me',
      pic_picture_idcard: 'picture',
      pic_picture_npwp: 'picture'
    };

    request
      .post('/v1/merchant')
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

describe(`GET /v1/merchant/${userId}`, () => {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkNhbnZhc2VyIDAyIiwiZW1haWwiOiJjYW52YXNlcjAxQG1haWwubWUiLCJwaG90byI6InBob3RvbmFtZSIsInBob25lIjoiNjI4NTY5MzM4NDI0NyIsInN0YXR1cyI6MSwiY2FudmFzc2VyIjp7ImNvZGUiOiJCYiIsImlkY2FyZCI6IjEyMzQ1Njc4OSIsInRhcmdldF9tZXJjaGFudCI6MTAsImlkX3JlZ2VuY3kiOjEsImlkX2NpdHkiOjEsImlkX3BhcnRuZXIiOjEsImlkX3RlYW1fbGVhZGVyIjoxLCJpZF9jb29yZGluYXRvciI6Mn0sImlhdCI6MTUxODA2NDY1NH0.iuPQn1d860XJgH3vgBUue9smUc-Xeg1pdZgvBhTn0ek';

  it(`should not be able to consume the route /v1/merchant/${userId} since no token was sent`, (done) => {
    request
      .get(`/v1/merchant/${userId}`)
      .expect(401, done);
  });

  it('should return user data', (done) => {
    request
      .get(`/v1/merchant/${userId}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .end((err) => {
        if (err) return done(err);

        return done();
      });
  });
});

describe('POST /v1/merchant/resend-otp', () => {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkNhbnZhc2VyIDAyIiwiZW1haWwiOiJjYW52YXNlcjAxQG1haWwubWUiLCJwaG90byI6InBob3RvbmFtZSIsInBob25lIjoiNjI4NTY5MzM4NDI0NyIsInN0YXR1cyI6MSwiY2FudmFzc2VyIjp7ImNvZGUiOiJCYiIsImlkY2FyZCI6IjEyMzQ1Njc4OSIsInRhcmdldF9tZXJjaGFudCI6MTAsImlkX3JlZ2VuY3kiOjEsImlkX2NpdHkiOjEsImlkX3BhcnRuZXIiOjEsImlkX3RlYW1fbGVhZGVyIjoxLCJpZF9jb29yZGluYXRvciI6Mn0sImlhdCI6MTUxODA2NDY1NH0.iuPQn1d860XJgH3vgBUue9smUc-Xeg1pdZgvBhTn0ek';

  it('should not be able to consume the route /v1/merchant/resend-otp since no token was sent', (done) => {
    request
      .post('/v1/merchant/resend-otp')
      .expect(401, done);
  });

  it('should return field sms status', (done) => {
    const param = {
      id_merchant: 35
    };

    request
      .post('/v1/merchant/resend-otp')
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

describe('POST /v1/merchant/validate-otp', () => {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkNhbnZhc2VyIDAyIiwiZW1haWwiOiJjYW52YXNlcjAxQG1haWwubWUiLCJwaG90byI6InBob3RvbmFtZSIsInBob25lIjoiNjI4NTY5MzM4NDI0NyIsInN0YXR1cyI6MSwiY2FudmFzc2VyIjp7ImNvZGUiOiJCYiIsImlkY2FyZCI6IjEyMzQ1Njc4OSIsInRhcmdldF9tZXJjaGFudCI6MTAsImlkX3JlZ2VuY3kiOjEsImlkX2NpdHkiOjEsImlkX3BhcnRuZXIiOjEsImlkX3RlYW1fbGVhZGVyIjoxLCJpZF9jb29yZGluYXRvciI6Mn0sImlhdCI6MTUxODA2NDY1NH0.iuPQn1d860XJgH3vgBUue9smUc-Xeg1pdZgvBhTn0ek';

  it('should not be able to consume the route /v1/merchant/validate-otp since no token was sent', (done) => {
    request
      .post('/v1/merchant/validate-otp')
      .expect(401, done);
  });

  it('should return success message', (done) => {
    const param = {
      id_merchant: 35
    };

    request
      .post('/v1/merchant/validate-otp')
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

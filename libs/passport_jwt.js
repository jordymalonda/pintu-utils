const passport = require('passport');
const passportJWT = require('passport-jwt');
const config = require('../config');

const { ExtractJwt, Strategy } = passportJWT;
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.get('JWT_SECRET')
};

const strategy = new Strategy(jwtOptions, (jwtPayload, next) => {
  const user = User.findOne({
    where: {
      id: jwtPayload.id,
      deleted: null
    }
  });

  if (user) {
    next(null, {
      id: jwtPayload.id,
      name: jwtPayload.name,
      email: jwtPayload.email,
      photo: jwtPayload.photo,
      phone: jwtPayload.phone,
      status: jwtPayload.status,
      canvasser: jwtPayload.canvasser
    });
  } else {
    next(null, false);
  }
});

passport.use(strategy);

module.exports = passport;

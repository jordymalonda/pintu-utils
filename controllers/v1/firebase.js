// const request = require('request-promise');
const { httpStatus, errorCodes } = require('./../../configs/codes');
const config = require('../../config');
const firebase = require('firebase');
const admin = require('firebase-admin');
const logger = require('./../../libs/logger');

const controller = {
  signin: async (req, res) => {
    const credential = {
      apiKey: config.get('FIREBASE_API_KEY'),
      authDomain: 'pintu-mobile-app.firebaseapp.com',
      databaseURL: 'https://pintu-mobile-app.firebaseio.com',
      projectId: 'pintu-mobile-app',
      storageBucket: 'pintu-mobile-app.appspot.com',
      messagingSenderId: config.get('FIREBASE_SENDER_ID')
    };
    firebase.initializeApp(credential);

    const ip = req.headers['x-forwarded-for'] ? req.headers['x-forwarded-for'].split(',')[0] : req.connection.remoteAddress;
    logger.info(`REQUEST LOGIN ${ip}: ${JSON.stringify(req.body, null, 2)}`);
    try {
      req.checkBody({
        email: { notEmpty: true, errorMessage: 'email field is required', isEmail: true },
        password: { notEmpty: true, errorMessage: 'password field is required' }
      });

      const errors = req.validationErrors();
      if (errors) {
        return res.status(httpStatus.badRequest).json({
          status: httpStatus.badRequest,
          success: false,
          message: errors,
          code: errorCodes.badRequest
        });
      }

      const { email, password } = req.body;

      const result = await firebase.auth().signInWithEmailAndPassword(email, password);

      logger.info(`LOGIN RESPONSE ${ip}: ${JSON.stringify(result, null, 2)}`);
      return res.status(httpStatus.ok).json({
        status: httpStatus.ok,
        success: true,
        data: result
      });
    } catch (e) {
      logger.error(`LOGIN ERROR ${ip}: ${JSON.stringify(e.message, null, 2)}`);
      return res.status(httpStatus.internalServerError).json({
        status: httpStatus.internalServerError,
        success: false,
        message: e.message,
        code: errorCodes.internalServerError
      });
    }
  },

  create: async (req, res) => {
    const ip = req.headers['x-forwarded-for'] ? req.headers['x-forwarded-for'].split(',')[0] : req.connection.remoteAddress;
    logger.info(`REQUEST LOGIN ${ip}: ${JSON.stringify(req.body, null, 2)}`);
    try {
      req.checkBody({
        username: { notEmpty: true, errorMessage: 'username field is required' },
        email: { notEmpty: true, errorMessage: 'email field is required', isEmail: true },
        password: { notEmpty: true, errorMessage: 'password field is required' },
      });

      const errors = req.validationErrors();
      if (errors) {
        return res.status(httpStatus.badRequest).json({
          status: httpStatus.badRequest,
          success: false,
          message: errors,
          code: errorCodes.badRequest
        });
      }

      const adminCredential = {
        credential: admin.credential.cert(config.get('FIREBASE_KEY')),
        databaseURL: 'https://pintu-mobile-app.firebaseio.com'
      };

      admin.initializeApp(adminCredential);

      const result = await admin.auth().createUser({
        email: req.body.email,
        password: req.body.password,
        displayName: req.body.username,
      });

      logger.info(`LOGIN RESPONSE ${ip}: ${JSON.stringify(result, null, 2)}`);
      return res.status(httpStatus.ok).json({
        status: httpStatus.ok,
        success: true,
        data: result
      });
    } catch (e) {
      logger.info(`LOGIN ERROR ${ip}: ${JSON.stringify(e.message, null, 2)}`);
      return res.status(httpStatus.internalServerError).json({
        status: httpStatus.internalServerError,
        success: false,
        message: e.message,
        code: errorCodes.internalServerError
      });
    }
  }
};

module.exports = (router) => {
  router.post('/', controller.create);
  router.post('/login', controller.signin);
};

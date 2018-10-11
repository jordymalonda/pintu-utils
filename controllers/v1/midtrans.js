// const ba = require('bitcoinaverage');
const request = require('request-promise');
const { httpStatus, errorCodes } = require('./../../configs/codes');
const config = require('../../config');
const logger = require('./../../libs/logger');
// const fx = require('money');

const controller = {
  callback: async (req, res) => {
    try {
      logger.info(`MIDTRANS CALLBACK: ${JSON.stringify(req, null, 2)}`);
      return res.status(httpStatus.ok).json({
        status: httpStatus.ok,
        success: true
      });
    } catch (e) {
      logger.info(`ERROR MIDTRANS CALLBACK: ${JSON.stringify(e.message, null, 2)}`);
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
  router.post('/callback', controller.callback);
//   router.post('/check', indicesController.check);
};

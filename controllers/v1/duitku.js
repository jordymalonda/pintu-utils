// const ba = require('bitcoinaverage');
const request = require('request-promise');
const { httpStatus, errorCodes } = require('./../../configs/codes');
const config = require('../../config');
const logger = require('./../../libs/logger');
const crypto = require('crypto');
// const fx = require('money');

const controller = {
  callback: async (req, res) => {
    try {
      logger.info(`DUITKU CALLBACK: ${JSON.stringify(req.body, null, 2)}`);
      return res.status(httpStatus.ok).json({
        status: httpStatus.ok,
        success: true
      });
    } catch (e) {
      logger.info(`ERROR DUITKU CALLBACK: ${JSON.stringify(e.message, null, 2)}`);
      return res.status(httpStatus.internalServerError).json({
        status: httpStatus.internalServerError,
        success: false,
        message: e.message,
        code: errorCodes.internalServerError
      });
    }
  },

  inquiry: async (req, res) => {
    const merchantKey = config.get('DUITKU_API_KEY');
    try {
      req.checkBody({
        paymentAmount: { notEmpty: true, errorMessage: 'paymentAmount field is required' },
        paymentMethod: { notEmpty: true, errorMessage: 'paymentMethod field is required' },
        merchantOrderId: { notEmpty: true, errorMessage: 'merchantOrderId field is required' },
        productDetails: { notEmpty: true, errorMessage: 'productDetails field is required' },
        email: { notEmpty: true, isEmail: true, errorMessage: 'email field is required' },
        phoneNumber: { notEmpty: true, errorMessage: 'phoneNumber field is required' },
        additionalParam: { notEmpty: false, errorMessage: 'additionalParam field is required' },
        merchantUserInfo: { notEmpty: false, errorMessage: 'merchantUserInfo field is required' },
        callbackUrl: { notEmpty: true, errorMessage: 'callbackUrl field is required' },
        returnUrl: { notEmpty: true, errorMessage: 'returnUrl field is required' },
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

      const concatSign = `${config.get('DUITKU_MERCHANT_CODE')}${req.body.merchantOrderId}${req.body.paymentAmount}${merchantKey}`;

      const sign = crypto.createHash('md5').update(concatSign).digest('hex');
      const bodyData = {
        merchantCode: config.get('DUITKU_MERCHANT_CODE'),
        paymentAmount: req.body.paymentAmount,
        paymentMethod: req.body.paymentMethod,
        merchantOrderId: req.body.merchantOrderId,
        productDetails: req.body.productDetails,
        additionalParam: req.body.additionalParam,
        merchantUserInfo: req.body.merchantUserInfo,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        itemDetails: req.body.itemDetails,
        callbackUrl: req.body.callbackUrl,
        returnUrl: req.body.returnUrl,
        signature: sign
      };

      const headerData = {
        'Content-Type': 'application/json',
        'Content-Length': bodyData.length,
      };

      const options = {
        url: `${config.get('DUITKU_HOST')}/inquiry`,
        method: 'POST',
        json: true,
        headers: headerData,
        body: bodyData
      };

      const result = await request(options);

      return res.status(httpStatus.ok).json({
        status: httpStatus.ok,
        success: true,
        message: result
      });
    } catch (e) {
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
  router.post('/inquiry', controller.inquiry);
//   router.post('/check', indicesController.check);
};

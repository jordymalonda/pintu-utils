// const ba = require('bitcoinaverage');
const request = require('request-promise');
const { httpStatus, errorCodes } = require('./../../configs/codes');
const crypto = require('crypto');
const config = require('../../config');

const controller = {
  getTrades: async (req, res) => {
    try {
    //   req.checkQuery({
    //     period: { notEmpty: true, errorMessage: 'period field is required' },
    //     symbol: { notEmpty: true, errorMessage: 'symbol field is required' }
    //   });

    //   const errors = req.validationErrors();
    //   if (errors) {
    //     return res.status(httpStatus.badRequest).json({
    //       status: httpStatus.badRequest,
    //       success: false,
    //       message: errors,
    //       code: errorCodes.badRequest
    //     });
    //   }
      const milliseconds = new Date().getTime();

      const bodyData = {
        url: `${config.get('CIRCLE_HOST')}/getTrades`,
        nonce: milliseconds,
        start_date: 1,
        end_date: milliseconds
      };

      const apiSecret = config.get('CIRCLE_SECRET');
      const signature = crypto.createHmac('sha256', apiSecret).update(JSON.stringify(bodyData)).digest('base64');

      const headerData = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-CRCL-APIKEY': config.get('CIRCLE_KEY'),
        'X-CRCL-SIGNATURE': signature
      };

      const options = {
        url: `${config.get('CIRCLE_HOST')}/getTrades`,
        method: 'POST',
        json: true,
        headers: headerData,
        body: bodyData
      };

      const result = await request(options);

      return res.status(httpStatus.ok).json({
        status: httpStatus.ok,
        success: true,
        data: result
      });
    } catch (e) {
      return res.status(httpStatus.internalServerError).json({
        status: httpStatus.internalServerError,
        success: false,
        message: e.message,
        code: errorCodes.internalServerError
      });
    }
  },
  newQuote: async (req, res) => {
    try {
      req.checkBody({
        pair: { notEmpty: true, errorMessage: 'pair field is required' },
        side: { notEmpty: true, errorMessage: 'side field is required' },
        volume: { notEmpty: true, errorMessage: 'volume field is required' },
        value: { notEmpty: true, errorMessage: 'value field is required' }
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
      const milliseconds = new Date().getTime();

      const bodyData = {
        url: `${config.get('CIRCLE_HOST')}/newQuote`,
        nonce: milliseconds,
        pair: req.body.pair,
        side: req.body.side,
        volume: req.body.volume,
        value: req.body.value
      };

      const apiSecret = config.get('CIRCLE_SECRET');
      const signature = crypto.createHmac('sha256', apiSecret).update(JSON.stringify(bodyData)).digest('base64');

      const headerData = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-CRCL-APIKEY': config.get('CIRCLE_KEY'),
        'X-CRCL-SIGNATURE': signature
      };

      const options = {
        url: `${config.get('CIRCLE_HOST')}/newQuote`,
        method: 'POST',
        json: true,
        headers: headerData,
        body: bodyData
      };

      const result = await request(options);

      return res.status(httpStatus.ok).json({
        status: httpStatus.ok,
        success: true,
        data: result
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
  router.get('/', controller.getTrades);
  router.post('/newQuote', controller.newQuote);
};

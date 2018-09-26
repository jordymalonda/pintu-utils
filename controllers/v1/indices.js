// const ba = require('bitcoinaverage');
const request = require('request-promise');
const { httpStatus, errorCodes } = require('./../../configs/codes');

const indicesController = {
  get: async (req, res) => {
    req.checkQuery({
      period: { notEmpty: true, errorMessage: 'period field is required' },
      symbol: { notEmpty: true, errorMessage: 'symbol field is required' }
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

    const options = {
      url: `https://apiv2.bitcoinaverage.com/indices/global/history/${req.query.symbol}?period=${req.query.period}&format=json`,
      method: 'GET',
      json: true
    };

    const result = await request(options);

    return res.status(httpStatus.ok).json({
      status: httpStatus.ok,
      success: true,
      data: result
    });
  }
};


module.exports = (router) => {
  router.get('/', indicesController.get);
//   router.post('/check', indicesController.check);
};

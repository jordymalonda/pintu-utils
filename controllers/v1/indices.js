// const ba = require('bitcoinaverage');
const request = require('request-promise');
const { httpStatus, errorCodes } = require('./../../configs/codes');

const indicesController = {
  get: async (req, res) => {
    try {
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
      let finalResult = result;

      if (req.query.interval) {
        const temp = [];
        for (let index = 0; index < result.length; index += 1) {
          const set = result[index].time.substr(14, 2);
          if (set % req.query.interval === 0) {
            temp.push(result[index]);
          }
        }
        finalResult = temp;
      }

      return res.status(httpStatus.ok).json({
        status: httpStatus.ok,
        success: true,
        data: finalResult
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
  router.get('/', indicesController.get);
//   router.post('/check', indicesController.check);
};

// const ba = require('bitcoinaverage');
const request = require('request-promise');
const { httpStatus, errorCodes } = require('./../../configs/codes');
const crypto = require('crypto');
const config = require('../../config');

const controller = {
  getInfo: async (req, res) => {
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
      const milliseconds = Math.floor(new Date() / 1000);
      const bodyData = {
        nonce: '1538393144',
        method: 'getInfo'
      };

      const param = `method=getInfo&nonce=1538393144`;

      const apiSecret = config.get('INDODAX_SECRET');
      const signature = crypto.createHmac('sha512', apiSecret).update(param).digest('hex');
console.log(signature);
      const headerData = {
        'Content-Type': 'application/json',
        Sign: signature,
        Key: config.get('INDODAX_KEY'),
        'User-Agent': 'Mozilla/4.0 (compatible; INDODAXCOM PHP client; Windows NT; PHP/7.2.7)'
      };

      const options = {
        url: `${config.get('INDODAX_HOST')}/${param}`,
        method: 'POST',
        json: true,
        headers: headerData
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
  router.get('/', controller.getInfo);
//   router.post('/check', indicesController.check);
};

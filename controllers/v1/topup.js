// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const config = require('./../../config');
const request = require('request-promise');
const { httpStatus, errorCodes } = require('./../../configs/codes');
const { topupStatus } = require('./../../configs/app');
const Topup = require('../../models/topup');
const Mutasi = require('../../models/mutasi-bca-bisnis');
const moment = require('moment-timezone');
const logger = require('./../../libs/logger');

/*  eslint linebreak-style: ["error", "windows"]  */

const topupController = {
  /**
   * @swagger
   * /v1/topup:
   *   post:
   *     summary: Check Mutation
   *     tags:
   *       - Check Mutation
   *     produces:
   *        application/json
   *     parameters:
   *        - in: body
   *          name: body
   *          description: Parameter that needs to be added to the api
   *          schema:
   *            type: object
   *            properties:
   *              unix_code:
   *                type: string
   *              unix_amount:
   *                type: integer
   *              token:
   *                type: string
   *              callback:
   *                type: string
   *              exipre_time:
   *                type: string
   *            example:
   *              unix_code: 2REVDQ84
   *              unix_amount: 100534
   *              token: MjAxOC0wOC0wOCAwNTozMDo1NzA4NTI5NTczNzk3Mw--
   *              callback: http://pintu-api.festiware.com/api/status/topup
   *              exipre_time: 2018-07-25 09:12:19
   *          required: true
   *     responses:
   *       200:
   *         description: success
   *       400:
   *         description: missing parameters
   *       401:
   *         description: data not found
   *       403:
   *         description: data is known but doesn't authorized
   *       500:
   *         description: internal server error
   */
  check: async (req, res) => {
    try {
      req.checkBody({
        unix_code: { notEmpty: true, errorMessage: 'unix_code field is required' },
        unix_amount: { notEmpty: true, errorMessage: 'unix_amount field is required' },
        token: { notEmpty: true, errorMessage: 'token field is required' },
        callback: { notEmpty: true, errorMessage: 'callback field is required' },
        expire_time: { notEmpty: true, errorMessage: 'expire_time field is required' }
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

      const paramsCallback = {
        status: topupStatus.done,
        unix_code: req.body.unix_code,
        token: req.body.token
      };

      const today = moment().format('YYYY-MM-DD HH:mm:ss');

      if (today > req.body.expire_time) {
        paramsCallback.status = topupStatus.reject;
        const options = {
          uri: req.body.callback,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          formData: paramsCallback
        };

        logger.info(`TOPUP REJECTED : ${JSON.stringify(paramsCallback, null, 2)}`);
        const result = await request(options);
        logger.info(`TOPUP REJECTED RESPONSE : ${JSON.stringify(result, null, 2)}`);

        return res.status(httpStatus.badRequest).json({
          status: httpStatus.notFound,
          success: false,
          message: topupStatus.reject
        });
      }

      const mutasiResult = await Mutasi.findAndCountAll();

      for (let index = 0; index < mutasiResult.count; index += 1) {
        const str = mutasiResult.rows[index].Keterangan;
        const unixCode = str.substr(31, 7);

        if (mutasiResult.rows[index].Amount === req.body.unix_amount &&
          unixCode === req.body.unix_code) {
          logger.info(`TOPUP DONE : ${JSON.stringify(paramsCallback, null, 2)}`);
          return res.status(httpStatus.ok).json({
            status: httpStatus.ok,
            success: true,
            message: topupStatus.done
          });
        }
      }

      // const params = {
      //   unix_code: req.body.unix_code,
      //   unix_amount: req.body.unix_amount,
      //   account_number: req.body.account_number,
      //   token: req.body.token,
      //   callback: req.body.callback,
      //   expire_time: req.body.expire_time
      // };

      // logger.info(`CREATE TOPUP: ${JSON.stringify(params, null, 2)}`);
      // const topupResult = await Topup.create(params);
      // logger.info(`CREATE TOPUP: ${JSON.stringify(topupResult, null, 2)}`);

      paramsCallback.status = topupStatus.pending;
      const options = {
        uri: req.body.callback,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        formData: paramsCallback
      };

      logger.info(`TOPUP PENDING : ${JSON.stringify(paramsCallback, null, 2)}`);
      const result = await request(options);
      logger.info(`TOPUP PENDING RESPONSE : ${JSON.stringify(result, null, 2)}`);

      return res.status(httpStatus.ok).json({
        status: httpStatus.ok,
        success: false,
        message: 'pending'
      });
    } catch (e) {
      logger.info(`ERROR TOPUP: ${JSON.stringify(e.message, null, 2)}`);
      return res.status(httpStatus.internalServerError).json({
        status: httpStatus.internalServerError,
        success: false,
        message: e.message,
        code: errorCodes.internalServerError
      });
    }
  },
  create: async (req, res) => {
    try {
      req.checkBody({
        // unix_code: { notEmpty: true, errorMessage: 'unix_code field is required' },
        unix_amount: { notEmpty: true, errorMessage: 'unix_amount field is required' },
        token: { notEmpty: true, errorMessage: 'token field is required' },
        callback: { notEmpty: true, errorMessage: 'callback field is required' },
        expire_time: { notEmpty: true, errorMessage: 'expire_time field is required' }
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
      logger.info(`REQUEST TOPUP: ${JSON.stringify(req.body, null, 2)}`);
      await Topup.create(req.body);

      return res.status(httpStatus.ok).json({
        status: httpStatus.ok,
        success: true
      });
    } catch (e) {
      logger.info(`ERROR TOPUP: ${JSON.stringify(e.message, null, 2)}`);
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
  router.post('/', topupController.create);
  router.post('/check', topupController.check);
};

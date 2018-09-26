const { httpStatus, errorCodes } = require('./../../configs/codes');
const Mutasi = require('../../models/mutasi-bca-bisnis');
const logger = require('./../../libs/logger');

/*  eslint linebreak-style: ["error", "windows"]  */

const mutasiController = {
  /**
   * @swagger
   * /v1/mutasi:
   *   get:
   *     summary: Get All Mutation
   *     tags:
   *       - Mutation
   *     produces:
   *        application/json
   *     responses:
   *       200:
   *         description: success
   *       400:
   *         description: missing parameters
   *       401:
   *         description: user not found/invalid password
   *       403:
   *         description: user is known but doesn't authorized
   *       500:
   *         description: internal server error
   */
  getAll: async (req, res) => {
    try {
      const result = await Mutasi.findAndCountAll();

      return res.status(httpStatus.ok).json({
        status: httpStatus.ok,
        success: true,
        message: {
          data: result
        }
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
  router.get('/', mutasiController.getAll);
};

const { errorCodes } = require('./codes');

module.exports = {
  BoostServiceInbox: {
    BSI0001: errorCodes.missingParameter,
    BSI0002: errorCodes.badRequest,
    BSI0003: errorCodes.bsiFailedCreateInbox,
    BSI0004: errorCodes.bsiFailedUpdateInbox,
    BSI0005: errorCodes.bsiFailedDeleteInbox,
    BSI0006: errorCodes.bsiFailedReadInbox,
    BSI0007: errorCodes.bsiAppNotRegistered,
    BSI0008: errorCodes.bsiCategoryNotRegistered,
    BSI9999: errorCodes.internalServerError
  }
};

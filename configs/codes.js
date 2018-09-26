module.exports = {
  httpStatus: {
    ok: 200,
    badRequest: 400,
    notFound: 404,
    unauthorized: 401,
    forbidden: 403,
    internalServerError: 500
  },
  errorCodes: {
    invalidPassword: 4000,
    expiredDate: 4001,
    authUserIsInactive: 4002,
    missingParameter: 4003,
    badRequest: 4004,
    invalidOtp: 4005,
    expiredOtp: 4006,
    emailExist: 4007,
    msisdnExist: 4008,
    picEmailExist: 4009,
    invalidQrCode: 4010,
    qrCodeExist: 4011,
    itemExist: 4012,
    operationHours: 4013,
    internalServerError: 5000
  }
};

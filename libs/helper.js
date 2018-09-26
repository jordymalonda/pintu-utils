const request = require('request-promise');
const config = require('./../config');
const { userOtp } = require('./../configs/app');

module.exports = {
  getRandomNumber: () => Math.floor(1000 + (Math.random() * 9000)),

  randomString: () => {
    const length = 6;
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = 0; i < length; i += 1) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
  },

  setMsisdn: (number) => {
    if (!number) {
      return null;
    }

    let msisdn = number.replace('+', '');
    if (msisdn.charAt(0) === '0') {
      msisdn = `62${msisdn.slice(1)}`;
    }

    return msisdn;
  },

  sendMessageOTP: async (messageData) => {
    try {
      const authToken = await module.exports.getAuthToken();
      if (!authToken) {
        return false;
      }

      const checkHeader = {
        'Content-Type': 'application/json',
        'Request-id': '1234',
        Authorization: JSON.parse(authToken).identityToken
      };

      const parameters = {
        phoneNumber: `+${messageData.dest}`,
        message: `Mohon berikan kode OTP ${messageData.otp} ke Boost Preneur untuk VERIFIKASI nomor telepon anda. PENTING - kode ini akan hangus setelah ${userOtp.expired} menit.`,
      };

      const options = {
        url: `${config.get('COE_API_HOST')}/api/p2psmsservice/send/message`,
        method: 'POST',
        headers: checkHeader,
        resolveWithFullResponse: true,
        body: parameters,
        json: true
      };

      return await request(options);
    } catch (e) {
      return false;
    }
  },

  getAuthToken: async () => {
    try {
      const basicAuthToken = Buffer.from(`${config.get('COGNITO_API_BASIC_AUTH_USER')}:${config.get('COGNITO_API_BASIC_AUTH_PASS')}`).toString('base64');
      const options = {
        url: `${config.get('COGNITO_API_HOST')}/token`,
        method: 'GET',
        headers: {
          Authorization: `Basic ${basicAuthToken}`
        }
      };

      return await request(options);
    } catch (e) {
      return false;
    }
  }
};

module.exports = {
  userType: {
    superadmin: 10,
    coordinator: 11,
    canvasser: 20,
    consumer: 21,
    merchant: 22
  },
  topupStatus: {
    done: 'done',
    pending: 'pending',
    reject: 'rejected'
  },
  merchantItemStatus: {
    approve: 1,
    reject: 2,
    pending: 0
  },
  userOtp: {
    expired: 5,
    digit: 4
  },
  smtp: {
    gmail: {
      host: 'smtp.gmail.com',
      port: '587',
      from: 'info@myboost.id',
      authentication: 'login',
      username: 'info@myboost.id',
      password: 'ADSI2018'
    }
  }
};

const winston = require('winston');
require('winston-daily-rotate-file');

const config = require('./../config');
const fs = require('fs');

const logDir = `${__dirname}/../${config.get('LOG_DIR')}/`;

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const transport = new (winston.transports.DailyRotateFile)({
  filename: '%DATE%.log',
  dirname: logDir,
  datePattern: 'YYYY-MM-DD',
  maxSize: '20m'
});

const logger = new (winston.Logger)({
  transports: [
    transport
  ]
});

module.exports = logger;

const config = require('./config');
const passport = require('./libs/passport_jwt');
const path = require('path');
const express = require('express');
const enrouten = require('express-enrouten');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

/* eslint-disable no-console */

const app = express();
const port = config.get('PORT');

app.use(expressValidator());
app.use(passport.initialize());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(enrouten({
  directory: path.join(__dirname, 'controllers'),
}));

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

module.exports = app;

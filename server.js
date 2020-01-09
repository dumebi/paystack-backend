// Package Dependencies
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const { handleError, handleSuccess } = require('./helpers/utils')
const cors = require('cors');
const compression = require('compression');
const flash = require('connect-flash');
/* const {
  logRequest
} = require('./helpers/middleware'); */

const app = express();
require('dotenv').config();
require('./helpers/connection').rabbitmq();
require('./helpers/connection').subscribe();

// Midelware stack
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(cors());
app.use(morgan('dev'));
app.use(compression());
app.use(flash());
// app.use(logRequest);

/* Application Routes */
app.use('/v1/', require('./routes'));
app.get('/', (req, res) => handleSuccess(res, 200, 'Application is online', null))

// catch 404 and forward to error handler
app.use((req, res) => {
  // logger.logAPIResponse(req, res);
  handleError(res, 404, 'Page not found')
});
module.exports = app;

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// .env config
require('dotenv').config();

const usersRouter = require('./routes/users');

// set up express app
const app = express();

// set up mongodb
const mongoose = require('./config/mongoose');
const db = mongoose();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'build')));

// always return the main index.html
// app.get('/*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
// });

// CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', '*');
        return res.status(200).send({});
    }
    next();
});

// initialize routes
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // no stacktraces leaked to user
  res.status(err.status || 500).send({error: err.message});
});

module.exports = app;

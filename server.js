var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

var indexRouter = require('./routes/index');
var apiRouter = require('./routes/api');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//CORS
/* const cors = require('cors')
app.use(cors()) */

// using dotenv
require('dotenv').config()


// routes
app.use('/home', indexRouter)
app.use('/api', apiRouter)


// DB connection
const dbConnection = require('./Models/_dbConnection')
dbConnection();


// app lsitening port
app.listen(process.env.APP_PORT, () => console.log(`server corriendo en puerto ${process.env.APP_PORT}`))

// default route
app.get('*', function(req, res, next) {
    res.redirect('/home');
  });
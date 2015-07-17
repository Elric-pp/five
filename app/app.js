var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var errorHandler = require('errorhandler')
var multer = require('multer')
var session = require('express-session')
var methodOverride = require('method-override')
//var ejs = require('ejs')
var debug = require('debug')('app')



var app = express();
require('./config/routes')(app)
require('./config/express')(app)
////app.set('port', process.env.PORT || 3000);



// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
   app.use(logger('dev'));
    app.use(methodOverride());
    app.use(session({
        resave: true,
        saveUninitialized: true,
        secret: 'uwotm8',
    }));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(multer());
    app.use(cookieParser());








app.listen(app.get('port'), function() {
    console.log('app is running on port ' + app.get('port'))
})

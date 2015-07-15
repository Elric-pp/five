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




/*var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/five');
var Schema = mongoose.Schema;
//骨架模版
var movieSchema = new Schema({
    doctor   : String,
    title    : String,
    language : String,
    country  : String,
    year     : Number,
    summary  : String,
    poster   : String,
    flash    : String
})
//模型
var Movie = mongoose.model('Movie', movieSchema);
//存储数据
var moive = new Movie({
    title: '黑衣人三',
    doctor: '史密斯',
    year: 2018,
    flash: 'http://player.youku.com/player.php/sid/XNjA1Njc0NTUy/v.swf',
    country: '美国',
    language: '英语',
    summary: '好片'
})
//保存数据库
moive.save(function(err) {
    if (err) {
        console.log('保存失败')
        return;
    }
    console.log('meow');
});
*/




app.listen(app.get('port'), function() {
    console.log('app is running on port ' + app.get('port'))
})

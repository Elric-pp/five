module.exports = function(app) {
    //引入路由模块文件
    var routes = require('../routes/index');
    var users = require('../routes/users');
    var movie = require('../routes/movie')

    //路由公用的组件
    var multer = require('multer')
    var session = require('express-session')
    var methodOverride = require('method-override')
    var bodyParser = require('body-parser');
    


    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.use(methodOverride());
    app.use(session({
        resave: true,
        saveUninitialized: true,
        secret: 'uwotm8',
    }));

    //路由
    app.use('/', routes);
    app.use('/users', users);
    app.use('/movie', movie);
}

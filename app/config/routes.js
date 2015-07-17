module.exports = function(app) {
    var routes = require('../routes/index');
    var users = require('../routes/users');
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


    app.use('/', routes);
    app.use('/users', users);
}

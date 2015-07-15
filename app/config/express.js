module.exports = function(app) {
    var express = require('express');
    var errorHandler = require('errorhandler')

    app.set('port', process.env.PORT || 3000);




    // view engine setup
    app.set('views', __dirname + '/../views');
    app.set('view engine', 'html')
    app.engine('html', require('ejs').renderFile);



    //app.use(express.static(path.join(__dirname, 'public')));
    app.use('/public', express.static(__dirname + '/../public'))




    // error handlers
    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });
    // development error handler
    // will print stacktrace
    if (app.get('env') === 'development') {
        app.use(errorHandler());
    }

    // production error handler
    // no stacktraces leaked to user
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {}
        });
    });
}

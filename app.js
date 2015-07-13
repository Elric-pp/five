var express = require('express');
var path = require('path')
var http = require('http');
var ejs = require('ejs')
var app = express();

require('./app/route/route.js')(app)


app.engine('html', require('ejs').renderFile);


app.use(express.static(path.join(__dirname, '/public')));
app.set('port', process.env.PORT || 3000)
app.set('view engine', 'html')
app.set('views', 'public/dist/views')




app.listen(app.get('port'), function() {

    console.log('listening on port' + app.get('port'));
});

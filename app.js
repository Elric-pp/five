var express = require('express');
var path = require('path')
var http = require('http');
var app = express();

app.use(express.static(__dirname + '/dist'))


app.set('port', process.env.PORT || 3000)
app.set('view engine', 'html')
app.get('/', function(req, res) {
    res.sendFile('/dist/index.html')
})
app.get('/app', function(req, res) {
    res.sendFile('/dist/index.html')
})

app.listen(app.get('port'), function() {

    console.log('listening on port' + app.get('port'));
});

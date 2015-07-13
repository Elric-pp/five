module.exports = function(app) {
    app.get('/', function(req, res) {
        res.render('index')
            //res.send('hello world')
    })

    app.get('/userlist', function(req, res) {
        res.render('userlist')
            //res.send('hello world')
    })

    app.get('/login', function(req, res) {
        res.render('login')
            //res.send('hello world')
    })

    app.get('/user', function(req, res) {
        res.render('user')
    })

    app.get('/home', function(req, res) {
        res.render('home')
    })

}

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', checkLogin)
router.get('/', function(req, res, next) {
    res.render('index');
});

/*router.get('/user', function(req, res) {
    res.render('login')
})*/


function checkLogin(req, res, next) {
    if (!req.session.user) {
        return res.redirect('/users');
    };
    next();
}
module.exports = router;

var express = require('express');
var router = express.Router();
var crypto = require('crypto');

var User = require('../models/user');
/* GET users listing. */
router.get('/', checkNotLogin)
router.get('/', function(req, res, next) {
    res.render('login')
});

router.post('/login', function(req, res) {
    //console.log(req.body)
    var md5 = crypto.createHash('md5');
    var password = md5.update(req.body.password).digest('base64')
    User.get(req.body.username, function(err, user) {
        console.log(user)
        if (!user) {
            console.log('error', '用户不存在')
            return res.send({
                'msg': '用户不存在',
                'status': -2
            })
        }
        if (user.password != password) {
            console.log('error', '密码错误')
            return res.send({
                'msg': '密码错误',
                'status': -1
            })
        }
        req.session.user = user;
        console.log(req.session.user);
        res.send({
            'redirect': '../',
            'msg': '登录成功，跳转中',
            'status': 0
        })
        console.log('success', '登录成功')
    })
})

router.post('/regis', function(req, res) {
    var md5 = crypto.createHash('md5');
    var password = md5.update(req.body.password).digest('base64');
   // console.log(req.body)
    var newUser = new User({
        name: req.body.username,
        password: password
    });

    User.get(newUser.name, function(err, user) {
        if (user) {
            err = {
                "error": "username  already exists",
                "status": "-1"
            }
        };
        if (err) {
            return res.status('error').send(err)
        };
        newUser.save(function(err) {
            if (err) {
                return res.status('error').send(err)
            }
            req.session.user = newUser;
            res.send('success');
        })
    })
})


function checkLogin(req, res, next) {
    if (!req.session.user) {
        return res.send({
            'redirect': '/users',
            'msg': '登录超时，请重新登录'
        })
    };
    next();
}


function checkNotLogin(req, res, next) {
	console.log(req.session)
    if (req.session.user) {
        return res.redirect('../');
    };
    next();
}


module.exports = router;

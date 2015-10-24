var express = require('express');
var router = express.Router();
var url = require('url'); //解析操作url
var superagent = require('superagent'); //这三个外部依赖不要忘记npm install
var cheerio = require('cheerio');
var Q = require('q');
var defer = Q.defer();

var Movie = require('../models/movie');

/* GET movie page. */
router.get('/', checkLogin)
router.get('/', function(req, res, next) {
    //res.render('index');
    Movie.all(function(err, movies) {
        if (err) {
            return res.status('error').send(err)
        }
        res.status('success').send(movies)
    })
});


router.post('/add', function(req, res) {
    var url = req.body.url;
    
    getMovie(url).then(function(movieInfo) {
        var newMovie = new Movie({
            title: movieInfo.title,
            pic: movieInfo.pic,
            score: movieInfo.score
        })
        Movie.get(movieInfo.title, function(err, movie) {
            if (movie) {
                err = {
                    'error': 'movie exist'
                }
            }
            if (err) {
                 return res.status('error').send(err);
            }
            newMovie.save(function(err) {
                if (err) {
                    return res.status('error').send(err)
                }
                res.send('success');
            })
        })
    })
})

function getMovie(url) {
    var movieInfo = {};
        superagent.get(url)
            .end(function(err, res) {
                var $ = cheerio.load(res.text);
                var title = $('#content h1 span').eq(0).text();
                var pic = $('#mainpic a img').attr('src');
                var score = $('#interest_sectl .rating_num').text();
                movieInfo.title = title;
                movieInfo.pic = pic;
                movieInfo.score = score;
                defer.resolve(movieInfo);
            })
    return defer.promise;
}

function checkLogin(req, res, next) {
    if (!req.session.user) {
        return res.redirect('/users');
    };
    next();
}
module.exports = router;

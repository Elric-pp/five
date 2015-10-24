//var crypto = require('crypto');
var mongoose = require('./mongoose');

var Schema = mongoose.Schema;

var movieSchema = new Schema({
    title: String,
    pic: String,
    score: String
});


var movieModel = mongoose.model('Movie', movieSchema);

function Movie(movie) {
    this.title = movie.title;
    this.pic = movie.pic;
    this.score = movie.score;
}

Movie.prototype.save = function(callback) {
    //var md5 = crypto.createHash('md5'),
    //var  password = md5.update(r)
    var movie = {
        title: this.title,
        pic: this.pic,
        score: this.score
    };

    var newMovie = new movieModel(movie);
    // console.log(user);
    newMovie.save(function(err, movie) {
        if (err) {
            return callback(err);
        }
        callback(null, movie);
    })
}

Movie.get = function(title, callback) {
    //console.log(userModel)
    movieModel.findOne({
        title: title
    }, function(err, movie) {
        if (err) {
            return callback(err)
        }
        callback(null, movie)
    })
}


Movie.all = function(callback) {
    movieModel.find(function(err, movies) {
        if (err) {
            return callback(err)
        }
        callback(null, movies)
    })
}

module.exports = Movie;

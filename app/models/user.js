//var crypto = require('crypto');
/*var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/five');*/
var mongoose = require('./mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: String,
    password: String
});


var userModel = mongoose.model('User', userSchema);

function User(user) {
    this.name = user.name;
    this.password = user.password;
}

User.prototype.save = function(callback) {
    //var md5 = crypto.createHash('md5'),
    //var  password = md5.update(r)
    var user = {
        username: this.name,
        password: this.password
    };

    var newUser = new userModel(user);
   // console.log(user);
    newUser.save(function(err, user) {
        if (err) {
            return callback(err);
        }
        callback(null, user);
    })
}

User.get = function(name, callback) {
    //console.log(userModel)
    userModel.findOne({username : name}, function(err, user) {
        if (err) {
            return callback(err)
        }
        callback(null, user)
    })
}

module.exports = User;

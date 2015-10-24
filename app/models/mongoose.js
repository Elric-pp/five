var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/five');

module.exports = mongoose;
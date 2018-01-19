// load mongoose package
var mongoose = require('mongoose');
// use the native Node promise
mongoose.Promise= require('bluebird');

mongoose.connect('mongodb://localhost:27017/crypto')
    .then((ref) => {
        console.log('Connected to mongo server.');
    })
    .catch((err) => console.error(err));

module.exports = mongoose;
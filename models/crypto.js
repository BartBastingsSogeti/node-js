var mongoose = require('mongoose');

var CryptoSchema = new mongoose.Schema({
    name        : String,
    symbol      : String,
    rank        : Number,
    price_usd   : Number,
    price_btc   : Number
}, { collection: 'currencies' });



module.exports = mongoose.model('crypto', CryptoSchema);
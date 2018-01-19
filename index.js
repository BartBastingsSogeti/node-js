var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    rp = require('request-promise'),
    db = require('./database'),
    Crypto = require('./models/crypto');

app.use(bodyParser.urlencoded({extended : true}));

var apiUrl =  'https://api.coinmarketcap.com/v1/ticker/';

var options = {
    uri: apiUrl,
    json: true
};

app
    .get('/', (req, res) => {
        res.end('Hello playgrounders!');
    })

    .get('/name/:name', (req, res) => {
        res.send('Hello '+ req.params.name + '!');
    })

    .post('/name', (req, res) => {
        res.send('Hello ' + req.body.name + '!');
    })

    // search data by id
    .post('/crypto', (req, res) => {
        rp(options)
            .then((data) => {

                var i = 0;

                while (i < data.length) {
                    if (data[i].id === req.body.id) {
                         res.send(data[i]);
                        break;
                    }
                    i++;
                }
            })
            .catch((err) => {
                // Crawling failed...
                res.send(err);
            });
    })

    .get('/mongo', (req, res, next) => {
        Crypto.find((err, crypto) => {
            if (err) return next(err);
            res.json(crypto);
        });
    })

    .get('/mongo/:coin', (req, res, next) => {
        Crypto.find((err, crypto) => {
            if (err) return next(err);
            
            var jsonCurrencies = JSON.parse(JSON.stringify(crypto[0])),
                currencies = jsonCurrencies.currency,
                i = 0,
                returnVal = {'error' : 'no crypto coin'};

            while (i < currencies.length) {
                if(req.params.coin === currencies[i].id) {
                    returnVal = currencies[i];
                    break;
                }
                i++;
            }
            res.json(returnVal);
        });
    })
    .listen(3000);

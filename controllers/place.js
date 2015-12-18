var express = require('express');
var request = require('request');
var Yelp = require('yelp');
var router = express.Router();
var geolocation = require('geolocation');
var app = express();

var yelp = new Yelp({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  token: process.env.TOKEN,
  token_secret: process.env.TOKEN_SECRET
});

router.get('/', function(req, res) {
  var lat = req.query.latitude;
  var lng = req.query.longitude;
  yelp.search({term: "Restaurants", ll: lat+','+lng }, function(error, data) {
    // res.send(data)
    res.render('index', {data:data})
    // res.render('index', {data:data});
  });
});

router.get('/api', function(req, res) {
  var query = req.query.q;
  yelp.search({term: query, location: 'Seattle'}, function(error, data) {
    // res.send(data)
    res.send(data)
    // res.render('index', {data:data});
  });
});





module.exports = router;
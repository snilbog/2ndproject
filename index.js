var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var request = require('request');
var bodyParser = require('body-parser');
var session = require('express-session');
var db = require('./models');
var flash = require('connect-flash');
var Yelp = require('yelp');
var places = [
  {name: 'Restaurant name', address: 'address'}];
var app = express();

var yelp = new Yelp({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  token: process.env.TOKEN,
  token_secret: process.env.TOKEN_SECRET
});
//configure express
app.set('view engine', 'ejs');
//load middleware
app.use(ejsLayouts);
app.use(express.static(__dirname + '/static'));
app.use(bodyParser.urlencoded({extended: false}));

app.use(session({
  secret:'dsalkfjasdflkjgdfblknbadiadsnkl',
  resave: false,
  saveUninitialized: true
}));
app.use(flash());

app.use(function(req,res,next){
  // req.session.user = 8;
  if(req.session.user){
    db.user.findById(req.session.user).then(function(user){
      req.currentUser = user;
      next();
    });
   }else{
    req.currentUser = false;
    next();
  }
});

app.use(function(req,res,next){
  res.locals.currentUser = req.currentUser;
  res.locals.alerts = req.flash();
  next();
});

// app.get('/', function(req, res) {
//   res.render('index');
// });

app.get('/', function(req,res){
  yelp.search({term: "Restaurant", location: ""}, function(error, data) {
    console.log(data);
	 res.render('index', {data:data});
  });
});

app.post('/place', function(req, res){
  place.push(req.body);
  res.redirect('/place');
});


app.get('/place/:idx', function(req, res) {
  var idx = parseInt(req.params.idx);
  if (idx < articles.length && idx >= 0) {
    res.render('view/show.ejs', {article: places[idx], index: idx});
  } else {
    res.send('Error');
  }
});

//load routes
app.use('/places', require('./controllers/place'));
app.use('/favorites', require('./controllers/favorite'));
app.use('/auth', require('./controllers/auth'));
//listen for connections
app.listen(process.env.PORT || 3000)
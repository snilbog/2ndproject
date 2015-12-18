var express = require('express');
var db = require('./../models');
var router = express.Router();

router.post('/', function(req, res) {

  db.user.findById(req.session.user).then(function(user){
    user.createFavorite(req.body).then(function() {
      res.status(200).send('You did it, added!');
    });
  });

  // db.favorite.findOrCreate({
  //   where: {
  //     yelpID: req.body.yelpID
  //   },
  //   defaults: {
  //     name: req.body.name,
  //   }
  // }).spread(function(favorite, created) {
  //   console.log(favorite.get());
  //   res.redirect('/');
  // });
});

router.get('/', function(req, res) {

  db.user.findById(req.session.user).then(function(user) {
    user.getFavorites().then(function(favorites) {
      res.render('favorites/index', {favorites: favorites});
    }).catch(function(err) {
      console.log(err);
    });
  });

  // db.favorite.findAll({
  //   order: 'places'
  // }).then(function(favorites) {
  //   res.render('/favorites/index', {favorites: favorites});
  // });
});

router.delete('/:yelpID', function(req, res) {
  db.favorite.destroy({
    where: {
      yelpID: req.params.yelpID
    }
  }).then(function() {
    res.send({'msg': 'success'});
  }).catch(function(e) {
    res.send({'msg': 'error', 'error': e});
  });
});

module.exports = router;
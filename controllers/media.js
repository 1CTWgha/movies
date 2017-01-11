var express = require('express');
var router = express.Router();
var db = require('../models');
var passport = require('../config/ppConfig');
var request= require('request');

//Find all items that exist
router.get("/", function(req, res){
  db.watchlist.findAll().then(function(list){
    res.render("watchlist", {list: list});
  });
});

router.get("/:id", function(req, res){
  db.watchlist.find({
    where: {id: req.params.id },
    include: [db.watchlist]
  }).then(function(item){
    res.render("watchlist", {item: item});
  });
});

//moving a post to the database
router.post('/singlemovie', function(req, res, next) {
  db.user.create({
    email: req.body.email,
    name: req.body.name,
    password:
  }).then(function(user) {
    db.watchlist.create({
      title: STRING,
      plot: STRING,
      rating: STRING,
      rated: STRING,
      awards: STRING,
      director: STRING,
      actors: STRING,
      poster: STRING
    }).then(function(watchlist) {
      user.addWatchlist(watchlist).then(function(watchlist) {
        user.getWatchlists().then(function(watchlists) {
          expect(watchlists.length).to.equal(1);
          done();
        });
      });
    });
});

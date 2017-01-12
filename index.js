require('dotenv').config();
var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('./config/ppConfig');
var flash = require('connect-flash');
var isLoggedIn = require('./middleware/isLoggedIn');
var app = express();
var request= require('request');
var db = require('./models');

app.set('view engine', 'ejs');

app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);


app.use(session({
  secret: process.env.SESSION_SECRET || 'supersecretpassword',
  resave: false,
  saveUninitialized: true
}));



app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use(function(req, res, next) {
  res.locals.alerts = req.flash();
  res.locals.currentUser = req.user;
  next();
});

app.get('/', function(req, res) {
  res.render('index');
});

app.get('/watchlist', function(req, res) {
  db.watchlist.findAll().then(function(list){
    console.log("THIS IS THE LIST ITEM",list);
    res.render('watchlist', {
      list: list
    });
  });
});

app.get('/profile', isLoggedIn, function(req, res) {
    res.render('profile', {
      movies: []
  });
});

app.post('/profile', isLoggedIn, function(req, res) {
  var query = req.body.title;
  var url = "http://www.omdbapi.com/?s="+query+"&y=&plot=short&r=json";
  console.log("THIS IS FORMATTED URL: ", url);

  request.post( url, function(error, response, body) {
    var movies = JSON.parse(body).Search;
    console.log(movies);

    res.render('profile', {movies: movies
    });
  });
});

app.get("/movie/:imdbid", function(req, res){
  var id = req.params.imdbid;
  console.log(id);
  //request to API lookup by IMDB ID (directions on site)
  var movieUrl = "http://www.omdbapi.com/?i="+id+"&plot=short&r=json";
  console.log(movieUrl, "This is the movie URL");//
  //res.render movie detail page
  request.get( movieUrl, function( error, response, body) {

    var movie = JSON.parse(body);
    console.log(movie, "THIS IS THE MOVIE DATA");

    res.render('singlemovie', {movie: movie});
  });
});

//POST added item to watchlist
app.post("/watchlist", isLoggedIn, function(req, res){
  console.log("got form data", req.body);
  console.log("This is the PLOT i want ot add: ", req.body.Plot);
  console.log("This is the title i want ot add: ", req.body.Title);
  db.watchlist.findOrCreate({
    where: {title: req.body.Title},
    defaults: {
    plot: req.body.Plot,
    rating: req.body.imdbRating,
    rated: req.body.Rated,
    awards: req.body.Awards,
    director: req.body.Director,
    actors: req.body.Actors,
    poster: req.body.Poster
  }
}).then(function(movie){
    res.redirect('/watchlist');

  });
});

//Display all saved items
// app.get("/watchlist", isLoggedIn, function(req, res) {
//   db.user.findOne({where: {}})
// });



app.use('/auth', require('./controllers/auth'));

if (!module.parent) {
  app.listen(process.env.PORT || 3000);
}

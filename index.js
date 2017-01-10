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

app.get('/profile', isLoggedIn, function(req, res) {
  var url = 'http://www.omdbapi.com/?t=Star+Wars&y=&plot=short&r=json';
  request.get( url, function(error, response, body) {
    var movie = JSON.parse(body);
    res.render('profile', {
      movie: movie,
      movies: []
    });
  });
});

app.post('/profile', isLoggedIn, function(req, res) {
  var query = req.body.title;
  var url = "http://www.omdbapi.com/?s="+query+"&y=&plot=short&r=json";
console.log(url);
  request.post( url, function(error, response, body) {
    var movies = JSON.parse(body);
    res.render('profile', {movies: movies});
  });
});


app.use('/auth', require('./controllers/auth'));

var server = app.listen(process.env.PORT || 3000);

module.exports = server;

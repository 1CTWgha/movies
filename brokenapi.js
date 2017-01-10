// Should be in my index js file
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
  var movieURL ='http://www.omdbapi.com/?t=Star+Wars&y=&plot=short&r=json';

  request(movieURL, function(error, response, body) {
    var movie = JSON.parse(body).results;
    res.render('index', {movie: movie });
  });
});

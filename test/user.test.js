var expect = require('chai').expect;
var db = require('../models');

before(function(done) {
  db.sequelize.sync({ force: true }).then(function() {
    done();
  });
});

describe('Creating a User', function() {
  it('should create successfully', function(done) {
    db.user.create({
      email: 'test@test.co',
      name: 'Brian',
      password: 'password'
    }).then(function(user) {
      db.watchlist.create({
        title: "Star Wars A New Hope"
      }).then(function(watchlist) {
        user.addWatchlist(watchlist).then(function(watchlist) {
          user.getWatchlists().then(function(watchlists) {
            expect(watchlists.length).to.equal(1);
            done();
          });
        });
      });
    }).catch(function(error) {
      done(error);
    });
  });
});

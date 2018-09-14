var path = require('path');
var friends = require(path.join(__dirname, '../data/friends.js'));

module.exports = function(app) {
  app.get('/api/friends', function(req, res) {
    res.json(friends);
  });
  app.post('/api/friends', function(req, res) {
    var match = {
      ultimateScore: 100,
      name: '',
      photo: ''
    };
    for (var i = 0; i < friends.length; i++) {
      var score = 0;
      for (var j = 0; j < req.body.scores.length; j++) {
        score = score + Math.abs(friends[i].scores[j] - req.body.scores[j]);
      }
      if (score <= ultimateScore) {
        match.name = friends[i].name;
        match.photo = friends[i].photo;
        match.ultimateScore = score;
      }
    }
    friends.push(req.body);
    res.json(match);
  });
};

var path = require('path');
var friends = require(path.join(__dirname, '../data/friends.js'));

module.exports = function(app) {
  app.get('/api/friends', function(req, res) {
    res.json(friends);
  });

  app.post('/api/friends', function(req, res) {
    var name = '';
    var photo = '';
    var ultimateScore = 100;

    for (var i = 0; i < friends.length; i++) {
      var score = 0;
      for (var j = 0; j < req.body.scores.length; j++) {
        score = score + Math.abs(friends[i].scores[j] - req.body.scores[j]);
      }
      if (score <= ultimateScore) {
        name = friends[i].name;
        photo = friends[i].photo;
        ultimateScore = score;
      }
    }
    friends.push(req.body);

    res.json({ name: name, photo: photo });
  });
};

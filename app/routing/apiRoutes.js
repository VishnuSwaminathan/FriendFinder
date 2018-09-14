var path = require('path');
var friends = require(path.join(__dirname, '../data/friends.js'));
var bodyParser = require('body-parser');

module.exports = function(app) {
  app.get('/api/friends', function(req, res) {
    res.json(friends);
  });
  // app.use(bodyParser.json());
  app.post('/api/friends', function(req, res) {
    var ultimateScore = 100; // cannot be higher or equal to this number
    name = '';
    photo = '';
    for (var i = 0; i < friends.length; i++) {
      var score = 0;
      for (var j = 0; j < req.body.scores.length; j++) {
        score = score + Math.abs(friends[i].scores[j] - req.body.scores[j]);
      }
      if (score < ultimateScore) {
        name = friends[i].name;
        photo = friends[i].photo;
        ultimateScore = score;
      }
    }
    friends.push(req.body);
    res.json({ status: 'OK', name: name, photo: photo });
  });
};

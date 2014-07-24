var express = require('express');
var app     = express();
var http    = require('http').Server(app);
var io      = require('socket.io').listen(http);
var session = require('express-session');
var cookieParser = require('cookie-parser');

var Game = require('./game');
var games = {};

/**
 * Express routes
 */
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(cookieParser());
app.use(session({ secret: 'weeoo', resave: true, saveUninitialized: true }));
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  console.log('sessionID', req.sessionID);
  res.render('index');
});

app.get('/new/:id', function(req, res) {
  var id = req.params.id;
  games[id] = new Game();
  res.redirect('/g/' + id);
});

app.get('/g/:id', function(req, res) {
  var id = req.params.id;
  var game = games[id];
  if (game) res.render('game', { id: id, game: games[id] });
  else res.send('Game not found');
});

http.listen(3000, function() {
  console.log('Listening on port 3000...');
});

/**
 * Socket.IO
 */

io.on('connection', function(socket) {
  console.log(socket.id + ' connected');
  io.emit('message', { text: 'Hello, ' + socket.id });
  socket.on('disconnect', function() {
    console.log(socket.id + ' disconnected');
  });
});

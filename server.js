var express = require('express');
var app     = express();
var http    = require('http').Server(app);
var io      = require('socket.io').listen(http);
var session = require('express-session');
var cookieParser = require('cookie-parser');

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

app.get('/g/:id', function(req, res) {
  res.render('game', { id: req.params.id });
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

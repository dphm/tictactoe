var socket = io.connect('/');

socket.on('message', function(data) {
  console.log(data.text);
});

var squares = ['sq-0', 'sq-1', 'sq-2',
               'sq-3', 'sq-4', 'sq-5',
               'sq-6', 'sq-7', 'sq-8'];
squares.forEach(function(square) {
  var s = document.getElementById(square);
  s.addEventListener('click', function() {
    console.log('Clicked', square);
    socket.emit('click', {
      game: document.URL,
      piece: 'X',
      position: square[3]
    });
  });
});

socket.on('played', function(data) {
  console.log(data.game);
});

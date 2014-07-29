function Game() {
  return [' ', ' ', ' ',
          ' ', ' ', ' ',
          ' ', ' ', ' '];
}

function play(game, piece, position) {
  if (game[position] !== ' ') throw new Error('Sq-' + position + ' is full');
  if (piece !== 'X' && piece !== 'O') throw new Error('Invalid piece');
  game[position] = piece;
}

exports = module.exports = {
  Game: Game,
  play: play
};

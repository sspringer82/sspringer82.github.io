document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('darts');
  const board = new Board(1, canvas);
  board.render();

  const score = document.getElementById('score');

  score.addEventListener('score', ({ detail: value }) => {
    const intValue = parseInt(value, 10);
    document.getElementById('current').innerHTML = intValue;
    score.innerHTML = parseInt(score.innerHTML, 10) + intValue;
  });

  canvas.addEventListener('click', scorefn);
});

function isBetween(value, start, end) {
  return value >= start && value < end;
}

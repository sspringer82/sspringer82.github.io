function scorefn(event) {
  const canvas = document.getElementById('darts');
  const score = document.getElementById('score');
  const hitPoint = {
    x: event.offsetX,
    y: event.offsetY,
  };

  const center = {
    x: canvas.width / 2,
    y: canvas.height / 2,
  };
  const middleTop = {
    x: canvas.width / 2,
    y: 0,
  };

  const nullVector = {
    x: middleTop.x - center.x,
    y: middleTop.y - center.y,
  };

  const hitVector = {
    x: hitPoint.x - center.x,
    y: hitPoint.y - center.y,
  };

  const hitMagnitude = Math.sqrt(hitVector.x ** 2 + hitVector.y ** 2);
  const nullMagnitude = Math.sqrt(nullVector.x ** 2 + nullVector.y ** 2);

  const dotProduct = nullVector.x * hitVector.x + nullVector.y * hitVector.y;
  const magnitudes = nullMagnitude * hitMagnitude;
  const angle = (Math.acos(dotProduct / magnitudes) * 180) / Math.PI;

  let fields = Board.fields;
  if (hitPoint.x < center.x) {
    fields = [...Board.fields]
      .splice(Board.fields.length / 2, Board.fields.length / 2)
      .reverse();
    fields.unshift(Board.fields.length);
  }
  let value = fields[Math.floor(Math.abs((angle + 9) / 18))];

  if (hitMagnitude >= 0 && hitMagnitude < Board.doubleBull) {
    console.log('double bulls eye');
    value = 50;
  } else if (hitMagnitude >= Board.doubleBull && hitMagnitude < Board.bull) {
    console.log('bulls eye');
    value = 25;
  } else if (
    (hitMagnitude >= Board.bull && hitMagnitude < Board.tripple - Board.ring) ||
    (hitMagnitude >= Board.tripple && hitMagnitude < Board.double - Board.ring)
  ) {
    console.log(value);
  } else if (
    hitMagnitude >= Board.tripple - Board.ring &&
    hitMagnitude < Board.tripple
  ) {
    console.log('tripple ' + value);
    value = value * 3;
  } else if (
    hitMagnitude >= Board.double - Board.ring &&
    hitMagnitude < Board.double
  ) {
    console.log('double ' + value);
    value = value * 2;
  } else {
    value = 0;
    console.log('out');
  }

  const scoreEvent = new CustomEvent('score', { detail: value });
  score.dispatchEvent(scoreEvent);
}
